const mongoose=require("mongoose");
const schema=mongoose.Schema;
const vendorschema=new schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firm:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"firm"
    }]
})
module.exports=mongoose.model("user",vendorschema);