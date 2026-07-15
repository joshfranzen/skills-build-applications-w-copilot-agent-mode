"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    team: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    totalMinutes: { type: Number, required: true, min: 0 },
    totalCalories: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 }
}, { timestamps: true });
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
