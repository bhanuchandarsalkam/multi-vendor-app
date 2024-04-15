const express=require("express");
const router=express.Router();
const productcontroller=require("../Controllers/productcontroller");
router.post("/add-product/:firmId",productcontroller.addproduct);
router.get("/:firmId/products",productcontroller.getproductbyId);
router.get("/uploads/:imagename",(req,res)=>{
    const imagename=req.params.imagename;
    res.headersSent("content-Type","image/jpeg");
    res.sendFile(path.join(__dirname,"..","uploads",imagename))
})
router.delete("/:productId",productcontroller.deleteproductbyId)
module.exports=router;