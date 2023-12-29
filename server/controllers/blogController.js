const Certificate = require("../models/blogModal");

const User = require("../models/userModal");
const Organisation = require("../models/organisationModal");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const Blogs = require("../models/blogModal");

exports.newBlog = catchAsyncErrors(async (req, res, next) => {
    
    res.status(201).json({
        success: true,
        request
    })
});

exports.getAllBlogs = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 0;
    const blogsCount = await Blogs.countDocuments();
    const apiFeature = new ApiFeatures(Blogs.find(), req.query).search().filter().pagination(resultPerPage)
    const Blogss = await apiFeature.query;
    res.status(200).json({ success: true, Blogss, blogsCount , resultPerPage})
});
//Need to work on this
exports.getMyBlogs = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 0;
    const certificatesCount = await Certificate.countDocuments();
    const apiFeature = new ApiFeatures(Certificate.find(), req.query).search().filter().pagination(resultPerPage)
    const certificates = await apiFeature.query;
    res.status(200).json({ success: true, certificates, certificatesCount , resultPerPage})
});
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
    const currOrg = await Organisation.findById(req.user._id);
    const certificate = await Certificate.findById(req.body.certId);
    if (!certificate) {
        return next(new ErrorHandler({ message: "Certificate not Found", statusCode: 404 }))
    };
    if (!currOrg){
        return next(new ErrorHandler({message: "Organisation not Found" , statusCode:404}))
    }
    if(currOrg._id.toString != certificate.organisation.org_id.toString){
        return next(new ErrorHandler({ message: "Access Denied!", statusCode: 403 }))
    };
    const certificate_ = await Certificate.findByIdAndUpdate(req.body.certId, {active:false}, {
        new:true,
        runValidators: true,
        useFindAndModify: false,
    });
    return res.status(200).json({
        success: true,
        message: "Certificate Revoked"
    })
});
exports.getBlog = catchAsyncErrors(async (req, res, next) => {
    const shareToOrg = await Organisation.findById(req.body.orgId);
    const certificate = await Certificate.findById(req.body.certId);
    
    if (!certificate) {
        return next(new ErrorHandler({ message: "Certificate not Found", statusCode: 404 }))
    };
    if (!shareToOrg){
        return next(new ErrorHandler({message: "Organisation not Found" , statusCode:404}))
    }
    let indexX=0
    let found=false;
    let alreadyHadAccess=false;
    certificate.accessTo.forEach((element,index) => {
        if(element.organisation.acc_no == shareToOrg.acc_no){
            if(element.active){
                alreadyHadAccess=true;
            }
            found=true;
            indexX=index;
        }
    });
    if(alreadyHadAccess){
        return res.status(200).json({
            success: true,
            message: "Access Shared"
        })
    }
    let newAccessObj = {
        accessTo:certificate.accessTo
    }
    let accessObj = {
        organisation:{
            name:shareToOrg.name,
            org_id:shareToOrg._id,
            acc_no:shareToOrg.acc_no
        },
        active:true,
    }
    if(!found){
        newAccessObj.accessTo.push(accessObj);
    }else{
        newAccessObj.accessTo[indexX].active = true;
    }
    const certificate_ = await Certificate.findByIdAndUpdate(req.body.certId, newAccessObj, {
        new:true,
        runValidators: true,
        useFindAndModify: false,
    });
    console.log(certificate_);
    return res.status(200).json({
        success: true,
        message: "Access Shared"
    })
});


exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
    console.log("im here69");
    console.log(req.body.ipfsLink);
    const user = await User.findOne({acc_no:req.body.userId});
    console.log(user);
    const org = await Organisation.findById(req.user.workOrganisation);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.body.userId}`));
    }
    if (!org) {
        return next(new ErrorHandler(`Organisation does not exist with Id: ${req.params.id}`));
    }

    const userObj = {
        user_id:user._id,
        acc_no:user.acc_no
    }
    const organisationObj = {
        name:org.name,
        org_id:org._id,
        acc_no:org.acc_no
    }
    req.body.user = userObj;
    req.body.organisation = organisationObj;
    const request = await Certificate.create(req.body);

    
    res.status(201).json({
        success: true,
        request
    })
});