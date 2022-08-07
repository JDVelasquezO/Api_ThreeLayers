const express = require("express");
const bodyParser = require("body-parser");
const workOutRouter = require("./routes/workOutRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/workouts", workOutRouter);

app.listen(PORT, () => {
    console.log("Running on port ", PORT);
});