var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
var firebase = require("firebase/app")
const app = require('../fire');
const db = firebase.firestore(app);

router.get('/', function(req, res, next) {
  res.send("listening your request ");
});

router.get("/checkAuth",async(req,res)=>{
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, process.env.SESSION_SECRET,async(err,decoded)=>{
      if(err) res.send(false);
      const userDocRef = await db.collection('users').doc(decoded.id);
      const doc = await userDocRef.get();
      if (!doc.exists) {
        res.send(false);
      } else {
        res.send(true);
      }
    });
  } catch (err) {
    console.log(err);
    res.send(false);
  }
})

module.exports = router;
