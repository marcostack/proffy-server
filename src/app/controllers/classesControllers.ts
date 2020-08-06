import { Request, Response } from 'express';

import db from '../../database/connection';
import convertHoursToMinutes from '../../utils/convertHoursToMinutes';

interface ScheduleItem {
  week_day: String,
  from: String,
  to: String
}

class ClassesController {
  async index(request: Request, response: Response){
    const filters = request.query;

    const week_day = filters.week_day as String;
    const subject = filters.subject as String;
    const time = filters.time as String;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeInMinutes = convertHoursToMinutes(time);

    const classes = await db('classes')
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);

  }

  async create(request: Request, response: Response) {
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
  }
}

export default ClassesController;
