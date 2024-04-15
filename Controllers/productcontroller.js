const Firm = require("../Models/Firm");
const product=require("../Models/product.js");
const multer=require("multer");
const path=require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename files to avoid name conflicts
    }
  });
  
  const upload = multer({ storage: storage });
  const addproduct=async(req,res)=>{
    try{
    const {productname,price,category,bestseller,description}=req.body;
    const image=req.file?req.file.filename:undefined;
    const firmId=req.params.firmId;
    const firm=await Firm.findById(firmId)
    if(!firm){
        return res.send({
            status:404,
            message:"firm not found"
        })
    }
    const productobj=new product({
        productname,price,category,bestseller,description,image,firm:firm._id 
    })
    const savedproduct=await productobj.save();
    firm.products.push(savedproduct);
    await firm.save();
    return res.send({
        status:200,
        message:"product added",
        data:savedproduct
    })
    }
    catch(err){
     return res.send({
        status:500,
        message:"databse error"
     })
    }
  }
  const getproductbyId=async(req,res)=>{
    try{
    const firmId=req.params.firmId;
    const firm=await Firm.findById(firmId)
    if(!firm){
        return res.send({
            status:404,
            message:"no firm found"
        })
    }
    const restaurentname=firm.firmName;
    const products=await product.find({firm:firmId})
    console.log(products)
    return res.send({
        status:200,
        data:{restaurentname,products}
    })
    }
    catch(err){
  return res.send({
    status:500,
    message:"database error"
  })
    }
  }
  const deleteproductbyId=async(req,res)=>{
    try{
    const productId=req.params.productId;
    const deleteproduct=await product.findByIdAndDelete(productId);
    if(!deleteproduct){
        return res.send({
            status:404,
            message:"product not found"
        })
    }
    }
    catch(err){
       return res.send({
        status:500,
        message:"internal server error"
       })
    }
  }
  module.exports={addproduct:[upload.single("image"),addproduct],getproductbyId,deleteproductbyId}