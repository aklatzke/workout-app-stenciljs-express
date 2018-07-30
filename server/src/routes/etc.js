import fs from 'fs-extra';
import moment from 'moment';

let nameHash = {
    "Squat": "barbell full squat",
    "Calf Raise (With Decline)": "smith machine calf raise",
    "Goblet Squat": "goblet squat",
    "Leg Curl": "seated leg curl",
    "Leg Extension": "leg extensions",
    "Bench Press (Dumbbell)": "dumbbell bench press",
    "Close Grip Bench Press": "smith machine close-grip bench press",
    "Incline Press (Machine)": "smith machine incline bench press",
    "Bent Over Cable Fly": "incline cable flye",
    "Tricep Kickback": "tricep dumbbell kickback",
    "Bench Dips": "weighted bench dip",
    "Lateral Raise": "side lateral raise",
    "Upright Barbell Row": "upright barbell row",
    "Shoulder Press (Machine)": "cable shoulder press",
    "Shoulder Butterfly": "reverse flyes with external rotation",
    "Lat Pulldown": "wide-grip lat pulldown",
    "Bent Over Row": "bent over barbell row",
    "Reverse Grip Barbell Row": "reverse grip bent-over rows",
    "Bent Over Row (Dumbbell)": "bent over two-dumbbell row",
    "Crunch": "crunches",
    "Russian Twist": "russian twist",
    "Front Raise": "front plate raise",
    "Tricep Pull-down": "low cable triceps extension",
    "Side Bend (decline)": "dumbbell side bend",
    "Reverse Fly": "reverse flyes",
    "Back Extensions": "hyperextensions (back extensions)",
    "Seated Row": "rowing",
    "Lunge (Dumbbell)": "dumbbell lunges",
    "Bench Press": "smith machine bench press",
    "Standing Calf Raise": "smith machine calf raise",
    "Shrug": "smith machine shrug",
};

export default (r, db) => {
    r.get('/seed/data', async (req, res) => {
        let data = await fs.readFile(__dirname + "/../../resources/workouts.csv");
        let rows = data.toString().split("\n");

        rows = rows.map(row => row.split(";").map(cell => cell.replace('\"', "").replace('\"', "")));

        let headers = rows[0];

        rows.shift();

        let workouts = {};

        let uniqueExcercises = rows
                                .map( row => row[2] ? row[2].trim() : null )
                                .filter( ( name, index, arr ) => name && arr.indexOf(name) === index );

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

        let exerciseRecords = await db.exerciseReference.find({});

        for (let key in workouts) {
            let workout = workouts[key];

            if (workout.name === "undefined") continue;

            let exercises = workout.map( (ex, idx) => {
                if (ex.exercise_name && nameHash[ex.exercise_name.trim()]) {
                    let exerciseKey = exerciseRecords.find(record => record.name === nameHash[ex.exercise_name.trim()]);
                    if (exerciseKey) {
                        ex.exerciseId = exerciseKey._id;
                        delete ex.exercise_name;
                        delete ex.workout_name;
                        delete ex.date;
                        delete ex.workout_notes;
                    }

                    return ex;
                }
                else{
                    workout[idx] = null;
                }
            } )

            exercises = exercises.filter( item => item ? true : false );

            let timestamp = moment(key.split("|")[1], "YYYY-MM-DD h-mmm-ss").unix();
            let result = await db.workouts.insert({
                name: key.split("|")[0],
                date: timestamp,
                uid: user._id,
                notes: "",
                exercises: exercises
            })
        }

        res.json(true);
    })

    r.get("/seed/exercises", async (req, res) => {
        let data = await fs.readFile(__dirname + "/../../resources/exercises.csv");
        let rows = data.toString().split("\n");

        rows = rows.map( row => row.split(",") ).map(arr => ({
            name: arr[0].trim(),
            muscleGroup: arr[1].trim()
        }));

        await db.exerciseReference.delete({});

        let records = await db.exerciseReference.insert(rows);

        res.json(records);
    })
}