"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_js_1 = require("../models/index.js");
const router = (0, express_1.Router)();
router.get('/health', (_request, response) => {
    response.json({ status: 'ok', database: 'octofit_db' });
});
router.get('/users', async (_request, response, next) => {
    try {
        response.json(await index_js_1.User.find().sort({ username: 1 }));
    }
    catch (error) {
        next(error);
    }
});
router.get('/teams', async (_request, response, next) => {
    try {
        response.json(await index_js_1.Team.find().sort({ name: 1 }));
    }
    catch (error) {
        next(error);
    }
});
router.get('/activities', async (_request, response, next) => {
    try {
        response.json(await index_js_1.Activity.find().sort({ activityDate: -1 }));
    }
    catch (error) {
        next(error);
    }
});
router.get('/leaderboard', async (_request, response, next) => {
    try {
        response.json(await index_js_1.Leaderboard.find().sort({ rank: 1 }));
    }
    catch (error) {
        next(error);
    }
});
router.get('/workouts', async (_request, response, next) => {
    try {
        response.json(await index_js_1.Workout.find().sort({ difficulty: 1, name: 1 }));
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
