import { Router } from 'express';
// import fs from 'fs-extra';
import db from './db';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' });
});

routes.post("/user/findOrCreate", async (req, res) => {
  let user = await db.users.findOne({ uid: req.body.uid });

  if( ! user ){
    user = await db.users.insert(req.body);
  }

  res.json(user);
})

routes.get("/user/workouts", async (req, res) => {
  let workouts = await db.workouts.find({ uid: db.ObjectId(req.query.uid) });

  if( workouts )
    return res.json(workouts);

  return res.json(null);
})

routes.get("/user/workouts/overview", async(req, res) => {
  let workouts = await db.workouts.find({ uid: db.ObjectId(req.query.uid) });

  if( workouts ){
    let workoutCount = {};
    let exerciseCount = {};
    workouts.forEach(workout => {
      if( workout.name === "undefined" ) return;

      if( ! workoutCount[workout.name] ){
        workoutCount[workout.name] = 0;
      }

      workoutCount[workout.name]++;

      workout.excercises.forEach(item => {
        if (!exerciseCount[item.exercise_name]) {
          exerciseCount[item.exercise_name] = 0;
        }

        exerciseCount[item.exercise_name]++;
      })
    })

    let exerciseFavorites = Object.keys(exerciseCount).map(key => ({ name: key, count: exerciseCount[key] }))
    exerciseFavorites = exerciseFavorites.sort((a, b) => {
      if( a.count > b.count )
        return -1;
      if( a.count === b.count )
        return 0;
      if( a.count < b.count )
        return 1;
    }).slice(0, 5).reduce( (carry, next) => {
      carry[next.name] = next.count;
      return carry;
    }, {} );

    res.json({ favWorkouts: workoutCount, favExercises: exerciseFavorites});
  }
  else{
    return res.json({message: "No workouts yet. Get Started"});
  }
})

// routes.get('/seed', async (req, res) => {
//   let data = await fs.readFile(__dirname + "/../resources/workouts.csv");
//   let rows = data.toString().split("\n");
  
//   rows = rows.map(row => row.split(";").map(cell => cell.replace('\"', "").replace('\"', "")));

//   let headers = rows[0];

//   rows.shift();

//   let workouts = {};

//   rows = rows.map( row => {
//     let temp = {};
//     headers.forEach((data, idx) => temp[data.toLowerCase().replace(/ /g, "_")] = row[idx]);
//     return temp;
//   } )

//   rows.forEach( row => {
//     if( ! workouts[row.workout_name + "|" + row.date] ){
//       workouts[row.workout_name + "|" + row.date] = [];
//     }

//     workouts[row.workout_name + "|" + row.date].push(row);
//   })

//   let promises = [];
//   await db.workouts.remove({});

//   let user = await db.users.findOne({ email: "andrewklatzke@gmail.com" });
//   for( let key in workouts ){
//     let workout = workouts[key];

//     let result = await db.workouts.insert({
//       name: key.split("|")[0],
//       uid: user._id,
//       notes: "",
//       excercises: workout
//     })

//     console.log(result);
//   }

//   res.json(workouts);
// })

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
routes.get('/list', (req, res, next) => {
  const { title } = req.query;

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'));
    return;
  }

  res.render('index', { title });
});

export default routes;
