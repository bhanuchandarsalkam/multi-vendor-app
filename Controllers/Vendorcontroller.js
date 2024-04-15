const vendor=require("../Models/vendor.js");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
require("dotenv").config();
const vendorregister=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
    const emailexists=await vendor.findOne({email});
    if(emailexists){
        return res.send({
            status:400,
            message:"email already exists"
        })
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const vendorobj=new vendor({
        username,
        email,
        password:hashedpassword
    })
    const vendordb=await vendorobj.save();
    return res.send({
        status:201,
        message:"user registered successfully",
        data:vendordb
    })
    }
    catch(err){
     return res.send({
        status:500,
        message:"database error",
        error:err
     })
    }
}
const vendorlogin=async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.send({
            status:400,
            message:"missing credentials"
        })
    }
    try{
      const vendordb=await vendor.findOne({$or:[{email:email},{username:email}]})
      if(!vendordb||!(await bcrypt.compare(password,vendordb.password))){
       return res.send({
        status:400,
        message:"Invalid username or password"
       })
      }
      const vendorId=vendordb._id;
      console.log(vendorId)
      const token=await jwt.sign({vendorId:vendordb._id},process.env.secret_key,{expiresIn:"1h"})
      console.log(token)
      return res.send({
        status:200,
        message:"login successfully",
        data:vendordb,vendorId,
        token:token
      })
    }
    catch(err){
      return res.send({
        status:500,
        message:"database error",
        error:err
      })
    }
}
const getallvendors=async(req,res)=>{
  try{
  const vendors=await vendor.find().populate("firm");
  return res.send({
    status:200,
    data:vendors
  })
}
catch(err){
return res.send({
  status:500,
  message:"internal server error"
})
}
}
const getvendorbyId=async(req,res)=>{
  const vendorId=req.params.id;
  try{
    const vendors=await vendor.findById(vendorId).populate("firm");
    if(!vendors){
      return res.send({
        status:404,
        message:"vendor not found"
      })
    }
    // const firmId=vendors.firm[0]._id;
    // console.log(firmId)
    return res.send({
      status:200,
      data:vendors
    })
  }
  catch(err){
    console.log(err)
    return res.send({
      status:500,
      message:"database error"
    })
  }
}
module.exports={vendorregister,vendorlogin,getallvendors,getvendorbyId};