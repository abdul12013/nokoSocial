require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwtTocken = require("../Handler/token");
const joi = require("joi");
const cloudinary = require("../Handler/cloud");
const islogging = require("../middlewere/user_isloggin");
const upload = require("../middlewere/fileupload");
const path=require("path")



// router.use(express.urlencoded({ extended: true }));
// router.use(express.json());
// router.use(express.static(path.join(__dirname, "public")));



//importing database model
const usersModel = require("../models/usermodel");
const postModel=require("../models/postmodel")




router.get("/sign-page",(req,res)=>{
    res.render("register")

})

router.get("/main", islogging, async(req,res)=>{
    user=await usersModel.findOne({email:req.user.email})
    post=await postModel.find().populate("user")
    postu=[]
    // post.forEach(e=> {
    
    //     e.user.forEach(e=>{
    //         postu.push(e)
    //     })
    //     console.log(postu)
   
    //     // postu.forEach(e=>{
    //     //     console.log(`post data ${e}`)
    //     // })

      res.render("allpost", {user:user,post:post})
    
})

router.get("/friend/:id",islogging, async(req,res)=>{

    const user=await usersModel.findOne({_id:req.user.userid})
    if(user.friend.indexOf(req.params.id)===-1) //no id in likes array
   {
    user.friend.push(req.params.id)
   }
   else{
    user.friend.splice(user.friend.indexOf(req.params.id),1)}
await user.save()
  res.redirect("/main")
})



let pro;

router.get('/profile/:id',islogging, async(req,res)=>{
    admin= await usersModel.findOne({_id:req.user.userid})
     pro= req.params.id
    
    user=await usersModel.findOne({_id:req.params.id}).populate([
       { path: "friend"},
        {path: "post"},
    ])
    
        
      res.render("profile", {user:user,admin:admin})
    
    })

router.get("/friend1/:id",islogging, async(req,res)=>{
    
    const user=await usersModel.findOne({_id:req.user.userid})
    if(user.friend.indexOf(req.params.id)===-1) //no id in likes array
   {
    user.friend.push(req.params.id)


   }
   else{
    user.friend.splice(user.friend.indexOf(req.params.id),1)}
await user.save()
res.redirect(`/profile/${pro}`)
})

router.get("/friend2/:id",islogging, async(req,res)=>{
    
    const user=await usersModel.findOne({_id:req.user.userid})
    if(user.friend.indexOf(req.params.id)===-1) //no id in likes array
   {
    user.friend.push(req.params.id)


   }
   else{
    user.friend.splice(user.friend.indexOf(req.params.id),1)}
await user.save()
res.redirect(`/book`)
})


router.get("/friend3/:id",islogging, async(req,res)=>{
    
    const user=await usersModel.findOne({_id:req.user.userid})
    if(user.friend.indexOf(req.params.id)===-1) //no id in likes array
   {
    user.friend.push(req.params.id)


   }
   else{
    user.friend.splice(user.friend.indexOf(req.params.id),1)}
await user.save()
res.redirect(`/admin`)
})



router.post("/names", islogging, async(req,res)=>{
    console.log(req.body.username)
   user=await usersModel.findOne({username:req.body.username}).populate("post") 

   if(user){
    res.status(200).json({success:true,data:user})
   }
   else{
    res.status(200).json({success:false,data:"no match found"})
   }


})


//likes
router.get("/like/:id", islogging,async(req,res)=>{
    
    let post= await postModel.findOne({_id:req.params.id})
    console.log(post)
    console.log(post.likes.indexOf(req.user.userid))
    // res.json(post)

    if(post.likes.indexOf(req.user.userid)===-1) //no id in likes array
   {
    post.likes.push(req.user.userid)
     
    
   }
   else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1)
    console.log("no")
    
    
   }
await post.save()
  res.redirect("/main")

})

router.get("/like1/:id", islogging,async(req,res)=>{
    
    let post= await postModel.findOne({_id:req.params.id})
    console.log(post)
    console.log(post.likes.indexOf(req.user.userid))
    // res.json(post)

    if(post.likes.indexOf(req.user.userid)===-1) //no id in likes array
   {
    post.likes.push(req.user.userid)
     
    
   }
   else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1)
    // console.log("no")
    
    
   }
await post.save()
  res.redirect(`/profile/${pro}`)

})


router.get("/like2/:id", islogging,async(req,res)=>{
    
    let post= await postModel.findOne({_id:req.params.id})
    console.log(post)
    console.log(post.likes.indexOf(req.user.userid))
    // res.json(post)

    if(post.likes.indexOf(req.user.userid)===-1) //no id in likes array
   {
    post.likes.push(req.user.userid)
     
    
   }
   else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1)
    // console.log("no")
    
    
   }
await post.save()
  res.redirect(`/book`)

})

router.get("/like3/:id", islogging,async(req,res)=>{
    
    let post= await postModel.findOne({_id:req.params.id})
    console.log(post)
    console.log(post.likes.indexOf(req.user.userid))
    // res.json(post)

    if(post.likes.indexOf(req.user.userid)===-1) //no id in likes array
   {
    post.likes.push(req.user.userid)
     
    
   }
   else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1)
    // console.log("no")
    
    
   }
await post.save()
  res.redirect(`/admin`)

})




