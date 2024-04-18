const {
  getCategoryExercises,
  getAllExercises,
  getExerciseById,
  addExerciseToPlan,
  getExercisePlan,
  updateRoutine,
  getTodaysExercise,
  deleteExerciseFromPlan,
} = require("../services/exercise.service");

const handleGetCategoryExercises = async (req, res) => {
  console.log("controller: handleGetCategoryExercises");
  try {
    const { category } = req.query;
    const exercises = await getCategoryExercises({ category });
    return res.json(exercises);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleGetAllExercises = async (req, res) => {
  console.log("controller: handleGetAllExercises");
  try {
    const exercises = await getAllExercises();
    return res.json(exercises);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handlegetExerciseById = async (req, res) => {
  console.log("controller: handleGetExercise", req.params);
  try {
    const exercise = await getExerciseById(req.params.id);
    return res.json(exercise);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleAddExerciseToPlan = async (req, res) => {
  console.log("controller: handleAddExerciseToPlan", req.params.day);
  const exerciseId = req.query["exercise-id"];
  try {
    const exercise = await addExerciseToPlan(
      req.token.userId,
      exerciseId,
      req.params.day
    );
    return res.json(exercise);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleGetExercisePlan = async (req, res) => {
  console.log("controller: handleGetExercisePlan");
  try {
    const exercises = await getExercisePlan(req.token.userId);
    return res.json(exercises);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleGetTodaysExercise = async (req, res) => {
  console.log("controller: handleGetTodaysExercise");
  try {
    const exercises = await getTodaysExercise(req.token.userId);
    return res.json(exercises);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleUpdateRoutine = async (req, res) => {
  console.log("controller: handleUpdateRoutine", req.body);
  const userId = req.token.userId;
  const { exercisePlan } = req.body;
  try {
    const exercise = await updateRoutine({
      userId,
      exercisePlan,
    });
    return res.json(exercise);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleDeleteExerciseFromPlan = async (req, res) => {
  console.log("controller: handleDeleteExerciseFromPlan", req.query);
  const userId = req.token.userId;
  const { day, exerciseId } = req.query;
  try {
    const exercise = await deleteExerciseFromPlan(userId, day, exerciseId);
    return res.json(exercise);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  handleGetCategoryExercises,
  handleGetAllExercises,
  handlegetExerciseById,
  handleAddExerciseToPlan,
  handleGetExercisePlan,
  handleUpdateRoutine,
  handleGetTodaysExercise,
  handleDeleteExerciseFromPlan,
};
