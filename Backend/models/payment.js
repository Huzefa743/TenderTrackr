const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var PaymentSchema = new Schema({
    payment_id: {
        type: String,
        required: true,
    },
    cust_id: {
        type: String,
        required: true,
    },
    site_id: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: false
    },
    action: {
        type: String,
        required: false,
        default:"Credit"
    },
    remark: {
        type: String,
        required: false,
    },
    mop: {
        type: String,
        required: false
    },
    labour_id: {
        type: String,
        required: false
    },
    material_id: {
        type: String,
        required: false
    },
    customer_name: {
        type: String,
        required: false
    },
    dealer_name: {
        type: String,
        required: false
    },
    site_name: {
        type: String,
        required: false
    },
    work_type: {
        type: String,
        required: false
    }

},
    {timestamps:true}
);



const Payment =mongoose.model('payment_details', PaymentSchema);
module.exports = Payment