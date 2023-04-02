const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var MaterialSchema = new Schema({
    material_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    receipt: {
        type: String,
        required: false
    },
    mop:{
        type: String,
        required: false
    },
    site_id: {
        type: String,
        required: true
    },
    cust_id: {
        type: String,
        required: true,
    },
    work_id: {
        type: String,
        required: true,
    }
},
    {timestamps:true}
);



const Material =mongoose.model('material_details', MaterialSchema);
module.exports = Material