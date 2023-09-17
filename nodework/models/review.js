const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  rid: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
  },
  subject:{
    type: String,
    required: true,
  },
  message:{
    type: String,
    // required: true,
  }

});

const ReviewModel = mongoose.model("review", ReviewSchema);
module.exports = ReviewModel;