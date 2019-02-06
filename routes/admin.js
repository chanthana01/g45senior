const Member = require('./../public/javascripts/objects/Member.js');
const Mymongo = require('./../public/javascripts/DBdriver/Mymongo.js');
var Myutil = require("./../public/javascripts/utility/Myutil.js");
var express = require('express');
var router = express.Router();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/dashboard", function(req, res, next) {
  if(req.session.status != "admin"){
    return res.sendStatus(401)
  }
  else{
    let query = {};

    Mymongo.FindinCol1("member", query).then(function(items) {
      console.info('The promise was fulfilled with items!', items);
      // return res.render('dashboard',{items,name:req.session.status});
      Mymongo.FindinCol1("statistic", query).then(function(data) {
        console.info('The promise2 was fulfilled with items!', data);
        return res.render('dashboard',{items,data,name:req.session.status});
      }, function(err) {
        console.error('The promise2 was rejected', err, err.stack);
        res.sendStatus(500);
      });

    }, function(err) {
      console.error('The promise was rejected', err, err.stack);
      res.sendStatus(500);
    });

  }
});







module.exports = router;
