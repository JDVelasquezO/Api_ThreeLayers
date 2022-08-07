const workOutService = require("../services/workOutService");
const workOutController = {};

workOutController.getAllWorkouts = (req, res) => {
    const allWorkouts = workOutService.getAllWorkouts();
    res.send({ status: "OK", data: allWorkouts });
};

workOutController.getOneWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;

    if ( !workoutId )
        return;

    const workout = workOutService.getOneWorkout(workoutId);
    res.send({ status: "OK", data: workout });
};

workOutController.createNewWorkout = (req, res) => {
    const { body } = req ;

    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        // handle error
        res.status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                    "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'"
                }
            });
        return;
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips,
    };

    try {
        const createdWorkout = workOutService.createNewWorkout(newWorkout);
        res.status(201).send({ status: "OK", data: createdWorkout });
    } catch ( error ) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

workOutController.updateOneWorkout = (req, res) => {
    const {
        body,
        params: { workoutId },
    } = req;

    if ( !workoutId )
        return;

    const updatedWorkout = workOutService.updateOneWorkout(workoutId, body);
    res.send({ status: "OK", data: updatedWorkout });
};

workOutController.deleteOneWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;

    if ( !workoutId )
        return;

    workOutService.deleteOneWorkout(workoutId);
    res.status(204).send({ status: "OK" });
};

module.exports = workOutController;