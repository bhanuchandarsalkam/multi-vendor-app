const mongoose=require("mongoose");
const schema=mongoose.Schema;
const productschema=new schema({
    productname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:['veg','non-veg']
        }]
    },
    image:{
        type:String
    },
    bestseller:{
        type:Boolean
    },
    description:{
        type:String
    },
    firm:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"firm"
    }]
})
module.exports=mongoose.model("product",productschema);