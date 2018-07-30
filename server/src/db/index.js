import mongo from 'then-mongo';

export default mongo(process.env.MONGODB_URI || 'workouts', ['workouts', 'users', 'exercises', 'exerciseReference']);
