const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique : true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    nick_name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: false
    },
    email_id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: false,
        unique:false
    },
    user_avatar:{
        type: String,
        required: false
    },
    status:{
        type:Boolean,
        required:false,
        default: false

    }
},
    {timestamps:true}
);

UserSchema.methods.comparePassword = function (pass) {
    return bcrypt.compareSync(pass, this.password);
};

const User =mongoose.model('user_details', UserSchema);
module.exports = User