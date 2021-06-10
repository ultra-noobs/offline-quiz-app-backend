const express = require("express")
const router = express.Router();
var firebase = require("firebase/app")
const app = require('../fire');
const db = firebase.firestore(app);
const {authRequired} = require("../middleware/auth")
function nextCharacter(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
router.post("/saveQuiz",authRequired,(req,res)=>{
    const data = req.body.questionAndAnswers;
    const finalQuiz = [];
    const {time,date} = req.body;
    for(let k=0;k<data.length;k++){
        const question = data[k].question;
        const ans = data[k].answer.trim();
        var val = 'b';
        var array = [];
        var l = ans.length;
        var tem_ans = "";
        for(let i=2;i<l;i++){
            if(i+1 < l && ans[i]==(val) && ans[i+1]==')'){
                array.push(tem_ans.trim());
                tem_ans = "";
                val = nextCharacter(val);
                i++;
            }else{
                tem_ans +=ans[i];
            }
        }
        array.push(tem_ans.trim());
        finalQuiz.push({question,option:array});
    }
    db.collection('users').doc(req.token).collection("quiz").add({time,date,finalQuiz});
    console.log("Quiz Successfully Created");
    res.send("Quiz Successfully Created")
})

module.exports = router;