const mongoose = require("mongoose");

const UserActionsSchema = mongoose.Schema({
    action_id: { type: String, required: true, unique: true},
    user_id: { type: String },
   /*  username: { type: String}, */
     email:{type:String},
    action:{ type: String},
});
module.exports = mongoose.model('UserActions', UserActionsSchema, 'user_actions');
