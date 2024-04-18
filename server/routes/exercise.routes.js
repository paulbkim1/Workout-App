const express = require("express");

const {
  handleGetAllExercises,
  handleGetCategoryExercises,
  handlegetExerciseById,
  handleAddExerciseToPlan,
  handleGetExercisePlan,
  handleUpdateRoutine,
  handleGetTodaysExercise,
  handleDeleteExerciseFromPlan,
} = require("../controllers/exercise.controller");

const router = express.Router();

router.get("/get-exercise-plan", handleGetExercisePlan);
router.get("/get-todays-exercise", handleGetTodaysExercise);
router.get("/category", handleGetCategoryExercises);
router.get("/get-all-exercises", handleGetAllExercises);
router.get("/:id", handlegetExerciseById);
router.put("/add/:day", handleAddExerciseToPlan);
router.put("/update-routine", handleUpdateRoutine);
router.delete("/delete-from-plan", handleDeleteExerciseFromPlan);

module.exports = { exerciseRouter: router };
