const mongoose = require("mongoose");

const ProductDetailSchema = mongoose.Schema({
    product_id: { type: String, required: true },
    product_name: { type: String},
    cost: { type: String},
    supplier_name: { type: String},
    category_name: {type: String}
});
module.exports = mongoose.model('ProductDetails', ProductDetailSchema, 'product_details');
