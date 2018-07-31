import { ExerciseWorkoutType } from './ExerciseWorkoutType';

export class WorkoutType{
    _id: string;
    name: string;
    date: number;
    uid: string;
    isActive: boolean;
    exercises: [ExerciseWorkoutType]
}