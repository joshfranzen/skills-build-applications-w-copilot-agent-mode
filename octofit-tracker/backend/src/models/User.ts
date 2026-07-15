import { Schema, model } from 'mongoose';

export interface UserDocument {
  username: string;
  email: string;
  displayName: string;
  age: number;
  fitnessGoal: string;
  team: string;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessGoal: { type: String, required: true, trim: true },
    team: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const User = model<UserDocument>('User', userSchema);