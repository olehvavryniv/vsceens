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

  setInterval(() => updateData(), 30000);
  console.log("App started.");
}

Init();