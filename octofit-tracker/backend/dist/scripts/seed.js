"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_js_1 = require("../models/index.js");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const users = [
    {
        username: 'alex_rivera',
        email: 'alex.rivera@example.com',
        displayName: 'Alex Rivera',
        age: 16,
        fitnessGoal: 'Build endurance for soccer season',
        team: 'Cardio Crew'
    },
    {
        username: 'maya_chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        age: 17,
        fitnessGoal: 'Improve upper body strength',
        team: 'Strength Squad'
    },
    {
        username: 'jordan_smith',
        email: 'jordan.smith@example.com',
        displayName: 'Jordan Smith',
        age: 15,
        fitnessGoal: 'Stay active after school',
        team: 'Flex Force'
    }
];
const teams = [
    {
        name: 'Cardio Crew',
        mascot: 'Lightning Bolt',
        coach: 'Coach Morgan',
        members: ['alex_rivera'],
        weeklyGoalMinutes: 300
    },
    {
        name: 'Strength Squad',
        mascot: 'Iron Shield',
        coach: 'Coach Patel',
        members: ['maya_chen'],
        weeklyGoalMinutes: 240
    },
    {
        name: 'Flex Force',
        mascot: 'Silver Spring',
        coach: 'Coach Brooks',
        members: ['jordan_smith'],
        weeklyGoalMinutes: 210
    }
];
const activities = [
    {
        username: 'alex_rivera',
        activityType: 'Running',
        durationMinutes: 45,
        caloriesBurned: 430,
        activityDate: new Date('2026-07-12T15:30:00Z'),
        notes: 'Interval run on the track with steady cooldown'
    },
    {
        username: 'maya_chen',
        activityType: 'Strength Training',
        durationMinutes: 50,
        caloriesBurned: 310,
        activityDate: new Date('2026-07-13T16:00:00Z'),
        notes: 'Dumbbell circuit with squats, presses, and rows'
    },
    {
        username: 'jordan_smith',
        activityType: 'Yoga',
        durationMinutes: 35,
        caloriesBurned: 140,
        activityDate: new Date('2026-07-14T14:15:00Z'),
        notes: 'Mobility flow focused on hips and hamstrings'
    }
];
const leaderboard = [
    { username: 'alex_rivera', team: 'Cardio Crew', rank: 1, totalMinutes: 285, totalCalories: 2360, points: 1180 },
    { username: 'maya_chen', team: 'Strength Squad', rank: 2, totalMinutes: 250, totalCalories: 1980, points: 990 },
    { username: 'jordan_smith', team: 'Flex Force', rank: 3, totalMinutes: 205, totalCalories: 1425, points: 710 }
];
const workouts = [
    {
        name: 'Track Tempo Builder',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves'],
        instructions: 'Warm up for 10 minutes, alternate tempo laps with easy laps, then cool down.'
    },
    {
        name: 'Foundational Strength Circuit',
        category: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 35,
        targetMuscles: ['Chest', 'Back', 'Glutes'],
        instructions: 'Complete three rounds of pushups, rows, squats, and planks with controlled rest.'
    },
    {
        name: 'Recovery Mobility Flow',
        category: 'Flexibility',
        difficulty: 'Beginner',
        durationMinutes: 25,
        targetMuscles: ['Hips', 'Hamstrings', 'Shoulders'],
        instructions: 'Move slowly through lunges, forward folds, shoulder openers, and breathing drills.'
    }
];
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            index_js_1.User.deleteMany({}),
            index_js_1.Team.deleteMany({}),
            index_js_1.Activity.deleteMany({}),
            index_js_1.Leaderboard.deleteMany({}),
            index_js_1.Workout.deleteMany({})
        ]);
        await Promise.all([
            index_js_1.User.insertMany(users),
            index_js_1.Team.insertMany(teams),
            index_js_1.Activity.insertMany(activities),
            index_js_1.Leaderboard.insertMany(leaderboard),
            index_js_1.Workout.insertMany(workouts)
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
