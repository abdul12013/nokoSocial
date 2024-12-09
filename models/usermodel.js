
const { required } = require("joi")
const mongoose=require("mongoose")



const userSchema=mongoose.Schema({
    username:{
        type: String,
        trim:true,
        required:true
    },
    email:{
        type: String,
        trim:true,
        required:true
    },
    password:{
        type: String,
        trim:true,
        required:true
    },
    image:{
        type:String,
        required:false,
     },

     acType:{
        type:String,
        required:true
     },

     post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
     }],
     bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }],

     friend:[{
       type: mongoose.Schema.Types.ObjectId,
    ref: "usermodel"
     }]
},
{timestamps:true}
)

module.exports=mongoose.model("usermodel",userSchema)