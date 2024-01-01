const PublicProf = require("../models/publicProfileModal");
const User = require("../models/userModal");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


exports.createProfile = catchAsyncErrors(async (req , res ,next) => {
    //user logged in
    const data = {
        name : {
            val:req.user.name,
            vis:true
        },
        email :{
            val:req.user.email,
            vis:true
        },
        userName:{
            val:req.user.userName,
            vis:true
        },
        avatar:{
            val:req.user.avatar,
            vis:true
        }
    }
    const pp = await PublicProf.create({data});
    res.status(201).json({
        success: true,
    })
});

exports.updateProfile = catchAsyncErrors(async (req,res,next) =>{
    const data = {
        name : {
            val:req.body.name,
            vis:req.body.nameVis
        },
        email :{
            val:req.body.email,
            vis:req.body.emailVis
        },
        avatar:{
            val:req.body.avatar,
            vis:req.body.avatarVis
        }
    }
    const pp = await PublicProf.findOne({});
    res.status(201).json({
        success: true,
    })
});