const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var LabourSchema = new Schema({
    labour_id: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    from_date: {
        type: String,
        required: false
    },
    to_date: {
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
    },
    price:{
        type:String,
        required: false
    },
    mop:{
        type:String,
        required: false
    }
},
    {timestamps:true}
);



const Labour =mongoose.model('labour_details', LabourSchema);
module.exports = Labour