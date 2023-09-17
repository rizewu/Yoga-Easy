const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
 blog: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
  }

});

const BlogModel = mongoose.model("blogs", BlogSchema);
module.exports = BlogModel;