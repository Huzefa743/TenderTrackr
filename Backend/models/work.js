const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var WorkSchema = new Schema({
    work_id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    work_type: {
        type: String,
        required: true
    },
    estimate_days: {
        type: Number,
        required: false
    },
    status:{
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
    }
},
    {timestamps:true}
);



const Work =mongoose.model('work_details', WorkSchema);
module.exports = Work