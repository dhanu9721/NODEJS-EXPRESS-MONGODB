const express = require("express");
const cors = require("cors");
// const jwt = require('jsonwebtoken');
const app = express();
const userRoute=require("./app/routes/user.route");
const taskRoute=require("./app/routes/task.route");
const taskAssignRoute=require("./app/routes/taskAssign.route");
var corsOptions = {
    origin:"http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require("./app/models");
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log("Connected to the database");
})

.catch(err => {
    console.log("cannot connect",err);
    process.exit();
});
require("./app/routes/tutorial.routes")(app);
app.use("/app/routes/user",userRoute);
app.use("/app/routes/task",taskRoute);
app.use("/app/routes/task",taskAssignRoute);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});