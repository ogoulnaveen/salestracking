const mongoose = require("mongoose");

const ExpenseItemSchema = mongoose.Schema({
    item_id: { type: String, required: true },
    expense_item: { type: String},
    
});
module.exports = mongoose.model('ExpenseitemDetails', ExpenseItemSchema, 'expenseitem_details');
