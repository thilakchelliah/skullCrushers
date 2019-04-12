var mongoose = require('mongoose');
var TaskSchema = new mongoose.Schema({
    Name: {
        type: String       
    },
    Description: {
        type: String
    },
    AllottedTime: {
        type: String
    },
    Status: {
        type: String
    },
    AssignedBy: {
        type: String
    },
    AssignedTo: {
        type: String
    },
    createdDate:{
         type: Date,
         required: true,
    },
    updatedDate:{
         type: Date,
         required: true,
    }
});
var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
