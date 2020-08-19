const mongoose = require("mongoose");

const ExpenseDetailSchema = mongoose.Schema({
    expense_id: { type: String, required: true },
    date: { type: String },
    expense_item: { type: String },
    amount: { type: String },
    expense_added_by_email: { type: String },


});
module.exports = mongoose.model('ExpenseDetails', ExpenseDetailSchema, 'expense_details');
