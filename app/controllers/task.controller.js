const Task = require("../models/task.model");
const User = require("../models/user.model");
const { TASK_STATE,ROLE } = require("../routes/constant");
// const AUTH=require("../config/auth");

exports.createTask = async (req, res) => {
    try {
        const id = req.body.createBy; //Teacher
        TASK_STATE
        const teacherData = await User.findById(id)
        // res.status(404).send({ message: "Not found with id = " + id });
        // console.log("teacher data", JSON.stringify(teacherData))
        if(teacherData.role===ROLE.TEACHER)
            this.taskCreate(req, res);

        else
        {
            res.send({message: "you are not a teacher"});
        }
    }
    catch (error) {

        console.log("not created");
        res.status(500).json({
            statusCode: 500,message:"internal error",  message: "Task not created"});
    }
};


exports.taskCreate = (req, res) => {
    // console.log("task Create");
    if (!req.body.taskname) {
        res.status(400).json({
            statusCode: 400,message:"Bad Request",  message: "Task not created"});
        return;
    }
    const task = new Task({
        taskname: req.body.taskname,
        state: TASK_STATE.NOT_ASSIGNED,
        assignTo: req.body.assignTo,
        assignBy: req.body.assignBy,
        assignDate: new Date(),
        // completed:req.body.completed
        // email: req.body.email,
        // isAdmin: req.body.isAdmin
    });

    // Save task in the database
    task.save(task)
        .then(data => {
            const id = req.body.createBy;
            res.status(200).json({
                statusCode: 200,message:"successful",  message: "Task created by the id = " + id});
            // res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the task"
            });
        });
};
exports.findAll = (req, res) => {
    const taskname = req.query.taskname;
    var condition = taskname ? { taskname: { $regex: new RegExp(taskname), $options: "i" } } : {};
    Task.find(condition).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occur while retrieving"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.body.task_id;
    Task.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found with id" + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({ message: "Error retrieving with id = " + id });
        });
};

exports.updateTask = async (req, res) => {
    try {
        const id = req.body.updateBy; //Teacher
        TASK_STATE
        const teacherData = await User.findById(id)
        // res.status(404).send({ message: "Not found with id = " + id });
        // console.log("teacher data", JSON.stringify(teacherData))
        if(teacherData.role===ROLE.TEACHER)
            this.update(req, res);

        else
        {
            res.send({message: "you are not a teacher"});
        }
    }
    catch (error) {

        console.log("not created");
        res.status(500).json({
            statusCode: 500,message:"internal error",  message: "Task not created"});
    }
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "data to update can not be empty"
        });
    }

    const id = req.body.task_id;
    Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `cannot update with id = ${id}.`
                });
            }
            else res.send({ message: "Updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updated with id = " + id
            });
        });
};

exports.deleteTask = async (req, res) => {
    try {
        const id = req.body.deleteBy; //Teacher
        TASK_STATE
        const teacherData = await User.findById(id)
        // res.status(404).send({ message: "Not found with id = " + id });
        // console.log("teacher data", JSON.stringify(teacherData))
        if(teacherData.role===ROLE.TEACHER)
            this.delete(req, res);

        else
        {
            res.send({message: "you are not a teacher"});
        }
    }
    catch (error) {

        console.log("not created");
        res.status(500).json({
            statusCode: 500,message:"internal error",  message: "Task not created"});
    }
};


exports.delete = (req, res) => {
    const id = req.body.task_id;

    Task.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).json({
                    statusCode: 404,message:"Not Found",  message: "This task does not exist"});
            }
            else {
                res.status(200).json({
                    statusCode: 200,message:"successful",  message: "Task Deleted"});
            }
        })
        .catch(err => {
            res.status(500).json({
                statusCode: 500,message:"internl error",  message: "some error occur while deleting the task"});
        });
};