const { v4: uuid } = require("uuid");
const WorkOut = require("../database/WorkOut");
const workOutService = {};

workOutService.getAllWorkouts = () => {
    return WorkOut.getAllWorkOuts();
};

workOutService.getOneWorkout = (workOutId) => {
    return WorkOut.getOneWorkout(workOutId);
};

workOutService.createNewWorkout = (newWorkOut) => {
    const workOutToInsert = {
        ...newWorkOut,
        id: uuid(),
        createdAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
    };

    // handle errors
    try {
        return WorkOut.createNewWorkout(workOutToInsert);
    } catch ( error ) {
        throw error;
    }
};

workOutService.updateOneWorkout = (workOutId, changes) => {
    return WorkOut.updateOneWorkout(workOutId, changes);
};

workOutService.deleteOneWorkout = (workOutId) => {
    WorkOut.deleteOneWorkout(workOutId);
};

module.exports = workOutService;

