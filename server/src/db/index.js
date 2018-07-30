import mongo from 'then-mongo';

export default mongo(process.env.MONGODB_URI, ['workouts', 'users', 'exercises', 'exerciseReference']);
