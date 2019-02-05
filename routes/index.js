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
  res.render('login');
});

router.post("/login", function(req, res, next) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body.studentId);
  console.log(req.body.inputPassword);
  if (req.body.studentId == "admin@G45" && req.body.inputPassword == "admin@G45") {
    req.session.status = "admin";
    req.session.id_Session = "admin";
    req.session.fullName_Session = "admin";
    res.redirect('/landing');
  } else {
    let query = {
      studentId: req.body.studentId,
      password: req.body.inputPassword
    };

    Mymongo.FindinCol1("member", query).then(function(items) {
      console.info('The promise was fulfilled with items!', items);
      if (items.length == 1) {
        console.log(items[0].fullName);
        req.session.status = "member";
        req.session.id_Session = items[0].studentId;
        req.session.fullName_Session = items[0].fullName;
        // unimplement
        // req.session.privilege_Session =items[0].

        res.redirect('/landing');
      } else {
        res.render('failLogin');
      }
    }, function(err) {
      console.error('The promise was rejected', err, err.stack);
      res.sendStatus(500);
    });

  }


});

router.get("/landing", function(req, res, next) {
  console.log(req.session.status);
  if(req.session.status === undefined){
    return res.sendStatus(401)
  }
  res.render('mainpage',{status:req.session.status, id:req.session.id_Session , name:req.session.fullName_Session});
});


router.get("/register", function(req, res, next) {
  let checkValidObj = {};
  res.render('register', {
    v1: 0,
    v2: 0,
    v3: 0,
    v4: 0,
    v5: 0,
    v6: 0,
    v7: 0,
    v8: 0
  });
});
router.post("/register", function(req, res, next) {
  if (!req.body) return res.sendStatus(400)

  let checkValidObj = Myutil.checkValid(req.body.studentId, req.body.firstName, req.body.lastName, req.body.iden, req.body.email, req.body.password, req.body.rePassword);

  let notValidStudentId = checkValidObj.checkNotValidStudentId;
  let notValidFirstName = checkValidObj.checkNotValidFirstName;
  let notValidLastName = checkValidObj.checkNotValidLastName;
  let notValidIden = checkValidObj.checkNotValidIden;
  let notValidEmail = checkValidObj.checkNotValidEmail;
  let notValidPassword = checkValidObj.checkNotValidPassword;
  let notValidRePassword = checkValidObj.checkNotValidRePassword;
  let notValidMatchPassword = checkValidObj.checkNotValidMatchPassword;


  if (notValidStudentId == 1 || notValidFirstName == 1 || notValidLastName == 1 || notValidIden == 1 || notValidEmail == 1 || notValidPassword == 1 || notValidRePassword == 1 || notValidMatchPassword == 1) {
    res.render("register", {
      v1: notValidStudentId,
      v2: notValidFirstName,
      v3: notValidLastName,
      v4: notValidIden,
      v5: notValidEmail,
      v6: notValidPassword,
      v7: notValidRePassword,
      v8: notValidMatchPassword,
    });
  } else {

    let requestMember = new Member(req.body.studentId, req.body.firstName, req.body.lastName, req.body.iden, req.body.email, req.body.password, req.body.rePassword);
    requestMember.checkDuplicateMember().then(function(flag) {
      // console.info('The promise was fulfilled with flag!', flag);
      if (flag) {
        console.log("DUPMEM");
        res.render('failRegis', {});
      } else {
        Mymongo.insertToDb(requestMember, "member");
        res.render('thankRegis', {});
      }
    });
  }

});

module.exports = router;
