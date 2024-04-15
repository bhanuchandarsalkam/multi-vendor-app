const Vendor=require("../Models/vendor");
const Firm=require("../Models/Firm");
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
const addfirm=async(req,res)=>{
  try{
    const {firmName,area,category,region,offer}=req.body;
    const image=req.file?req.file.filename:undefined;
    const vendor=await Vendor.findById(req.vendorId)
    if(!vendor){
      return res.send({
        status:404,
        message:"vendor not found"
      })
    }
    if(vendor.firm.length>0){
      return res.send({
        status:400,
        message:"vendor have only one firm"
      })
    }
    const firm=new Firm({firmName,area,category,region,offer,image,vendor:vendor._id})
    const firmsave=await firm.save();
    const firmId=firmsave._id;
    vendor.firm.push(firmsave);
    await vendor.save();
    return res.send({
      status:200,
      message:"firm added successfully",
      data:firmId
    })
  }
  catch(err){
    return res.send({
      status:500,
      message:"internal server error"
    })
  }
}
const deletefirmbyId=async(req,res)=>{
  try{
  const firmId=req.params.firmId;
  const deleteproduct=await product.findByIdAndDelete(firmId);
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
module.exports={addfirm:[upload.single("image"),addfirm],deletefirmbyId}