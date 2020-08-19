const mongoose = require("mongoose");

const UserTypeSchema = mongoose.Schema({
    usertype_id: { type: String, required: true },
   usertype_name: { type: String},
    
});
module.exports = mongoose.model('UserTypes',  UserTypeSchema, 'user_types');
