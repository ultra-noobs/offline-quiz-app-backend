const express = require("express")
const router = express.Router();
var firebase = require("firebase/app")
const app = require('../fire');
const db = firebase.firestore(app);
const {authRequired} = require("../middleware/auth")
const { questionFilter } = require('../utils/questionFilter')

router.post("/saveQuiz",authRequired,(req,res)=> {
    const data = req.body.finalQnA;
    const { time, date, title, batch } = req.body;
    console.log(batch);
    const finalQuizArray = questionFilter(data);
    db.collection('users').doc(req.token).collection("quiz").add( { time, date, title, batch, finalQuizArray});
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
        console.log(querySnapshot.data());
        res.send(querySnapshot.data());
    });
})

.get('/quizbatches', authRequired, async (req, res) => {
    const quizDocRef = db.collection('users').doc(req.token).collection('batch');
    let batches = [];
    await quizDocRef.get().then((querySnapshot) => {
       querySnapshot.forEach((doc, index) => batches.push({value: doc.data().name ,  text: doc.data().name }));
    })
    console.log(batches);
    res.send(batches);
})

module.exports = router;