const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

    email: {
        type: String,
        required: true,
      
  },
  phone: {
    type: String,
    required: true,
  
},
pic: {
  type: String,
  // required: true,

},

gender: {
  type: String,
  // required: true,

},
DOB: {
  type: String,
  // required: true,

},
area: {
  type: String,
  // required: true,

},
city: {
  type: String,
  // required: true,

},
state: {
  type: String,
  // required: true,

},
postal: {
  type: String,
  // required: true,

},

password: {
    type: String,
    required: true,
  },

//   username: {
//     type: String,
//     required: true,
//   },
});

const RegisterModel = mongoose.model("register", RegisterSchema);
module.exports = RegisterModel