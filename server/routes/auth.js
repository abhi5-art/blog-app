const express=require('express');
const router=express.Router();
const AllController = require('../controllers');
const {signupValidator, signinValidator, emailValidator, verifyemailValidator, recoverPasswordValidator, changePasswordValidator, updateProfileValidator} = require('../validators/auth');
const Validate = require('../validators/validate');
const isAuth = require('../middlewares/isAuth');

router.post("/signup",
    signupValidator,
    Validate,
    AllController.authController.signup);

router.post("/signin",
    signinValidator,
    Validate,
    AllController.authController.signin);

router.post("/send-verification-email", 
    emailValidator,
    Validate,
    AllController.authController.verifycode);

router.post("/verifyEmail",
    verifyemailValidator,
    Validate,
    AllController.authController.verifyUser);

router.post(
    "/forgot-password-code",
    emailValidator,
    Validate,
    AllController.authController.forgotPasswordCode);

router.post(
        "/recover-password",
        recoverPasswordValidator,
        Validate,
        AllController.authController.recoverPassword);

router.put(
     "/change-password",
      isAuth,
      changePasswordValidator,
      Validate,
      AllController.authController.changePassword);

router.put(
        "/update-profile",
        isAuth,
        updateProfileValidator,
        Validate,
        AllController.authController.updateProfile);

router.get("/current-user", isAuth, AllController.authController.currentUser);

module.exports=router;