const express = require("express")
const router = express.Router();
var firebase = require("firebase/app")
const app = require('../fire');
const db = firebase.firestore(app);
const {authRequired} = require("../middleware/auth")
const { questionFilter } = require('../utils/questionFilter')

router.post("/saveQuiz",authRequired,(req,res)=> {
    const data = req.body.finalQnA;
    const { time, date, title } = req.body;
    const finalQuizArray = questionFilter(data);
    db.collection('users').doc(req.token).collection("quiz").add( { time, date, title, finalQuizArray});
    console.log("Quiz Successfully Created");
    res.send("Quiz Successfully Created")
})


.get('/' , authRequired, async (req, res) => {
    const quizDocRef = db.collection('users').doc(req.token)
    console.log(req.token);
    var quizes = [];
    quizDocRef.collection("quiz").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            quizes.push({id:doc.id, data: doc.data() });
            console.log(doc.id);
        });
        res.send(quizes);
    }); 
})

.get('/view/:id', authRequired, async (req, res) => {
    const quizDocRef = db.collection('users').doc(req.token);
    var quiz = {};
    quizDocRef.collection('quiz').doc(req.params.id).get().then((querySnapshot) => {
        res.send(querySnapshot.data());
    });
});

router.get('/:id',authRequired,(req,res)=>{
    const id = req.params.id;
    const token = req.token;
    
})

module.exports = router;