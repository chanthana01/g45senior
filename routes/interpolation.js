const Member = require('./../public/javascripts/objects/Member.js');
const Mymongo = require('./../public/javascripts/DBdriver/Mymongo.js');
var Myutil = require("./../public/javascripts/utility/Myutil.js");
var express = require('express');
var router = express.Router();
var math = require('mathjs');
var interpolatingPolynomial = require('interpolating-polynomial');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get("/", function(req, res, next) {
  if (req.session.status === undefined) {
    return res.sendStatus(401)
  }
  res.render('interpolation', {
    status: req.session.status,
    id: req.session.id_Session,
    name: req.session.fullName_Session
  });
});
router.post("/calculateinterpolation", function(req, res, next) {
  console.log(req.body);
  if(req.session.status === undefined){
    return res.sendStatus(401)
  }
  let toProcessDataArray = [];
  for (let i = 0; i < req.body.coordinateArray.length; i++) {
    let tempArray = [];
    for (let j = 0; j < req.body.coordinateArray[i].length; j++) {
      tempArray.push(parseFloat(req.body.coordinateArray[i][j]));
      // console.log(parseFloat(req.body.coordinateArray[i][j]));
    }
    // console.log(tempArray);
    toProcessDataArray.push(tempArray);
  }
  // console.log(toProcessDataArray);
  let f = interpolatingPolynomial(toProcessDataArray);
  let ansArray = [];
  let isInvalid = false;
  let x = [];
  for (let i = parseFloat(req.body.minX); i <= parseFloat(req.body.maxX); i += 0.1) {
    x.push(i);
    ansArray.push(f(i));
  }

// console.log(isFinite(ansArray[0]));

  if(!isFinite(ansArray[0])){isInvalid=true;}
  res.json({
    solution: ansArray,
    x:x,
    isInvalid: isInvalid
  });
});





module.exports = router;
