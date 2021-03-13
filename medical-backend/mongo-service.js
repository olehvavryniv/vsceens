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

    collection(collectionName) {
        return this.DB.collection(collectionName);
    }

    async getNext(collectionName, offset) {
        return await this.collection(collectionName).find().skip(offset).limit(1).toArray();
    }

    async count(collectionName) {
        return await this.collection(collectionName).countDocuments();
    }
}

export default MongoService;