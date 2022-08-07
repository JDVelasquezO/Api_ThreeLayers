const DB = require("./db.json");
const { saveToDatabase } = require("./utils");
const WorkOut = {};

WorkOut.getAllWorkOuts = () => {
    return DB.workouts;
}

WorkOut.createNewWorkout = (newWorkout) => {
    const isAlreadyAdded =
        DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Workout with the name '${newWorkout.name}' already exists`,
        }
    }

    try {
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;
    } catch ( error ) {
        throw { status: 500, message: error?.message || error };
    }
};

WorkOut.getOneWorkout = (workOutId) => {
    const workOut = DB.workouts.find((workout) => workout.id === workOutId);
    if ( !workOut )
        return;

    return workOut;
}

WorkOut.updateOneWorkout = (workoutId, changes) => {
    const indexForUpdate = DB.workouts.findIndex(
        (workout) => workout.id === workoutId
    );

    if (indexForUpdate === -1)
        return;

    const updatedWorkout = {
        ...DB.workouts[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
    };

    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
}

WorkOut.deleteOneWorkout = (workoutId) => {
    const indexForDelete = DB.workouts.findIndex(
        (workout) => workout.id === workoutId
    );

    if (indexForDelete === -1)
        return;

    DB.workouts.splice(indexForDelete, 1);
    saveToDatabase(DB);
}

module.exports = WorkOut;