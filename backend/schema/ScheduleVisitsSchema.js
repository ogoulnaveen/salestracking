const mongoose = require("mongoose");

const ScheduleVisitsSchema = mongoose.Schema({
    schedule_visit_id: { type: Number, required: true, unique:true },
    vendor_id:{type:String},
    vendor_name: {type:String},
    phone: {type:String},
    address: {type:String},
    sales_user_id:{type:String},
    sales_email:{type:String},
    schedule_visit_added_by_email: {type: String},
    date: {type: String},
    time: {type:String}
});
module.exports = mongoose.model('ScheduleVisits', ScheduleVisitsSchema, 'schedule_visits');
