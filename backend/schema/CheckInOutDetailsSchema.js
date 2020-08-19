const mongoose = require("mongoose");

const CheckInOutSchema = mongoose.Schema({
    status_id:{ type: String, unique: true },
    //username: { type: String },
    email : {type: String, required: true},
    time: { type: String },
    action: { type: String }
});
module.exports = mongoose.model('CheckInOutStatus', CheckInOutSchema, 'checkInOut_status');
