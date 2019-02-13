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
   console.log(req.body.matrixA[0]);
   console.log(req.body.matrixB[0]);
   res.sendStatus(200);
   console.log(
    math.multiply(req.body.matrixA[0], req.body.matrixB[0])
    );
  // res.render('matrixmultiply',{status:req.session.status, id:req.session.id_Session , name:req.session.fullName_Session});
});





module.exports = router;
