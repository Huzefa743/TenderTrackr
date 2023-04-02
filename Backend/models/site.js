const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var SiteSchema = new Schema({
    site_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false
    },
    cust_id: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    work:{
        type:Array,
        require:false
    }
},
    {timestamps:true}
);



const Site =mongoose.model('site_details', SiteSchema);
module.exports = Site