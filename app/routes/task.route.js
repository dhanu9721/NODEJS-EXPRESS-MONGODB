const express = require('express');
const router = express.Router();
const taskController=require("../controllers/task.controller");
// const taskAssign = require("../controllers/taskAssign.controller")
const auth = require('../config/auth')

    router.post("/create",auth.verifyToken,taskController.createTask);
    router.get("/find", auth.verifyToken,taskController.findAll);
    router.get("/find",auth.verifyToken, taskController.findOne);
    router.put("/update", auth.verifyToken,taskController.updateTask);
    router.delete("/delete",auth.verifyToken, taskController.deleteTask);
    // router.delete("/task",auth.verifyToken, taskController.deleteAll);

module.exports = router;