import { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  targetMuscles: string[];
  instructions: string;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetMuscles: { type: [String], required: true, default: [] },
    instructions: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);