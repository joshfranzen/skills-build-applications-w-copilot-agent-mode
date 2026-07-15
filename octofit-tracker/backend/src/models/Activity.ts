import { Schema, model } from 'mongoose';

export interface ActivityDocument {
  username: string;
  activityType: string;
  durationMinutes: number;
  caloriesBurned: number;
  activityDate: Date;
  notes: string;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    username: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    activityDate: { type: Date, required: true },
    notes: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const Activity = model<ActivityDocument>('Activity', activitySchema);