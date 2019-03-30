const Member = require('./../public/javascripts/objects/Member.js');
const Mymongo = require('./../public/javascripts/DBdriver/Mymongo.js');
var Myutil = require("./../public/javascripts/utility/Myutil.js");
var express = require('express');
var router = express.Router();
var math = require('mathjs');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get("/", function(req, res, next) {
  if(req.session.status === undefined){
    return res.sendStatus(401)
  }
  res.render('norm', {
    status: req.session.status,
    id: req.session.id_Session,
    name: req.session.fullName_Session
  });
});
router.post("/calculatenorm", function(req, res, next) {
  if(req.session.status === undefined){
    return res.sendStatus(401)
  }
  console.log(req.body);
  let norm = req.body.norm;
  let solution = "";
  let solution2 = "";
  let solution3 = 0;
  let answer =0;
  for(let i = 0;i<norm.length;i++){
    solution += "("+norm[i]+"^2"+")+";
    solution2 += math.pow(parseFloat(norm[i]),2)+"+";
    solution3 = solution3 + math.pow(parseFloat(norm[i]),2);
    answer= answer + math.pow(parseFloat(norm[i]),2);
  }
  solution=solution.substring(0, solution.length - 1);
  solution2=solution2.substring(0, solution2.length - 1);
  answer = math.sqrt(answer);
  console.log(solution);
  console.log(solution2);
  console.log(solution3);
  console.log(answer);

  res.json({
    solution: solution,
    solution2: solution2,
    solution3: solution3,
    answer:answer
  });

  });





module.exports = router;
