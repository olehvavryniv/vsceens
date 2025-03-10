import ScreenController from './screen-controller.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DbUpdater from './db-updater.js';
import MongoService from './mongo-service.js';
import Axios from 'axios';
import SchedulesController from './schedules-controller.js';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import fs from 'fs';

dotenv.config();
Axios.defaults.headers.common['Token'] = process.env.SCREEN_TOKEN;

const app = express();
const screenController = new ScreenController();
const schedulesController = new SchedulesController();

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Kiev');

app.use(cors());

app.get('/next-screen', async (req, res) => {
  const nextScreen = await screenController.nextScreen();
  if (nextScreen == null) {
    return res.send({ error: 'no-data' });
  } else {
    return res.send(nextScreen);
  }
});

app.get('/get-schedules', async (req, res) => {
  return res.send(schedulesController.getSchedules());
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`VSCREEN app listening at http://localhost:${process.env.PORT}`)
});

async function updateData(){
  const q = new DbUpdater();
  await q.updateData();
}

async function Init() {
  await MongoService.InitConnection();
  await updateData();
  await schedulesController.loadSchedules();

  setInterval(() => updateData(), 10 * 60 * 1000);
  setInterval(() => sendTemp(), 1 * 60 * 1000);
  console.log("App started.");
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

Init();

// const dbService = new MongoService();
// dbService.collection('')
