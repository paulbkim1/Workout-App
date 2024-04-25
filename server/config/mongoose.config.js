const mongoose = require("mongoose");

const dbName = "workout-tracker"; // Replace with your actual database name

mongoose
  .connect(
    `mongodb+srv://paulbkim3:Tvbever17@workout.gukoepo.mongodb.net/${dbName}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(`Successfully connected to ${dbName}`);
  })
  .catch((error) => {
    console.log(`Mongoose connection to ${dbName} failed: `, error);
  });
