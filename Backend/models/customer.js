const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var CustomerSchema = new Schema({
    cust_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    mobile: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    gst: {
        type: String,
        required: false,
    },
    sites:{
        type: Array,
        required: false
    },
    work:{
        type: Array,
        required: false
    },
    material:{
        type: Array,
        required: false
    },
    labour:{
        type: Array,
        required: false
    }
},
    {timestamps:true}
);



const Customer =mongoose.model('customer_details', CustomerSchema);
module.exports = Customer