// Exercise Types
export enum ExerciseType {
  SQUAT = '深蹲',
  KETTLEBELL = '壺鈴',
  SEATED = '坐姿'
}

export enum TrainingLevel {
  LOWER = 'lower',
  MIDDLE = 'middle',
  UPPER = 'upper'
}

export interface TrainingMapping {
  [TrainingLevel.LOWER]: string;
  [TrainingLevel.MIDDLE]: string;
  [TrainingLevel.UPPER]: string;
}

export interface TrainingConfig {
  [ExerciseType.SQUAT]: TrainingMapping;
  [ExerciseType.KETTLEBELL]: TrainingMapping;
  [ExerciseType.SEATED]: TrainingMapping;
}

// Data Record for a single session
export interface TrainingSession {
  id: string;
  date: string;
  type: ExerciseType;
  pose: string; // The specific move name
  result: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  errorCount: number;
  correctCount: number;
  suggestion: string; // Specific feedback for this session
}

// Aggregated Stats for Radar Chart
export interface RadarStats {
  subject: string;
  A: number; // Value
  fullMark: number;
}

// Profile Summary Data
export interface UserProfileData {
  name: string;
  recommendations: {
    [key in ExerciseType]: TrainingLevel;
  };
  sessions: TrainingSession[];
}
