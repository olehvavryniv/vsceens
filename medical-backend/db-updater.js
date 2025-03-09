import MongoService from './mongo-service.js';
import Axios from 'axios';
import URI from 'urijs';

class DbUpdater {
    constructor() {
        const screenId = process.env.SCREEN_ID;
        const host = process.env.VSCREEN_URL;
        this.dataTypes = [
            { url: `${host}/api/${screenId}/news`, name: 'news', paginated: true },
            { url: `${host}/api/${screenId}/doctor_infos`, name: 'doctor_infos', paginated: true },
            { url: `${host}/api/${screenId}/videos`, name: 'videos', paginated: true },
            { url: `${host}/api/${screenId}/organization`, name: 'organization', paginated: false },
        ];
    }

    async updateData() {
        try {
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
                    if (dataType.paginated) {
                        page++;
                    } else {
                        break;
                    }
                }
                const dbCollection = dbService.DB.collection(dataType.name);
                await dbCollection.deleteMany();
                if (data.length > 0) {
                    await dbCollection.insertMany(data);
                }
            }   
        } catch (error) {
            console.log("DB update error", error);
        }
    }
}

export default DbUpdater;