router.get("/save/:id",islogging, async(req,res)=>{
    const user=await usersModel.findOne({_id:req.user.userid})
    // console.log(req.params.id)

    
    if(user.bookmarks.indexOf(req.params.id)===-1) //no id in likes array
   {
    user.bookmarks.push(req.params.id)
     
    
   }
   else{
    user.bookmarks.splice(user.bookmarks.indexOf(req.params.id),1)
    // console.log("no")
    
    
   }
await user.save()
  res.redirect("/main")

})

router.get("/save1/:id",islogging, async(req,res)=>{
    const user=await usersModel.findOne({_id:req.user.userid})
    // console.log(req.params.id)

    
    if(user.bookmarks.indexOf(req.params.id)===-1) //no id in likes array
   {
    user.bookmarks.push(req.params.id)
     
    
   }
   else{
    user.bookmarks.splice(user.bookmarks.indexOf(req.params.id),1)
    // console.log("no")
    
    
   }
await user.save()
res.redirect(`/profile/${pro}`)

})


router.get("/save2/:id",islogging, async(req,res)=>{
    const user=await usersModel.findOne({_id:req.user.userid})
    // console.log(req.params.id)

    
    if(user.bookmarks.indexOf(req.params.id)===-1) //no id in likes array
   {
    user.bookmarks.push(req.params.id)
     
    
   }
   else{
    user.bookmarks.splice(user.bookmarks.indexOf(req.params.id),1)
    // console.log("no")
    
    
   }
await user.save()
res.redirect(`/book`)

})








router.get('/book', islogging, async(req,res)=>{
    
    const admin= await usersModel.findOne({_id:req.user.userid}).populate("bookmarks").populate({
        path: 'bookmarks',
        populate: {
            path: 'user', // This tells Mongoose to populate the `user` field inside `bookmarks`
            model: 'usermodel' // Specifies the model to use for population
        }
    });
  
    res.render('book',{admin:admin})
})


router.get('/admin', islogging, async(req,res)=>{
    const admin= await usersModel.findOne({_id:req.user.userid}).populate([
        { path: 'post' },
        { path: 'friend' }
    ])
    console.log
    res.render('admin',{admin:admin, user:admin})


    
})


router.get('/create-page',  islogging,async(req,res)=>{
    res.render('create')
})

router.get('/logout', islogging,async(req,res)=>{
    res.clearCookie("token")
    res.redirect("/")
})


router.get('/del/:id', islogging, async(req,res)=>{
    const post= await postModel.findOneAndDelete({_id:req.params.id})
    res.redirect('/admin')
})




//Registor 
router.post("/Registor", upload.single("file"), async (req, res) => {
  
try{
    if(!req.file){
        res.json("please enter the file ")
    }
    else{
    const schema = joi.object({
        username: joi.string().required().min(4),
        email: joi.string().email().required(),
        password: joi.string().required().min(3).max(7),
        image:joi.string().required(),
        acType:joi.string().required()

    })

    const picon = req.file.path;
    cloudinary.uploader.upload(picon, async (err, result) => {
        if (err) {
            return res.json({
                error: true,
                message: err.message,
                status: 500
            })
        }
        else {
            let value = {
                username:req.body.username,
                email: req.body.email,
                password:req.body.password,
                image:result.secure_url,
                acType:req.body.acType
            }
           
            console.log(value)
    const results = schema.validate(value)
    
    if (results.error) {
        res.status(505).send(results.error.details[0].message)
    }
    else {

        const user = await usersModel.findOne({ email: results.value.email })




        if (user) {
            res.send("this user is already exits")
        }
        else {

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(results.value.password, salt, async (err, hash) => {
                    try {
                        const createdUser = await usersModel.create({
                            username: results.value.username,
                            email: results.value.email,
                            password: hash,
                            image:results.value.image,
                            acType:results.value.acType
                        })



                      res.redirect("/")

                    }
                    catch (err) {
                        res.send(err.message)
                    }
                })
            })

        }


    }}})}
}
    catch(err){
        res.json(err.message)
    }
}
)


//login

router.post("/login", async (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    try{
    let { email, password } = req.body
    const user = await usersModel.findOne({ email: email })
    if (!user) { return res.status(500).json({success:false,msg:"user not found "}) }

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwtTocken(user)
            res.cookie("token", token)
          
            return res.status(200).json({ success: true, msg: "Login successful" });
        }
        else {
            return res.status(200).json({ success: false, msg: "wrong password" });
        }
    })
   
}
    catch(err){
        return res.status(200).json({ success: false, msg: err.message });
    }
})


router.post('/createPost',islogging, upload.single("file"),async (req,res)=>{

    if(!req.file){
        return res.json({
            error:true,
            msg:'please enter the file '
        })
    }
    const picon = req.file.path;
    cloudinary.uploader.upload(picon, async (err, result) => {
        if (err) {
            return res.json({
                error: true,
                message: err.message,
                status: 500
            })
        }
        else {
       const des=req.body.dec
      
       const user= await usersModel.findOne({email:req.user.email})
       
       const post=await postModel.create({
        des,
        image:result.secure_url,
        user:user._id,
       })
       user.post.push(post._id)
       await user.save()
       res.redirect('/admin')
        }

    })
})
















module.exports = router





