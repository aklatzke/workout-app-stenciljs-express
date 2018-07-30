import mongo from 'then-mongo';

export default mongo("mongodb://heroku_57j9k2hn:ulu7mj5rb4hme068q5fmabm78m@ds259351.mlab.com:59351/heroku_57j9k2hn", ['workouts', 'users', 'exercises', 'exerciseReference']);
