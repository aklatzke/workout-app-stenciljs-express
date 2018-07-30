export default (r, db) => {
  r.get("/user/workouts", async (req, res) => {
    let workouts = await db.workouts.find({
      uid: db.ObjectId(req.query.uid)
    });

    if (workouts)
      return res.json(workouts);

    return res.json(null);
  })

  r.get("/user/:uid/workouts/overview", async (req, res) => {
    let workouts = await db.workouts.find({
      uid: db.ObjectId(req.params.uid)
    });

    let exercises = {}
    let exerciseRecords = await db.exerciseReference.find({})
    
    exerciseRecords.forEach(obj => {
        exercises[obj._id] = obj
    });

    if (workouts) {
      let workoutCount = {};
      let exerciseCount = {};
      workouts.forEach(workout => {
        if (workout.name === "undefined") return;

        if (!workoutCount[workout.name]) {
          workoutCount[workout.name] = 0;
        }

        workoutCount[workout.name]++;

        if (workout.exercises) {
            workout.exercises.forEach((item, idx) => {
                if(! item.exerciseId ) return;

                if (!exerciseCount[item.exerciseId]) {
                    exerciseCount[item.exerciseId] = 0;
                }

                exerciseCount[item.exerciseId]++;
            })
        }
      })

      let exerciseFavorites = Object.keys(exerciseCount).map(key => ({
        name: key,
        count: exerciseCount[key]
      }))

      exerciseFavorites = exerciseFavorites
                            .sort((a, b) => {
                                if (a.count > b.count)
                                return -1;
                                if (a.count === b.count)
                                return 0;
                                if (a.count < b.count)
                                return 1;
                            })
                            .slice(0, 5)
                            .map( item => {
                                item.name = exercises[item.name].name;

                                return item;
                            })
                            .reduce((carry, next) => {
                                carry[next.name] = next.count;
                                return carry;
                            }, {});

      res.json({
        favWorkouts: workoutCount,
        favExercises: exerciseFavorites
      });
    } else {
      return res.json({
        message: "No workouts yet. Get Started"
      });
    }
  })

  r.get("/user/exercises/all/", async (req, res) => {
    let workouts = await db.workouts.find({
      uid: db.ObjectId(req.query.uid)
    });

    let exerciseMap = {};
    let exercises = await db.exerciseReference.find({});

    exercises.forEach( obj => exerciseMap[obj._id] = obj );

    let groupedExercises = [];

    if (!workouts) res.end("404")

    workouts.forEach(workout => workout.exercises ? workout.exercises.forEach(exercise => {
      if (exercise.exerciseId) {
        groupedExercises.push(exercise.exerciseId.toString())
      } else {
        return;
      }
    }) : null)

    Object.keys(exerciseMap).filter( key => {
        if(! groupedExercises.includes(key) )
            delete exerciseMap[key];
    } )

    let final = Object.keys(exerciseMap).map(key => exerciseMap[key]);

    res.json(final);
  })

  r.get("/user/:uid/excercise/:eid/detail", async (req, res) => {
    let workouts = await db.workouts.find({
      uid: db.ObjectId(req.params.uid),
      exercises: { $elemMatch: { exerciseId: db.ObjectId(req.params.eid) } }
    });

    let exerciseRecord = await db.exerciseReference.findOne({ _id : db.ObjectId(req.params.eid) });

    let targetExcercises = {
      data: {

      },
      proper: exerciseRecord.name
    };

    workouts.forEach(workout => workout.exercises.forEach(exercise => {
      if (exercise.exerciseId) {
        if (exercise.exerciseId.toString() === req.params.eid.toString()) {
          if (!targetExcercises.data[workout.date]) {
            targetExcercises.data[workout.date] = [];
          }

          targetExcercises.data[workout.date].push({
            date: workout.date,
            ...exercise
          });
        }
      }
    }))

    for (let key in targetExcercises.data) {
      let arr = targetExcercises.data[key];
      let totals = {
        reps: 0,
        weight: 0
      }

      arr.forEach(set => {
        totals.reps += parseInt(set.reps);
        totals.weight += parseInt(set.weight) * parseInt(set.reps);
      })

      totals.avgRep = Math.floor(totals.weight / totals.reps);

      targetExcercises.data[key] = totals;
    }

    targetExcercises.rawArray = Object.keys(targetExcercises.data).map(key => targetExcercises.data[key]);

    res.json(targetExcercises);
  })

  r.get("/user/:uid/workouts/list", async(req, res) => {
    let workouts = await db.workouts.find({
      uid: db.ObjectId(req.params.uid)
    });

    let workoutResponse = workouts.map( record => ({
      _id: record._id,
      name: record.name
    }) )

    res.json(workoutResponse);
  })

  r.post("/user/:uid/workout/new", async(req, res) => {

    if( req.body.template ){

    }
    else{
      let insert = await db.workouts.insert({ 
        name: req.body.name,
        date: req.body.timestamp,
        uid: req.params.uid,
        isActive: true
      })

      res.json(insert);
    }
  })

  r.get("/user/:uid/workout/active", async(req,res) => {
    let activeWorkout = await db.workouts.findOne({
      uid: req.params.uid,
      isActive: true
    })

    res.json(activeWorkout);
  })

  r.get("/exercises/list", async(req, res) => {
    let exercises = await db.exerciseReference.find({});
    let groups = {};

    exercises.forEach(record => {
      if( ! groups[record.muscleGroup] )
        groups[record.muscleGroup] = [];

      groups[record.muscleGroup].push(record);
    })

    return res.json(groups);
  })

  r.get("/workout/:id/add/:eid", async(req, res) => {
    let object = {
      exerciseId: req.params.eid,
      set_order: 1,
      weight: 0,
      weight_unit: "lbs",
      reps: 0,
      distance: null,
      distance_unit: null,
      seconds: 0,
      notes: ""
    };

    let record = await db.workouts.find({
          _id: db.ObjectId(req.params.id)
        })

    let val = await db.workouts.update({
      _id: db.ObjectId(req.params.id)
    }, {
      $push : {
        exercises: object
      }
    })

    res.json(val);
  })

  r.post("/workout/:wId/finish", async(req, res) => {
    let result = await db.workouts.update({
      _id: db.ObjectId(req.params.wId)
    }, {
      isActive: false
    });

    res.json(result);
  })
}
