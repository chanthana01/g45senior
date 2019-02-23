const Member = require('./../public/javascripts/objects/Member.js');
const Mymongo = require('./../public/javascripts/DBdriver/Mymongo.js');
var Myutil = require("./../public/javascripts/utility/Myutil.js");
var express = require('express');
var router = express.Router();
var math = require('mathjs');
var linSystem = require("linear-equation-system");
var linSystem2 = require('jsequation-solver/eq-calc');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get("/", function(req, res, next) {
  if (req.session.status === undefined) {
    return res.sendStatus(401)
  }
  res.render('linearequation', {
    status: req.session.status,
    id: req.session.id_Session,
    name: req.session.fullName_Session
  });
});
router.post("/calculatelinearequation", function(req, res, next) {
  if (req.session.status === undefined) {
    return res.sendStatus(401)
  }
  let A = req.body.equations;
  let B = req.body.rightEquation;

  function a1(a,b){
    return linSystem.solve(a, b);
  }
  let sol = a1(A,B);
  console.log(sol);
  // failed to calculate by linearSystem begin calculate by LinearSystem2
  if(!sol){
    console.log("Second linearSystem");
    let tempStr = '';
    for (let i = 0; i < A.length; i++) {
      console.log(parseFloat(A[i]));
        tempStr += "["+A[i]+"],";
    }
    tempStr = tempStr.substring(0, tempStr.length - 1);
    let system2Json = '{"size":'+A.length+',"matrix":['+tempStr+']}';
    console.log(system2Json);
    sol = linSystem2.eqcalc(system2Json);
    // console.log(sol);
    // console.log(sol.length);
    let solSubstr = [];
    // console.log(solIndexToSubString);
    for (let i = 0; i < sol.length; i++) {
      solSubstr.push(sol[i].substring((sol[i].indexOf('>')+1)).trim());
    }
    sol = solSubstr;
    console.log(sol);
  }

  res.json({
    solution: sol
  });
});





module.exports = router;
