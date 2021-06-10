const express = require("express");
const router = express.Router();
const {authRequired} = require("../middleware/auth")

router.get("/",authRequired,(req,res)=>{
    const token = req.token;
    console.log(token);
    res.send("HELLO")
})

module.exports = router;