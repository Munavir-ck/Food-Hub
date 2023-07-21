const express=require("express")
const router=express.Router()
const {adminIsAuth}=require("../middileware/authentication")

const{storeImage}=require('../middileware/multer')
 const{
    adminLogin,
    adminPostLogin,
    adminHome,
    make_admin,
    product_list,
    add_category,
    post_add_foodtype,
    add_product,
    get_edit_prdouct,
    edit_product,
    logoutadmin,
    add_foodtype,

 }=require("../controllers/admincontroller")

router.get("/",adminLogin)
router.get("/adminhome",adminIsAuth,adminHome)
router.post("/adminLogin",adminPostLogin)
router.post("/make_admin/:id",adminIsAuth,make_admin)
router.get("/product_list",adminIsAuth,product_list)
router.post("/add_category",adminIsAuth,add_category)
router.get("/add_foodtype",add_foodtype)
router.post("/add_foodtype",adminIsAuth,post_add_foodtype)
router.post("/add_product",adminIsAuth,storeImage,add_product)
router.get("/get_edit_prdouct/:id",adminIsAuth,get_edit_prdouct)
router.patch('/edit_product',storeImage,adminIsAuth,edit_product)
router.get("/logoutadmin",logoutadmin)
module.exports = router