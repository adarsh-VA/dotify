const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mon.model('users',userschema);