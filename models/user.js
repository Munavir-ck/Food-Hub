const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const userSignup = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true },

  password: { type: String, required: true },

 

  access: { type: Boolean, default: true },
});

module.exports = mongoose.model("user", userSignup);
