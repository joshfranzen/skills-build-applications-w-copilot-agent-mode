import { Schema, model } from 'mongoose';

export interface LeaderboardDocument {
  username: string;
  team: string;
  rank: number;
  totalMinutes: number;
  totalCalories: number;
  points: number;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    team: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    totalMinutes: { type: Number, required: true, min: 0 },
    totalCalories: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);