import mongo from 'then-mongo';

export default mongo(process.env.MONGODB_URI || 'workout', ['workouts', 'users', 'exercises', 'exerciseReference']);
