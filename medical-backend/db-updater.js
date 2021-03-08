import MongoService from './mongo-service.js';
import Axios from 'axios';
import URI from 'urijs';

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
        for await (const dataType of this.dataTypes) {
            let page = 1;
            let data = [];
            while (true) {
                const url = URI(dataType.url).query({page: page});
                const responce = await Axios.get(url.toString());
                if (responce.data.length == 0) {
                    break;
                }

                data = data.concat(responce.data);
                page++;
            }
            const dbCollection = dbService.DB.collection(dataType.name);
            await dbCollection.deleteMany();
            if (data.length > 0) {
                await dbCollection.insertMany(data);
            }
        }
    }
}

export default DbUpdater;