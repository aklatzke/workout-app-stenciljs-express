import mongo from 'then-mongo';
console.log(process.env.MONGODB_URI);
export default mongo(process.env.MONGODB_URI, ['workouts', 'users', 'exercises', 'exerciseReference']);
