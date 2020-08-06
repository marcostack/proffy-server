import { Router, Request, Response } from 'express';

import db from './database/connection';
import convertHoursToMinutes from './utils/convertHoursToMinutes';

const routes = Router();

interface ScheduleItem {
  week_day: String,
  from: String,
  to: String
}

routes.post('/classes', async (request: Request, response: Response) => {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule
  } = request.body;

  const transactions = await db.transaction();

  try {
    const insertedUserIds = await transactions('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const user_id = insertedUserIds[0];

    const insertedClassesIds = await transactions('classes').insert({
      subject,
      cost,
      user_id,
    });

    const class_id = insertedClassesIds[0];

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHoursToMinutes(scheduleItem.from),
        to: convertHoursToMinutes(scheduleItem.to),
      }
    });

    await transactions('class_schedule').insert(classSchedule);

    await transactions.commit();

    return response.sendStatus(201);
  } catch (error) {
    await transactions.rollback();

    return response.status(400).json({ error: error.message });
  }

});

export default routes;
