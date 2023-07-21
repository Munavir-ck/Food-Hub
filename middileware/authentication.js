const adminIsAuth=(req,res,next)=>{
    if(req.session.isAuth){
     next()
    }
    else{
     res.redirect("/admin")
    }
 }


 const userIsAuth=(req,res,next)=>{
    if(req.session.isAuth){
     next()
    }
    else{
     res.redirect("/")
    }
 }

 module.exports = { adminIsAuth, userIsAuth };