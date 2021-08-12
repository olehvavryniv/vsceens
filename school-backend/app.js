import ScreenController from './screen-controller.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DbUpdater from './db-updater.js';
import MongoService from './mongo-service.js';
import Axios from 'axios';

dotenv.config();
Axios.defaults.headers.common['Token'] = process.env.SCREEN_TOKEN;

const app = express();
const screenController = new ScreenController();

app.use(cors());

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

async function updateData(){
  const q = new DbUpdater();
  await q.updateData();
}

async function Init() {
  await MongoService.InitConnection();
  await updateData();

  setInterval(() => updateData(), 30000);
  console.log("App started.");
}

Init();