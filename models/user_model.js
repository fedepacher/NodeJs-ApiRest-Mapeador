const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id:{
        type:Number,
        required: true
    },
    id_job:{
        type:String,
        required:true
    },
    latitude:{
        type:Number,
        required: true
    },
    longitude:{
        type:Number,
        required: true
    },
    state: {
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('User', userSchema);