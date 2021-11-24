const Task = require("../models/task.model");
const User = require("../models/user.model");
const { TASK_STATE, ROLE } = require("../routes/constant");
// console.log("task state",JSON.stringify(TASK_STATE))

exports.assignTask = async (req, res) => {
    try {
        const id = req.body.assignBy; //Teacher
        const teacherData = await User.findById(id)
        // res.status(404).send({ message: "Not found with id = " + id });
        // console.log("teacher data", JSON.stringify(teacherData))
        if(teacherData.role===ROLE.TEACHER)
            this.updatetask(req, res);

        else
        {
            res.send({message: "you are not a teacher"});
        }
    }
    catch (error) {

        console.log("not assinged");
        res.status(500)
            .send({ message: "Error retrieving with id = " + id });
    }
};


exports.updatetask = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "data to update can not be empty"
        });
    }

    const id = req.body.assignTo;
    const task_id = req.body.task_id;
    Task.findByIdAndUpdate(task_id, {assignBy: req.body.assignBy,assignTo:req.body.assignTo,state:TASK_STATE.ASSIGNED}, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `cannot update with id = ${task_id}.`
                });
            }
            else 
            {
                res.status(200).json({
                    statusCode: 200,  message: "Task Assinged to the id = " + id});

            // res.send({ message: "Task Assinged to the id = " + id });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updated with id = " + task_id
            });
        });
};


exports.completeTask = async (req, res) => {
    try {
        const id = req.body.assignTo; //Teacher
        const studentData = await User.findById(id)
        // res.status(404).send({ message: "Not found with id = " + id });
        // console.log("student data", JSON.stringify(studentData))
        if(studentData.role===ROLE.STUDENT)
            this.updatedtask(req, res);

        else
        {
            res.send({message: "you are not a student"});
        }
    }
    catch (error) {

        console.log("not assinged");
        res.status(500)
            .send({ message: "Error retrieving with id = " + id });
    }
};


exports.updatedtask = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "data to update can not be empty"
        });
    }

    const id = req.body.assignTo;
    const task_id = req.body.task_id;
    Task.findByIdAndUpdate(task_id, {state:TASK_STATE.COMPLETED}, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `cannot update with id = ${task_id}.`
                });
            }
            else res.status(200).json({
                statusCode: 200,  message: "Task Completed by the id = " + id});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updated with id = " + task_id
            });
        });
};