import ScreenController from './screen-controller.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DbUpdater from './db-updater.js';
import MongoService from './mongo-service.js';
import Axios from 'axios';
import fs from 'fs';

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

async function updateData() {
  const q = new DbUpdater();
  await q.updateData();
}

function sendTemp() {
  try {
    const rawTemp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
    // const rawTemp = 30000;
    const temp = rawTemp / 1000;

    const screenId = process.env.SCREEN_ID;
    const host = process.env.VSCREEN_URL;
    Axios.post(`${host}/api/${screenId}/temp_logs`, { temp: temp });
  }
  catch (e) {
    console.log(e);
  }
}

async function Init() {
  await MongoService.InitConnection();
  await updateData();

  setInterval(() => updateData(), 60000);
  setInterval(() => sendTemp(), 60000);
 
  console.log("App started.");
}

Init();
