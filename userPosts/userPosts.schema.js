const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserPost = new Schema({
    userId:{type:String},
    content:[{type:String}]//images uploaded by user
},{
    timestamps:true
})

const USERPOST = mongoose.model("userPost", UserPost);

module.exports = USERPOST;