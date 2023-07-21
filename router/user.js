const { Router } = require("express")
const express=require("express")
const router=express.Router()
const {login,
    postSignup,
    signup,
    home,
    postLogin,
    profile,
    edit_profile,



    userLogout
} = require("../controllers/userController")


router.get("/",login)
router.get("/signup",signup)
router.get("/home",home)
router.post("/postHome",postSignup)
router.post("/home",postLogin)
router.get("/logout",userLogout)
router.get("/profile",profile)
router.patch('/edit_profile',edit_profile)


module.exports=router