const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModal");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, acc_no , email, password , phoneNumber} = req.body;

    const user = await User.create({
        name, acc_no ,email, password,phoneNumber, avatar: {
            url: "profilepicUrl"
        }
    });

    sendToken(user, 201, res);

});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    console.log("IM HERE");
    const { email, password } = req.body;

    //checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);

});

exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not Found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try {

        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email is sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return (next(new ErrorHandler(error.message, 500)));
    }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is Invalid or Expired", 400));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords Doesn't Match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    })
})

exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400));
    }

    if (req.body.newPassword != req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords Doesn't Match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber:req.body.phoneNumber,
        avatar:{url:req.body.profilePicUrl}
    }
    //we will add cloudinary later
    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    });
});
