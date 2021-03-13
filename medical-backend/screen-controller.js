import MongoClient from 'mongodb';
import MongoService from './mongo-service.js';

class ScreenController {
    constructor(){
        this.dbService = new MongoService();
        this.screens = [
            { name: 'news', durationSeconds: 10 },
            { name: 'videos' },
            { name: 'doctor_infos', durationSeconds: 10 }
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
            const screenData = await this.dbService.getNext(screen.name, this.getScreenDataIndex(screen.name, dataCount));
            if (screenData.length == 0) {
                continue;
            }

            screen.data = screenData[0];
            if (screen.durationSeconds == undefined) {
                screen.durationSeconds = screen.data.durationSeconds;
            }
    
            return screen;
        }

        return null;
    }

    getScreenDataIndex(dataType, dataCount) {
        let index = this.screenDataIndexes[dataType];
        index = index != undefined ? ++index : 0;
        if (index >= dataCount) {
            index = 0;
        }
        this.screenDataIndexes[dataType] = index;

        return index;
    }
}

export default ScreenController;