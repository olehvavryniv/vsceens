import MongoClient from 'mongodb';
import MongoService from './mongo-service.js';
import dayjs from 'dayjs';
import { monthToString } from "./dateHelper.js";

class ScreenController {
    constructor(){
        this.dbService = new MongoService();
        this.screens = [
            // { name: 'videos' },
            { name: 'awards', durationSeconds: 10, dataCount: 2, headerTitle: () => 'Успіхи наших учнів' },
            { name: 'calendar_events', durationSeconds: 10, dataSelector: (collection) => {
                return collection.find({
                    'date': {
                        $gte: dayjs().format('YYYY-MM-DD'),
                        $lte: dayjs().add(9, 'day').format('YYYY-MM-DD')
                    }
                })
            }, headerTitle: () => monthToString(dayjs().month()) + ' ' + dayjs().year()},
            { name: 'notifications', durationSeconds: 5, dataCount: 3, headerTitle: () => 'Дошка оголошень  ' },
        ];
        this.currentScreenIndex = -1;
        this.screenDataIndexes = {};
    }

    async nextScreen() {
        for (let i = 0; i < this.screens.length; i++) {
            this.currentScreenIndex++;
            if (this.currentScreenIndex > this.screens.length - 1){
                this.currentScreenIndex = 0;
            }
    
            const screen = this.screens[this.currentScreenIndex];
            const dataCount = await this.dbService.count(screen.name);
            if (dataCount == 0) {
                continue;
            }

            let screenData = [];
            if (screen.dataSelector){
                screenData = await screen.dataSelector(this.dbService.collection(screen.name)).toArray();
            } else {
                screenData = await this.dbService.getNext(screen.name, this.getScreenDataIndex(screen.name, dataCount, screen.dataCount), screen.dataCount);
            }

            if (screenData.length == 0) {
                continue;
            }

            screen.data = screenData;
            if (screen.durationSeconds == undefined) {
                screen.durationSeconds = screen.data.durationSeconds;
            }

            screen.header = screen.headerTitle();
    
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
}

export default ScreenController;