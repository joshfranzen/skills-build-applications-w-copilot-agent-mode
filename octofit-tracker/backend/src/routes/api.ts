import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();

router.get('/health', (_request, response) => {
  response.json({ status: 'ok', database: 'octofit_db' });
});

router.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ username: 1 }));
  } catch (error) {
    next(error);
  }
});

router.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

router.get('/activities', async (_request, response, next) => {
  try {
    response.json(await Activity.find().sort({ activityDate: -1 }));
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().sort({ rank: 1 }));
  } catch (error) {
    next(error);
  }
});

router.get('/workouts', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ difficulty: 1, name: 1 }));
  } catch (error) {
    next(error);
  }
});

export default router;