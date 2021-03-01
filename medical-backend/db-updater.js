import MongoService from './mongo-service.js';
import Axios from 'axios'

class DbUpdater {
    constructor() {
        const screenId = process.env.SCREEN_ID;
        const host = process.env.VSCREEN_URL;
        this.dataTypes = [
            { url: `${host}/api/${screenId}/news`, name: 'news' },
            { url: `${host}/api/${screenId}/doctor_infos`, name: 'doctor_infos' },
            { url: `${host}/api/${screenId}/videos`, name: 'videos' },
        ];
    }

    async updateData() {
        const dbService = new MongoService();
        this.dataTypes.forEach(async (dataType) => {
            const responce = await Axios.get(dataType.url);
            responce.data.forEach(async (dataItem) => {
                await dbService.DB.collection(dataType.name).insertOne(dataItem);
            });
        });
    }
}

export default DbUpdater;