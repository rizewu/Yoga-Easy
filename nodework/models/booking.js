const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
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
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    package : {
        type: String,
        // required: true,
    },
    user_id : {
        type: String,
        // required: true,
    },
    payment_status : {
        type: String,
        // required: true,
    },
    inst_id : {
        type: String,
        required: true,
    }
});

const BookingModel = mongoose.model("booking", BookingSchema);
module.exports = BookingModel