import ScreenController from './screen-controller.js';
import express from 'express';
import dotenv from 'dotenv';
import DbUpdater from './db-updater.js';
import MongoService from './mongo-service.js';

dotenv.config();
MongoService.InitConnection();

const app = express();
const screenController = new ScreenController();

app.get('/next-screen', async (req, res) => {
  const nextScreen = await screenController.nextScreen();
  if (nextScreen == null) {
    return res.send({ error: 'no-data' });
  } else {
    return res.send(nextScreen);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`VSCREEN app listening at http://localhost:${process.env.PORT}`)
});

async function test() {
  const q = new DbUpdater();
  await q.updateData();
}

test();