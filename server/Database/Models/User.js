const mongoose = require('mongoose');

const user = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Joined: {
        type: String,
        required: true
    },
    Posts: {
        type: String,
        required: true
    },
    Likes: {
        type: String,
        required: true
    },
    Profile : {
        type: String,
        default : "None"
    },
    tokens : [{
        token: {
            type: String,
            required: true
        }
    }]
});

module.exports = User = mongoose.model('User',user);
