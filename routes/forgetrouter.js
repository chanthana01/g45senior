const Member = require('./../public/javascripts/objects/Member.js');
const Mymongo = require('./../public/javascripts/DBdriver/Mymongo.js');
var Myutil = require("./../public/javascripts/utility/Myutil.js");
var express = require('express');
var router = express.Router();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", function(req, res, next) {
  return res.render('forgotpass');
});


router.post("/forgotsubmit", function(req, res, next) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body.forgotStudentId);
  console.log(req.body.forgotIden);
  if(req.body.forgotNewPass != req.body.forgotNewRePass){
    return res.render('msg',{error :"Password not match."});
  }
  let query = {
    studentId: req.body.forgotStudentId,
    iden: req.body.forgotIden
  };
  Mymongo.FindinCol1("member", query).then(function(items) {
    console.info('The promise was fulfilled with items!', items);
    if (items.length == 1) {
      // update password db
      Mymongo.updateTodb('member',{ studentId : items[0].studentId }, { $set: {password : req.body.forgotNewPass }})
      return res.render('msg',{error :"Password has been changed."});
    } else {
      return res.render('msg',{error :"Invalid username or identification."});//will add sent json
    }
  }, function(err) {
    console.error('The promise was rejected', err, err.stack);
    res.sendStatus(500);
  });

});




module.exports = router;
