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


router.get("/matrixmultiplication", function(req, res, next) {
  if(req.session.status === undefined){
    return res.sendStatus(401)
  }
  res.render('matrixmultiply', {
    status: req.session.status,
    id: req.session.id_Session,
    name: req.session.fullName_Session
  });
});
router.post("/matrixcalculate", function(req, res, next) {
  if(req.session.status === undefined){
    return res.sendStatus(401)
  }
  // console.log(req.body);
  let matrixBTranpose = math.transpose(req.body.matrixB[0]);
  console.log(Array.isArray(req.body.matrixA[0]));
  console.log(Array.isArray(req.body.matrixB[0]));

  console.log("MatrixA:");
  console.log(req.body.matrixA[0]);
  console.log("length A:");
  let matrixA = req.body.matrixA[0];
  console.log(matrixA.length);
  // for (let i = 0; i < matrixA.length; i++) {
  //   console.log("row" + i + ":=" + matrixA[i]);
  //   for (let j = 0; j < matrixA[i].length; j++) {
  //     console.log("a" + i + j + ":=" + matrixA[i][j]);
  //   }
  // }

  // console.log("MatrixB:");
  // console.log(req.body.matrixB[0]);
  console.log("length B:");
  let matrixB = req.body.matrixB[0];
  console.log(matrixB.length);
  // for (let i = 0; i < matrixB.length; i++) {
  //   console.log("row" + i + ":=" + matrixB[i]);
  //   for (let j = 0; j < matrixB[i].length; j++) {
  //     console.log("a" + i + j + ":=" + matrixB[i][j]);
  //   }
  // }
  let result = math.multiply(req.body.matrixA[0], req.body.matrixB[0]);
  let rowALength = matrixA.length;
  let colBLength = matrixB[0].length;

  console.log("rowA length:=" + rowALength);
  console.log("colB length:=" + colBLength);
  console.log("matrixB tranpose:");
  console.log(matrixBTranpose);
  console.log("matrixB tranpose length:" + matrixBTranpose.length);

  // solution
  let sol = [];
  for (let i = 0; i < matrixA.length; i++) {
    let tempRow = [];
    console.log("I =:" + i + "rowofA" + i + ":=" + matrixA[i]);
    for (let j = 0; j < matrixBTranpose.length; j++) {
      console.log("J =:" + j);
      let tempStr = "";
      // let tempMatrixAvalue =
      for (let k = 0; k < matrixBTranpose[0].length; k++) {
        tempStr += "(" + matrixA[i][k] + " x " + matrixBTranpose[j][k] + ")";
        if (parseInt(matrixBTranpose[j][k] < 0)) {
          tempStr += "-";
        } else {
          tempStr += "+";
        }
        // console.log("K:="+k+"rowofBTranpose" + j + k + ":=" + matrixBTranpose[j][k]+"tempStr:"+tempStr);
      }
      tempStr = tempStr.substring(0, tempStr.length - 1);
      tempRow.push(tempStr)
      console.log("tempStr");
      console.log(tempStr);
    }
    sol.push(tempRow);
  }
  console.log("sol");
  console.log(sol);
  //
  console.log(sol);
  console.log(result);
  res.json({
    solution:sol,
    result: result
  });

  // res.render('matrixmultiply',{status:req.session.status, id:req.session.id_Session , name:req.session.fullName_Session});
});





module.exports = router;
