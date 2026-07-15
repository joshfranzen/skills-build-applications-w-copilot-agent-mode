"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    mascot: { type: String, required: true, trim: true },
    coach: { type: String, required: true, trim: true },
    members: { type: [String], required: true, default: [] },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 }
}, { timestamps: true });
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
