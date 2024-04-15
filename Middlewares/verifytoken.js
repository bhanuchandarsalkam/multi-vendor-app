const Vendor=require("../Models/vendor.js");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const Verifytoken=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.send({
            status:400,
            message:"token is required"
        })
    }
    try{
       const decoded= await jwt.verify(token,process.env.secret_key);
       const vendor=await Vendor.findById(decoded.vendorId);
       if(!vendor){
        return res.send({
            status:400,
            message:"vendor not found"
        })
       }
       req.vendorId=vendor._id;
       next();
    }
    catch(err){
   return res.send({
    status:500,
    message:"invalid token"
   })
    }
}
module.exports=Verifytoken;