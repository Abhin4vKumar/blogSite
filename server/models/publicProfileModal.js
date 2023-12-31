const mongoose = require("mongoose");


const publicProfileSchema = new mongoose.Schema({
    userName:{
        val:{
            type:String,
        },
        vis:{
            type:Boolean,
        }
    },
    name: {
        val:{
            type:String,
        },
        vis:{
            type:Boolean,
        }
    },
    email: {
        val:{
            type:String,
        },
        vis:{
            type:Boolean,
        }
    },
    avatar:{
        val: {
            status: {
                type: Boolean,
            },
            pic_id: {
                type: String,
            }
        },
        vis:{
            type:Boolean
        }
    }
});


module.exports = mongoose.model("PublicProfile", userSchema);
