const mongoose = require("mongoose");

const CustomersVisitsSchema = mongoose.Schema({
    visit_id: { type: String, required: true, unique:true },
    // customer_id:{type:String},
    // customer_name: { type: String},
    // email: { type: String},
    // phone: { type: String},
    // first_name: { type: String},
    // last_name: { type: String},
    //address: { type: String},
    // visit_added_by_username: {type: String},
    // visit_added_by_name: {type: String},
    /* visit_added_by_email: {type: String}, */
    visits_note: {type: String},
    lat:{type:Number},
    long:{type:Number},
    vendor_id: {type: String},
    user_id: { type: String}

});
module.exports = mongoose.model('CustomerVisits', CustomersVisitsSchema, 'customer_visits');
