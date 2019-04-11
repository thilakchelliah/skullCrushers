var mongoose = require('mongoose'),
    Task = mongoose.model('Task');

exports.AddTask = function (req, res) {
    if (!req.body.Name) {
        res.status(400).send({ message: "Name cannot be Empty" });
    }
    else {
        var taskData = new Task({
            Name: req.body.Name,
            Description: req.body.Description,
            AllottedTime: req.body.AllottedTime,
            createdDate: new Date().toDateString(),
            updatedDate: new Date().toDateString()
        });

        taskData.save(function (err, data) {
            console.log(data);
            if (err) {
                console.log(err);
                res.status(500).send({ message: "Some error occurred while creating the Task." });
            }
            else {
                res.send(data);
            }
        });
    }
};




exports.GetAllTask = function(req, res) {


    Task
        .find()
        .exec(function(err, Task) {
            if (err) {
                res.send(err);
            }

            else
                res.json(Task);
        });

};
