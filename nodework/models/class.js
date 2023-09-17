const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
 pic: {
    type: String,
    required: true,
  },
  yoga: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  }

});

const ClassModel = mongoose.model("class", ClassSchema);
module.exports = ClassModel;