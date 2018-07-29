import fs from 'fs-extra';
import moment from 'moment';

export default (r, db) => {
    r.get('/seed', async (req, res) => {
        let data = await fs.readFile(__dirname + "/../../resources/workouts.csv");
        let rows = data.toString().split("\n");

        rows = rows.map(row => row.split(";").map(cell => cell.replace('\"', "").replace('\"', "")));

        let headers = rows[0];

        rows.shift();

        let workouts = {};

        let uniqueExcercises = rows.map( row => row[2] ? row[2].trim() : null ).filter( ( name, index, arr ) => name && arr.indexOf(name) === index );

        rows = rows.map(row => {
            let temp = {};
            headers.forEach((data, idx) => temp[data.toLowerCase().replace(/ /g, "_")] = row[idx]);
            return temp;
        })

        rows.forEach(row => {
            if (!workouts[row.workout_name + "|" + row.date]) {
            workouts[row.workout_name + "|" + row.date] = [];
            }

            workouts[row.workout_name + "|" + row.date].push(row);
        })

        await db.workouts.remove({});
        await db.exercises.remove({})

        let user = await db.users.findOne({
            email: "andrewklatzke@gmail.com"
        });

        let exerciseRecords = await db.exercises.insert( uniqueExcercises.map( i => ({ muscleGroup: "", name: i }) ) );

        for (let key in workouts) {
            let workout = workouts[key];

            if (workout.name === "undefined") continue;

            let exercises = workout.map( workout => {
                let exerciseKey = exerciseRecords.find( record => record.name === workout.exercise_name );
                if( exerciseKey ){
                    workout.exerciseId = exerciseKey._id;
                    delete workout.exercise_name;
                    delete workout.workout_name;
                    delete workout.date;
                    delete workout.workout_notes;
                }
            } )

            let timestamp = moment(key.split("|")[1], "YYYY-MM-DD h-mmm-ss").unix();
            let result = await db.workouts.insert({
                name: key.split("|")[0],
                date: timestamp,
                uid: user._id,
                notes: "",
                exercises: workout
            })
        }

        res.json(true);
    })
}