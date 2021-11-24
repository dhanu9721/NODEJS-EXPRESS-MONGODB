const User = require("../models/user.model");
const AUTH=require("../config/auth");


exports.signup = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const user = new User({
        password: req.body.password,
        username: req.body.username,
        role: req.body.role,
        email: req.body.email,
        // isAdmin: req.body.isAdmin
    });

    // Save USER in the database
    user.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user"
            });
        });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email,password });
        if (user == null)
            return res.status(400).json({ err: "User with email doesnot exists.Please signup" });


    
        if (user) {
            const accesToken = AUTH.generateNewToken({ username: user.username, email: user.email}, "secretkey");
            res.status(200).json({
                statusCode: 200, message: "Login successfully", data: {
    
                    accesToken
                }
            });
            return
        }
        else {
            res.status(400).json("username or password is incorrect");
        }

    }
    catch (error) {
        return res.status(500).json({ err: error.message });
    }
}