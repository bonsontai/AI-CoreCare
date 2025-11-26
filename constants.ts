import { ExerciseType, TrainingLevel, TrainingConfig, UserProfileData, TrainingSession } from './types';

// Configuration for Training Levels as requested
export const EXERCISE_MAPPING: TrainingConfig = {
  [ExerciseType.SQUAT]: {
    [TrainingLevel.LOWER]: '扶椅深蹲',
    [TrainingLevel.MIDDLE]: '座椅深蹲',
    [TrainingLevel.UPPER]: '徒手深蹲',
  },
  [ExerciseType.KETTLEBELL]: {
    [TrainingLevel.LOWER]: '壺鈴站立提拉',
    [TrainingLevel.MIDDLE]: '壺鈴提舉',
    [TrainingLevel.UPPER]: '壺鈴擺盪', // Added upper to complete the structure based on context
  },
  [ExerciseType.SEATED]: {
    [TrainingLevel.LOWER]: '坐姿基礎',
    [TrainingLevel.MIDDLE]: '坐姿中級',
    [TrainingLevel.UPPER]: '坐姿高階',
  },
};

// Mock Data for the User
export const MOCK_SESSIONS: TrainingSession[] = [
  {
    id: '1',
    date: '2023-10-24 10:00',
    type: ExerciseType.SQUAT,
    pose: '座椅深蹲',
    result: 'Good',
    errorCount: 2,
    correctCount: 15,
    suggestion: '膝蓋有些微內夾，請注意保持膝蓋與腳尖同向。',
  },
  {
    id: '2',
    date: '2023-10-25 14:30',
    type: ExerciseType.KETTLEBELL,
    pose: '壺鈴提舉',
    result: 'Excellent',
    errorCount: 0,
    correctCount: 20,
    suggestion: '動作非常標準，繼續保持核心收緊。',
  },
  {
    id: '3',
    date: '2023-10-26 09:15',
    type: ExerciseType.SEATED,
    pose: '坐姿中級',
    result: 'Fair',
    errorCount: 5,
    correctCount: 10,
    suggestion: '腰部容易拱起，請貼緊椅背。',
  },
  {
    id: '4',
    date: '2023-10-27 18:00',
    type: ExerciseType.SQUAT,
    pose: '座椅深蹲',
    result: 'Good',
    errorCount: 1,
    correctCount: 18,
    suggestion: '做得很好，下蹲速度可以再慢一點。',
  },
];

export const MOCK_USER_PROFILE: UserProfileData = {
  name: "陳小明",
  // Simulated "Database Suggestions" determining the level
  recommendations: {
    [ExerciseType.SQUAT]: TrainingLevel.MIDDLE,     // Database suggests Middle
    [ExerciseType.KETTLEBELL]: TrainingLevel.UPPER, // Database suggests Upper
    [ExerciseType.SEATED]: TrainingLevel.LOWER,     // Database suggests Lower
  },
  sessions: MOCK_SESSIONS
};
