const express = require("express")
const router = express.Router();
var firebase = require("firebase/app")
const app = require('../fire');
const db = firebase.firestore(app);
const {authRequired} = require("../middleware/auth")
const { questionFilter } = require('../utils/questionFilter')

router.post("/saveQuiz",authRequired,(req,res)=> {
    const data = req.body.finalQnA;
    const { time, date } = req.body;
    const finalQuizArray = questionFilter(data);
    console.log(finalQuizArray);
    db.collection('users').doc(req.token).collection("quiz").add( { time, date, finalQuizArray});
    console.log("Quiz Successfully Created");
    res.send("Quiz Successfully Created")
})

.get('/' , authRequired, async (req, res) => {
    const quizDocRef = db.collection('users').doc(req.token)
    console.log(req.token);
    var quizes = [];
    quizDocRef.collection("quiz").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            quizes.push(doc.data());
        });
        res.send(quizes);
    }); 
});

module.exports = router;