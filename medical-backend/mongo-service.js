import MongoClient from 'mongodb';

class MongoService {
    constructor() {
        this.DBName = process.env.MONGO_DB_NAME;
    }

    static async InitConnection() {
        MongoService.mongoClient = await MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true });
    }

    get DB() {
        return MongoService.mongoClient.db(this.DBName); 
    }

    get videos() {
        return this.DB.collection('videos');
    }
}

export default MongoService;