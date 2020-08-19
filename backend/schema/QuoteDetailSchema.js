const mongoose = require("mongoose");

const QuoteDetailSchema = mongoose.Schema({
    quote_id: { type: String, required: true },
    slno: { type: String},
    vendor_id:{type: String},
   /*  customer_name: { type: String}, */
   /*  mobile: { type: String}, */
    quotation_date : { type: String},
  /*   productDetails: { type : Array , "default" : [] }, */
    total_cost  : { type: Number},
    product_name :{ type : Array , "default" : [] },

});
module.exports = mongoose.model('QuoteDetails', QuoteDetailSchema, 'quote_details');
