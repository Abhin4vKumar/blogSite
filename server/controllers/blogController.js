const User = require("../models/userModal");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const Blogs = require("../models/blogModal");

exports.newBlog = catchAsyncErrors(async (req, res, next) => {
    const {name , desc , content} = req.body;
    const usero = await User.findById(req.user._id);
    const data = {
        name , desc , content,
        user:{
            user_id: usero._id,
            userName:usero.userName
        }
    }
    const dat = await Blogs.create(data);
    res.status(201).json({
        success: true,
        blog : dat
    })
});
exports.commentBlog = catchAsyncErrors(async (req, res, next) => {
    const blg = await Blogs.findById(req.params.id);
    if(!blg){
        return next(new ErrorHandler("Blog does not exists" , 404))
    }
    const data = {
        comments:blg.comments,
    }
    const commentObj = {
        content:req.body.content,
        user:{
            user_id:req.user._id,
            userName:req.user.userName
        },
    }
    data.comments.push(commentObj);
    const dat = await Blogs.findByIdAndUpdate(req.params.id , {comments:data.comments} ,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(201).json({
        success: true,
        message:"Comment Added"
    })
});
exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
    const blg = await Blogs.findById(req.params.id);
    if(!blg){
        return next(new ErrorHandler("Blog does not exists" , 404))
    }
    const data = {
        comments:blg.comments,
        commentss:[]
    }
    let flag = 0;
    data.comments.forEach((e)=>{
        if(e._id.toString() == req.params.cid){
            if(e.user.userName == req.user.userName){
                flag = 1;
            }else{
                data.commentss.push(e);
            }
        }else{
            data.commentss.push(e);
        }
    })
    if(flag == 0){
        return next(new ErrorHandler("Comment does not exists or You dont have Access" , 404));
    }
    const dat = await Blogs.findByIdAndUpdate(req.params.id , {comments:data.commentss} ,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(201).json({
        success: true,
        message:"Comment Deleted"
    })
});
exports.getAllBlogs = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 0;
    const blogsCount = await Blogs.countDocuments();
    const apiFeature = new ApiFeatures(Blogs.find(), req.query).search().filter().pagination(resultPerPage)
    const Blogss = await apiFeature.query;
    res.status(200).json({ success: true, blogs: Blogss, blogsCount , resultPerPage})
});
//Need to work on this
exports.getMyBlogs = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 0;
    const UserObj = req.user;
    const Blogss = await Blogs.find({user:{user_id:UserObj._id,userName:UserObj.userName}});
    const blogsCount = Blogss.length;
    res.status(200).json({ success: true, blogs: Blogss, blogsCount , resultPerPage})
});
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
    const blg = await Blogs.findById(req.params.id);
    if(!blg){
        return next(new ErrorHandler("Blog does not exists" , 404))
    }
    const usr = req.user;
    if(blg.user.user_id.toString() != usr._id.toString()){
        return next(new ErrorHandler("You Dont have Access",400));
    }
    const dat = await Blogs.findOneAndDelete(req.params.id);
    return res.status(200).json({
        success: true,
        message: "Blog Deleted"
    })
});
exports.getBlog = catchAsyncErrors(async (req, res, next) => {
    const blg = await Blogs.findById(req.params.id);
    if(!blg){
        return next(new ErrorHandler("Blog does not exists" , 404))
    }
    return res.status(200).json({
        success: true,
        blog:blg
    })
});


exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
    const blg = await Blogs.findById(req.params.id);
    if(!blg){
        return next(new ErrorHandler("Blog does not exists" , 404))
    }
    const {name , desc , content} = req.body;
    const dat = await Blogs.findByIdAndUpdate(req.params.id , {name , desc , content , 
    date:Date.now()},{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(201).json({
        success: true,
        message:"Blog Updated"
    })
});

exports.upVote = catchAsyncErrors(async (req, res, next) => {
    const blg = await Blogs.findById(req.params.id);
    if(!blg){
        return next(new ErrorHandler("Blog does not exists" , 404))
    }
    const data = {
        upVoted:req.user.upVoted,
        upVotedd:[]
    };
    //check if usr already upvoted
    let downVote = 0;
    data.upVoted.forEach((e,i)=>{
        if(e.toString() == blg._id.toString()){
            downVote = 1;
        }else{
            data.upVotedd.push(e);
        }
    });
    if(downVote){
        const dat1 = await Blogs.findByIdAndUpdate(req.params.id , {upVotes:blg.upVotes-1},{
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        const dat2 = await User.findByIdAndUpdate(req.user._id , {upVoted:data.upVotedd},{
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    }else{
        data.upVoted.push(blg._id);
        const dat1 = await Blogs.findByIdAndUpdate(req.params.id , {upVotes:blg.upVotes+1},{
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        const dat2 = await User.findByIdAndUpdate(req.user._id , {upVoted:data.upVoted},{
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    }
    const msg = downVote == 1? "Down Voted": "Up Voted";
    res.status(201).json({
        success: true,
        message:msg
    })
});

