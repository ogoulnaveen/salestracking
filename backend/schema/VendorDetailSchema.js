const mongoose = require("mongoose");

const VendorDetailSchema = mongoose.Schema({
    vendor_id: { type: String, required: true },
    customer_name: { type: String},
    email: { type: String},
    phone: { type: String},
    first_name: { type: String},
    last_name: { type: String},
    address: { type: String},
});
module.exports = mongoose.model('VendorDetails', VendorDetailSchema, 'vendor_details');
