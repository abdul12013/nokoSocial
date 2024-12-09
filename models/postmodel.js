
const mongoose=require("mongoose")


let postSchema=mongoose.Schema({
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usermodel"
    }],
    
    des:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:true
    },
   
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usermodel"
    }],
    isadmin:{
        type:Boolean,
        default:false
    }

    
})

module.exports=mongoose.model("post",postSchema)