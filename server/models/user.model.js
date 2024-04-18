const mongoose = require("mongoose");

const WorkoutPlanDaySchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
  },
  isActive: {
    type: Boolean,
    require: false,
  },
  reps: {
    type: Number,
    required: false,
  },
  sets: {
    type: Number,
    required: false,
  },
});

const WorkoutPlanSchema = new mongoose.Schema({
  monday: [WorkoutPlanDaySchema],
  tuesday: [WorkoutPlanDaySchema],
  wednesday: [WorkoutPlanDaySchema],
  thursday: [WorkoutPlanDaySchema],
  friday: [WorkoutPlanDaySchema],
  saturday: [WorkoutPlanDaySchema],
  sunday: [WorkoutPlanDaySchema],
});

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, `First name is required!`],
    },
    lastName: {
      type: String,
      required: [true, `Last name is required!`],
    },
    email: {
      type: String,
      required: [true, `Email is required!`],
      minlength: [3, `Email must be at least {MINLENGTH} characters`],
    },
    password: {
      type: String,
      required: [true, `password is required!`],
      minlength: [5, `password must be at least {MINLENGTH} characters`],
    },
    workoutPlan: { type: WorkoutPlanSchema, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
