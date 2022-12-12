import MongoClient from 'mongodb';
import MongoService from './mongo-service.js';
import dayjs from 'dayjs';
import { monthToString } from "./dateHelper.js";

class ScreenController {
    constructor(){
        this.dbService = new MongoService();
        this.screens = [
            { name: 'videos', dataCount: 1, headerTitle: data => data[0].name },
            { name: 'awards', durationSeconds: 20, dataCount: 2, headerTitle: () => 'Успіхи наших учнів' },
            { name: 'calendar_events', durationSeconds: 20, dataSelector: (collection) => {
                return collection.find({
                    'date': {
                        $gte: dayjs().format('YYYY-MM-DD'),
                        $lte: dayjs().add(9, 'day').format('YYYY-MM-DD')
                    }
                })
            }, headerTitle: () => monthToString(dayjs().month()) + ' ' + dayjs().year()},
            { name: 'notifications', durationSeconds: 20, dataCount: 3, headerTitle: () => 'Дошка оголошень' },
            { 
                name: 'school_birthdays', 
                durationSeconds: 20, 
                headerTitle: () => 'Вітаємо з Днем народження!', 
                dataSelector: this.getBirthdaysData, 
                dataCounter: async (collection) => {
                    const today = new Date();
                    return await collection.find({ "birthdayDay": today.getDate(), "birthdayMonth": today.getMonth() + 1 }).count();
                }
            }
        ];
        this.currentScreenIndex = -1;
        this.screenDataIndexes = {};
        this.lastVideoShowTime = dayjs().subtract(1, 'day');
        this.allDataCount = -1;
    }

    async nextScreen() {
        const allDataCount = await this.getAllDataCount();
        const videoCooldown = allDataCount > 1 ? 2 : 0;
    
        for (let i = 0; i < this.screens.length; i++) {
            //increment screen index
            this.currentScreenIndex++;
            if (this.currentScreenIndex > this.screens.length - 1){
                this.currentScreenIndex = 0;
            }
    
            //clone screen params
            const screen = Object.assign({}, this.screens[this.currentScreenIndex]);
            
            //check if data exists
            let dataCount = 0;
            if (screen.dataCounter) {
                dataCount = await screen.dataCounter(this.dbService.collection(screen.name));
            } else {
                dataCount = await this.dbService.count(screen.name);
            }
            
            if (dataCount == 0) {
                continue;
            }

            //process videos cooldown
            if (screen.name === 'videos' && videoCooldown > 0) {
                const diff = dayjs().diff(this.lastVideoShowTime, 'minute', true);
                if (diff < videoCooldown) {
                    continue;
                }
            }

            //get screen data
            let screenData = [];
            if (screen.dataSelector){
                const dataSelector = screen.dataSelector.bind(this);
                screenData = await dataSelector(this.dbService.collection(screen.name), screen.name, dataCount).toArray();
            } else {
                screenData = await this.dbService.getNext(
                        screen.name,
                        this.getScreenDataIndex(screen.name, dataCount, screen.dataCount),
                        screen.dataCount
                    );
            }

            if (screenData.length == 0) {
                continue;
            }

            // set screen duration
            screen.data = screenData;
            if (screen.durationSeconds == undefined) {
                screen.durationSeconds = screenData[0].durationSeconds + 3;
            }

            screen.header = screen.headerTitle(screenData);
    
            if (screen.name === 'videos'){
                this.lastVideoShowTime = dayjs();
            }

            return screen;
        }

        return null;
    }

    getScreenDataIndex(dataType, dataCount, screenDataCount) {
        let index = this.screenDataIndexes[dataType];
        index = index != undefined ? index + screenDataCount : 0;
        if (index >= dataCount) {
            index = 0;
        }
        this.screenDataIndexes[dataType] = index;

        return index;
    }

    async getAllDataCount() {
        let result = 0;
        for (let i = 0; i < this.screens.length; i++) {
            const screenName = this.screens[i].name;
            if (screenName === 'videos') {
                continue;
            }
            const count = await this.dbService.count(screenName);
            if (count > 0){
                result++;
            }
        }

        return result;
    }

    getBirthdaysData(collection, screenName, dataCount) {
        const today = new Date();
        return collection
            .find({ "birthdayDay": today.getDate(), "birthdayMonth": today.getMonth() + 1 })
            .skip(this.getScreenDataIndex(screenName, dataCount, 4))
            .limit(4)
    }
}

export default ScreenController;
