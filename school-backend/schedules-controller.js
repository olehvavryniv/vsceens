import MongoService from "./mongo-service.js";
import dayjs from "dayjs";

class SchedulesController {
    constructor() {
        this.dbService = new MongoService();
    }

    async loadSchedules() {
        this.schedules = await this.dbService.collection('school_schedules').find().toArray();
        this.schedules = this.schedules.map((schedule) => {
            return {
                ...schedule,
                scheduleItems: schedule.scheduleItems.map((lesson) => {
                    return {
                        ...lesson,
                        startTime: dayjs(lesson.startTime),
                        endTime: dayjs(lesson.endTime)
                    }
                })
            }
        });
    }

    getSchedules() {
        return this.schedules.map((schedule) => {
            return this.getCurrentStatus(schedule);
        });
    }

    getCurrentLesson(schedule) {
        const now = dayjs().year(2000).month(0).date(1);
        return schedule.scheduleItems.find((lesson) => {
            const startDiff = now.diff(lesson.startTime, 'minute');
            const endDiff = lesson.endTime.diff(now, 'minute');

            return startDiff >= 0 && endDiff >= 0;
        });
    }

    getNextLesson(schedule) {
        return schedule.scheduleItems.find((item, index, array) => {
            if (index === 0) {
                return false;
            }

            const now = dayjs().year(2000).month(0).date(1);
            const prevLesson = array[index - 1];
            const fromPrevDiff = now.diff(prevLesson.endTime, 'second');
            const toCurrentDIff = item.startTime.diff(now, 'second');
            return fromPrevDiff >= 0 && toCurrentDIff >= 0;
        });
    }

    getCurrentStatus(schedule) {
        const currentLesson = this.getCurrentLesson(schedule);
        const now = dayjs().year(2000).month(0).date(1);
        if (currentLesson) {
            const secondsDiff = currentLesson.endTime.diff(now, 'seconds');
            return {
                isLesson: true,
                secondsLeft: secondsDiff,
                lessonName: currentLesson.name,
                scheduleName: schedule.name
            }
        }

        const nextLesson = this.getNextLesson(schedule);
        if (nextLesson) {
            return {
                isLesson: false,
                secondsLeft: nextLesson.startTime.diff(now, 'second'),
                scheduleName: schedule.name
            };
        }

        return {
            scheduleName: schedule.name,
            notStarted: true
        }
    }
}

export default SchedulesController;