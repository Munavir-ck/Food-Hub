const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const foodTypeSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const category = new mongoose.Schema({
  title: { type: String, required: true },

  description: { type: String, required: true },

  foodType: [foodTypeSchema],
});

module.exports = mongoose.model("category", category);
