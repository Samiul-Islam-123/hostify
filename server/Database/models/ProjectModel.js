const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    description: { 
        type: String,
        required: true, 
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    status: { 
        type: String,
    },
    lastUpdate: { 
        type: Date,
        default: Date.now // Correctly sets default to current date on creation
    },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps


const ProjectModel = mongoose.model('projects', ProjectSchema); // Model name singular and capitalized
module.exports = ProjectModel;