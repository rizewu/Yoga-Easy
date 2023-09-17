const mongoose = require("mongoose");

const TestingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
//   username: {
//     type: String,
//     required: true,
//   },
});

const TestingModel = mongoose.model("testing", TestingSchema);
module.exports = TestingModel;