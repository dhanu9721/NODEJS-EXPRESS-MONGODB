const mongoose = require('mongoose');
    const taskschema = mongoose.Schema({
        taskname:String,
        state:String,
        assignTo: String,
        assignBy: String,
        assignDate : {type : Date},
        // completed:{type:Boolean, default: false},
        // owner:{type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}
    },
    
    {
        timestamps: true
    }
    );

    module.exports = mongoose.model('tasks', taskschema);