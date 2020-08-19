const mongoose = require("mongoose");

const UserDetailsSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    username: { type: String},
    password: { type: String},
    email: { type: String},
    phone: { type: String},
    first_name: { type: String},
    last_name: { type: String},
    usertype_name: {type: String}
});
module.exports = mongoose.model('UserDetails', UserDetailsSchema, 'user_details');
