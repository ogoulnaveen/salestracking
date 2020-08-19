const mongoose = require("mongoose");

const CategoryDetailSchema = mongoose.Schema({
    category_id: { type: String, required: true },
   category_name: { type: String},
    
});
module.exports = mongoose.model('CategoryDetails', CategoryDetailSchema, 'category_details');
