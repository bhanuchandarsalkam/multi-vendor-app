const express=require("express");
const routes=express.Router();
const firmcontroller=require("../Controllers/Firmcontroller");
const verifytoken=require("../Middlewares/verifytoken.js")
routes.post("/add-firm",verifytoken,firmcontroller.addfirm);
routes.get("/uploads/:imagename",(req,res)=>{
    const imagename=req.params.imagename;
    res.headersSent("content-Type","image/jpeg");
    res.sendFile(path.join(__dirname,"..","uploads",imagename))
})
routes.delete("/:firmId",firmcontroller.deletefirmbyId)
module.exports=routes;