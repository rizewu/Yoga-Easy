const mongoose = require("mongoose");

const RteacherSchema = new mongoose.Schema({
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
        required: true,
    },
    exp: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    activity: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
    
});

const RteacherModel = mongoose.model("RegisteredTeachers", RteacherSchema);
module.exports = RteacherModel