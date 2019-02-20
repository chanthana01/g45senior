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
  // console.log(req.body);
  });





module.exports = router;
