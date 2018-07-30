import mongo from 'then-mongo';

export default mongo(MONGODB_URI, ['workouts', 'users', 'exercises', 'exerciseReference']);
