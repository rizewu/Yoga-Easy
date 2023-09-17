
const mongoose = require("mongoose");

const YogaidSchema = new mongoose.Schema({
  yoga_id: {
    type: String,
    required: true,
  },
 
});

const YogaidModel = mongoose.model("yogaid", YogaidSchema);
module.exports = YogaidModel;