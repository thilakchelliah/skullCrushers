var mongoose = require('mongoose'),
    Task = mongoose.model('Task');

exports.AddTask = function (req, res) {
    if (!req.body.Name) {
        res.status(400).send({ message: "Name cannot be Empty" });
    }
    // else {

    //     Task.find({"Name": req.body.Name}, (err, Task) => {
    //         // Handle any possible database errors
    //         if (err) {
    //             res.status(500).send(err);
    //         }
    //         else {
    //             if (Task.length != 0) {
    //                 Task.Description = req.body.Description || Task.Description;
    //                 Task.Status = req.body.Status || Task.Status;
    //                 Task.Priority = req.body.Priority || Task.Priority;
    //                 Task.updatedDate = new Date().toDateString();
    //                 // Save the updated document back to the database
    //                 Task.save((err, Task) => {
    //                     if (err) {
    //                         res.status(500).send(err)
    //                     }
    //                     res.status(200).send(Task);
    //                 });
    //             }
    //             else {
                    var taskData = new Task({
                        Name: req.body.Name,
                        Description: req.body.Description,
                        AllottedTime: req.body.AllottedTime,
                        Status: req.body.Status,
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
    //             }
    //         }
    //     });

    // }
};




exports.GetAllTask = function (req, res) {


    Task
        .find()
        .exec(function (err, Task) {
            if (err) {
                res.send(err);
            }

            else
                res.json(Task);
        });

};
