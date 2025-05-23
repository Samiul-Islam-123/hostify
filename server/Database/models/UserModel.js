const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true // Ensures username is provided
    },
    email: { 
        type: String,
        required: true, // Ensures email is provided
        unique: true    // Ensures email is unique across documents
    },
    isVerified: { 
        type: Boolean,
        default: false // Defaults to false if not provided
    },
    lastUpdate: { 
        type: Date,
        default: Date.now // Correctly sets default to current date on creation
    },
    projects : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'projects'
        }
    ],
    avatarURL: String
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// If you specifically want 'lastUpdate' instead of 'updatedAt', modify the timestamps:
// { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdate' } }

const UserModel = mongoose.model('users', UserSchema); // Model name singular and capitalized
module.exports = UserModel;