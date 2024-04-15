const Vendorcontroller=require("../Controllers/Vendorcontroller");
const express=require("express");
const router=express.Router();
router.post("/register",Vendorcontroller.vendorregister);
router.post("/login",Vendorcontroller.vendorlogin);
router.get("/all-vendors",Vendorcontroller.getallvendors);
router.get("/single-vendor/:id",Vendorcontroller.getvendorbyId);
module.exports=router;