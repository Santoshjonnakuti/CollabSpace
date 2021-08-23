const mongoose = require('mongoose');

const reply = new mongoose.Schema({
    Name : {
        type: String,
        requried: true
    },
    Email :{
        type: String,
        required: true
    },
    UserReply :{
        type: String,
        required: true
    },
    Gender : {
        type: String,
        required: true
    },
    postedOn :{
        type:Date,
        required:true
    },
});

const comment = new mongoose.Schema({
    Name : {
        type: String,
        requried: true
    },
    Email :{
        type: String,
        required: true
    },
    UserComment :{
        type: String,
        required: true
    },
    Gender : {
        type: String,
        required: true
    },
    postedOn :{
        type:Date,
        required:true
    },
    LikedBy: [String],
    Replies: [reply]
});

const post = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Name : {
        type: String,
        required: true
    },
    Gender : {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Likes: {
        type: String,
        required: true
    },
    postedOn: {
        type: Date,
        required: true
    },
    LikedBy : [String],
    Comments : [comment]
});

module.exports = Post = mongoose.model('Post',post);
