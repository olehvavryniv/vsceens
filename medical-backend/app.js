import ScreenController from './screen-controller.js';
import express from 'express';
import dotenv from 'dotenv';
import DbUpdater from './db-updater.js';
import MongoService from './mongo-service.js';

dotenv.config();
MongoService.InitConnection();

const app = express();
const screenController = new ScreenController();

app.get('/next-screen', (req, res) => {
  return res.send(screenController.nextScreen());
});

app.listen(process.env.PORT, () => {
  console.log(`VSCREEN app listening at http://localhost:${process.env.PORT}`)
});

async function test() {
  // const service = new MongoService();
  // await service.init();
  // const res = await service.videos.insertOne({test: "123"});
  // console.log(res);
  const q = new DbUpdater();
  await q.updateData();

}

test();