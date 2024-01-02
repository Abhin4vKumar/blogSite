const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    bgImage:{
        status:{
            type:Boolean,
            required:true,
            default:false,
        },
        imgLink:{
            type:String,
        }
    },
    user: {
        user_id:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required:true
        },
        userName:{
            type:String,
            required:true,
        }
    },
    upVotes:{
        type:Number,
        default:0,
        required:true,
    },
    comments:[
        {
            content:{
                type:String,
                required:true
            },
            user: {
                user_id:{
                    type: mongoose.Schema.ObjectId,
                    ref: "User",
                    required:true
                },
                userName:{
                    type:String,
                    required:true,
                }
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    active:{
        type:Boolean,
        default: true,
        required:true
    }
});

module.exports = mongoose.model("Blogs", blogSchema);