const { Exercise } = require("../models/exercise.model");
const { User } = require("../models/user.model");

const getCategoryExercises = async ({ category }) => {
  console.log("service: getCategoryExercises");
  try {
    const exercises = await Exercise.find(
      { "category.name": category },
      "exercises images muscles muscles_secondary _id"
    ).lean();

    console.log("exercise", exercises);
    const formattedExercises = exercises.map((exercise) => ({
      _id: exercise._id,
      name:
        exercise.exercises.length > 0
          ? exercise.exercises[0].name
          : "Unnamed Exercise",
      image: exercise.images.length > 0 ? exercise.images[0].image : null,
      muscles: exercise.muscles.map((muscle) => ({
        name: muscle.name,
        image_url_main: muscle.image_url_main,
        image_url_secondary: muscle.image_url_secondary,
      })),
      muscles_secondary: exercise.muscles_secondary.map((muscle) => ({
        name: muscle.name,
        image_url_main: muscle.image_url_main,
        image_url_secondary: muscle.image_url_secondary,
      })),
    }));
    return formattedExercises;
  } catch (error) {
    console.error("Error getting category exercises:", error);
    throw error;
  }
};

const getAllExercises = async () => {
  console.log("service: getAllExercises");
  try {
    const exerciseList = await Exercise.find(
      {},
      "exercises images muscles muscles_secondary _id category"
    ).lean();

    // Initialize sets to store unique categories and muscle names
    const categoriesSet = new Set();
    const primaryMusclesSet = new Set();
    const secondaryMusclesSet = new Set();

    const exercises = exerciseList.map((exercise) => {
      // Add category to the set
      if (exercise.category) {
        categoriesSet.add(exercise.category.name);
      }

      // Add muscle names to their respective sets
      exercise.muscles.forEach((muscle) => primaryMusclesSet.add(muscle.name));
      exercise.muscles_secondary.forEach((muscle) =>
        secondaryMusclesSet.add(muscle.name)
      );

      return {
        _id: exercise._id,
        name:
          exercise.exercises.length > 0
            ? exercise.exercises[0].name
            : "Unnamed Exercise",
        image: exercise.images.length > 0 ? exercise.images[0].image : null,
        primaryMuscles: exercise.muscles.map((muscle) => muscle.name),
        secondaryMuscles: exercise.muscles_secondary.map(
          (muscle) => muscle.name
        ),
        category: exercise.category ? exercise.category.name : "",
      };
    });

    // Convert sets to arrays
    const labels = {
      categories: Array.from(categoriesSet),
      primaryMuscles: Array.from(primaryMusclesSet),
      secondaryMuscles: Array.from(secondaryMusclesSet),
    };

    return { exercises, labels };
  } catch (error) {
    console.error("Error getting all exercises:", error);
    throw error;
  }
};

const getExerciseById = async (id) => {
  console.log("service: getExercise");
  try {
    const exercises = await Exercise.findOne({ _id: id });
    return exercises;
  } catch (error) {
    console.error("Error getting category exercises:", error);
    throw error;
  }
};

const addExerciseToPlan = async (id, exerciseId, day) => {
  console.log("service: addExercise", day);

  try {
    const existingExerciseIndex = await User.findOne({
      _id: id,
      [`workoutPlan.${day}.exercise`]: exerciseId,
    })
      .select(`workoutPlan.${day}.$`)
      .exec();

    if (existingExerciseIndex) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $pull: {
            [`workoutPlan.${day}`]: { exercise: exerciseId },
          },
        },
        { new: true }
      );

      return updatedUser;
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $push: {
            [`workoutPlan.${day}`]: {
              exercise: exerciseId,
              reps: 0,
              sets: 0,
            },
          },
        },
        { new: true }
      );

      return updatedUser;
    }
  } catch (error) {
    console.error("Error adding/removing exercise:", error);
    throw error;
  }
};

const getExercisePlan = async (id) => {
  console.log("service: getExercisePlan");
  try {
    const user = await User.findById(id).populate({
      path: "workoutPlan",
      populate: [
        { path: "monday.exercise", model: "Exercise" },
        { path: "tuesday.exercise", model: "Exercise" },
        { path: "wednesday.exercise", model: "Exercise" },
        { path: "thursday.exercise", model: "Exercise" },
        { path: "friday.exercise", model: "Exercise" },
        { path: "saturday.exercise", model: "Exercise" },
        { path: "sunday.exercise", model: "Exercise" },
      ],
    });

    const daysOfWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    const exercisePlan = daysOfWeek.reduce((acc, day) => {
      acc[day] = user.workoutPlan[day].map(({ exercise, reps, sets }) => {
        // Assuming exercise.exercises[0] contains the desired exercise information
        const name =
          exercise.exercises.length > 0
            ? exercise.exercises[0].name
            : "Unnamed Exercise";
        const exerciseId = exercise._id; // Assuming this is the correct ID field
        return {
          name,
          reps,
          sets,
          exerciseId,
        };
      });
      return acc;
    }, {});

    console.log("Exercise Plan:", exercisePlan);
    return exercisePlan;
  } catch (error) {
    console.error("Error getting exercise plan:", error);
    throw error;
  }
};

const getTodaysExercise = async (id) => {
  console.log("service: getTodaysExercise");
  try {
    const user = await User.findById(id).populate({
      path: "workoutPlan",
      populate: {
        path: "monday.exercise tuesday.exercise wednesday.exercise thursday.exercise friday.exercise saturday.exercise sunday.exercise",
        model: "Exercise",
      },
    });

    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const currentDay = daysOfWeek[new Date().getDay()];

    const exercises = user.workoutPlan[currentDay] || [];

    console.log("Exercises:", exercises);

    const todaysExercises = exercises.map(({ exercise, reps, sets }) => {
      // Accessing the name from the first element of the exercises array
      const name =
        exercise.exercises.length > 0
          ? exercise.exercises[0].name
          : "Unnamed Exercise";
      const exerciseId = exercise._id; // Assuming this is the correct ID field
      return {
        name,
        reps,
        sets,
        exerciseId,
      };
    });

    console.log("Today's exercises:", todaysExercises);
    return todaysExercises;
  } catch (error) {
    console.error("Error getting today's exercises:", error);
    throw error;
  }
};

const updateRoutine = async ({ userId, exercisePlan }) => {
  console.log("service: updateRoutine", exercisePlan);

  const transformedExercisePlan = Object.keys(exercisePlan).reduce(
    (acc, day) => {
      acc[day] = exercisePlan[day].map(({ exerciseId, reps, sets }) => ({
        exercise: exerciseId, // Rename exerciseId to exercise
        reps,
        sets,
      }));
      return acc;
    },
    {}
  );

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { workoutPlan: transformedExercisePlan } },
      { runValidators: true, new: true }
    );
    console.log("Updated User:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating workout routine:", error);
    throw error;
  }
};

const deleteExerciseFromPlan = async (userId, day, exerciseId) => {
  console.log("service: deleteExerciseFromPlan", day, exerciseId);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          [`workoutPlan.${day}`]: { exercise: exerciseId },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    console.log("Updated User after deletion:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error deleting exercise from plan:", error);
    throw error;
  }
};

module.exports = {
  getCategoryExercises,
  getAllExercises,
  getExerciseById,
  addExerciseToPlan,
  getExercisePlan,
  updateRoutine,
  getTodaysExercise,
  deleteExerciseFromPlan,
};
