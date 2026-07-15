import { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  mascot: string;
  coach: string;
  members: string[];
  weeklyGoalMinutes: number;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    mascot: { type: String, required: true, trim: true },
    coach: { type: String, required: true, trim: true },
    members: { type: [String], required: true, default: [] },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export const Team = model<TeamDocument>('Team', teamSchema);