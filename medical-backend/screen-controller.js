import MongoClient from 'mongodb';

class ScreenController {
    constructor(){
        this.dbClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
        this.screens = [
            { name: 'news', duration: 10000, data: {} },
            { name: 'video', duration: 20000, data: {} }
        ];
        this.currentScreenIndex = -1;
    }

    nextScreen() {
        this.currentScreenIndex++;
        if (this.currentScreenIndex > this.screens.length - 1){
            this.currentScreenIndex = 0;
        }

        return this.screens[this.currentScreenIndex];
    }

    getScreenData() {

    }
}

export default ScreenController;