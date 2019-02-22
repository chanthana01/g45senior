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
  // if (req.session.status === undefined) {
  //   return res.sendStatus(401)
  // }
  res.render('linearequation', {
    status: req.session.status,
    id: req.session.id_Session,
    name: req.session.fullName_Session
  });
});
router.post("/calculatelinearequation", function(req, res, next) {
  // if (req.session.status === undefined) {
  //   return res.sendStatus(401)
  // }
  let A = req.body.equations;
  let B = req.body.rightEquation;

  function a1(a,b){
    return linSystem.solve(a, b);
  }
  let sol = a1(A,B);
  // failed to calculate by linearSystem begin calculate by LinearSystem2
  if(!sol){
    let cloneA = A.slice(0);
    console.log("Second");
    for (let i = 0; i < cloneA.length; i++) {

    }
    let system2Json = '{"size":'+A.length+',"matrix":['+A+']}';
    console.log(system2Json);
    sol = linSystem2.eqcalc(system2Json);
    // sol = linSystem2.eqcalc('{"size":3'+',"matrix":[[22,-10,-12,24],[-10,38,-4,0],[-8,-8,16,0]]}');
    console.log(sol);
  }
  res.json({
    solution: sol
  });
});





module.exports = router;
