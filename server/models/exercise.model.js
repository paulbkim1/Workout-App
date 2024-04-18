const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  id: { type: Number, required: false },
  name: { type: String, required: false },
});

const MuscleSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  name: { type: String, required: false },
  image_url_main: { type: String, required: false },
  image_url_secondary: { type: String, required: false },
});

const EquipmentSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  name: { type: String, required: false },
});

const ImageSchema = new mongoose.Schema({
  exercise_base: { type: Number, required: false },
  image: { type: String, required: false },
});

const ExerciseSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  name: { type: String, required: false },
  description: { type: String, required: false },
  language: { type: Number, required: false },
});

const VideoSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  video: { type: String, required: false },
  size: { type: Number, required: false },
  width: { type: Number, required: false },
  height: { type: Number, required: false },
});

const ExerciseBaseSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  category: { type: CategorySchema, required: false },
  muscles: { type: [MuscleSchema], required: false },
  muscles_secondary: { type: [MuscleSchema], required: false },
  equipment: { type: [EquipmentSchema], required: false },
  images: { type: [ImageSchema], required: false },
  exercises: { type: [ExerciseSchema], required: false },
  videos: { type: [VideoSchema], required: false },
});

const Exercise = mongoose.model("Exercise", ExerciseBaseSchema);

module.exports = { Exercise };
