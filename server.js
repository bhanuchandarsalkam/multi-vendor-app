const express=require("express");
const mongoose=require("mongoose");
const vendorrouter=require("./Routes/Vendorroutes")
const firmrouter=require("./Routes/firmroutes")
const bodyparser=require("body-parser");
const productrouter=require("./Routes/productroutes")
const path=require("path")
const cors=require("cors")
require("dotenv").config()
const app=express();
const PORT=4000;
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected successfully")
}).catch((err)=>{
    console.log(err)
})
app.use(bodyparser.json())
app.use(cors());
app.use("/vendor",vendorrouter);
app.use("/firm",firmrouter);
app.use("/product",productrouter);
app.use("/uploads",express.static("uploads"));
app.get("/",(req,res)=>{
    return res.send("server is running")
})
app.listen(PORT,()=>{
    console.log(`server is started and running at ${PORT}`)
})