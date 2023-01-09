const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    Name:{type:String},
    userId:{type:String},
    email:{type:String},
    followers:[{type:String}],//storing userIds
    feed:[{type:String}]//like news feed ..will contain  content of friends

},{
    timestamps:true
})

const USER = mongoose.model("user", UserSchema);

module.exports = USER;