const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  package: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  activity1:{
    type: String,
    required: true,
  },
  activity2:{
    type: String,
    // required: true,
  }

});

const PackageModel = mongoose.model("package", PackageSchema);
module.exports = PackageModel;