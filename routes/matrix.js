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
  res.render('matrixmultiply',{status:req.session.status, id:req.session.id_Session , name:req.session.fullName_Session});
});
router.post("/matrixcalculate", function(req, res, next) {
   // console.log(req.body);
   console.log(Array.isArray(req.body.matrixA[0]));
   console.log(Array.isArray(req.body.matrixB[0]));

   console.log("MatrixA:");
   console.log(req.body.matrixA[0]);
   console.log("length A:");
   let matrixA = req.body.matrixA[0];
   console.log(matrixA.length);
   for (let i = 0; i < matrixA.length; i++) {
     console.log("row"+i+":="+matrixA[i]);
     for (let j = 0; j < matrixA[i].length; j++) {
     console.log("a"+i+j+":="+matrixA[i][j]);
     }
   }

   console.log("MatrixB:");
   console.log(req.body.matrixB[0]);
   console.log("length B:");
   let matrixB = req.body.matrixB[0];
   console.log(matrixB.length);
   for (let i = 0; i < matrixB.length; i++) {
     console.log("row"+i+":="+matrixB[i]);
     for (let j = 0; j < matrixB[i].length; j++) {
     console.log("a"+i+j+":="+matrixB[i][j]);
     }
   }
   let result = math.multiply(req.body.matrixA[0], req.body.matrixB[0]);
   console.log(result);
   res.json({result:result});

  // res.render('matrixmultiply',{status:req.session.status, id:req.session.id_Session , name:req.session.fullName_Session});
});





module.exports = router;
