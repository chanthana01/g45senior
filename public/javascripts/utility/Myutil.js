var Mymongo = require("../DBdriver/Mymongo.js");
module.exports = {
  checkValid: function(studentId, firstName, lastName, iden, email, password, rePassword) {
    // VALIDATION
    let AtozPatt = /^[a-zA-Z]+$/;
    let isnum = /^[0-9]*$/g;
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // checkNotValidStudentId:0, checkNotValidFirstName:0, checkNotValidLastName:0, checkNotValidIden:0, checkNotValidEmail:0, checkNotValidPassword:0, checkNotValidRePassword:0,  checkNotValidMatchPassword:0,

    let resultObject = {
      checkNotValidStudentId: 0,
      checkNotValidFirstName: 0,
      checkNotValidLastName: 0,
      checkNotValidIden: 0,
      checkNotValidEmail: 0,
      checkNotValidPassword: 0,
      checkNotValidRePassword: 0,
      checkNotValidMatchPassword: 0,
    }

    if (!isnum.test(studentId) || studentId.length != 10) {
      console.log("Wrong student iD");
      resultObject.checkNotValidStudentId = 1;
    }
    if (!AtozPatt.test(firstName) || firstName.length < 1) {
      console.log("Wrong Firstname");
      resultObject.checkNotValidFirstName = 1;
    }
    if (!AtozPatt.test(lastName) || lastName.length < 1) {
      console.log("Wrong Lastname");
      resultObject.checkNotValidLastName = 1;
    }
    if (iden.length < 1) {
      console.log("Identification cannot be empty!!");
      resultObject.checkNotValidIden = 1;
    }
    if (!emailRegex.test(email) || email.length < 1) {
      console.log("Wrong email");
      resultObject.checkNotValidEmail = 1;
    }
    if (password.length < 1) {
      console.log("password cannot be empty");
      resultObject.checkNotValidPassword = 1;
    }
    if (rePassword.length < 1) {
      console.log("repassword cannot be empty");
      resultObject.checkNotValidRePassword = 1;
    }
    if (password != rePassword) {
      console.log("Password does not match!");
      resultObject.checkNotValidMatchPassword = 1;

    }

    return resultObject;
  },
  increaseLoginCount: function(){
    let query = {
      name: "visitor"

    };
    Mymongo.FindinCol1("statistic", query).then(function(items) {
      console.info('The promise was fulfilled with items!', items);
      if (items.length == 1) {
        let increaseNum = parseInt(items[0].visitCount) + 1 ;
        Mymongo.updateTodb('statistic',query, { $set: {visitCount : increaseNum}});
      } else {
        console.log("ERROR Cannot increase visitor count");
      }
    }, function(err) {
      console.error('The promise was rejected', err, err.stack);
      res.sendStatus(500);
    });
  },
  increaseMemberCount: function(){
    let query = {
      name: "member"

    };
    Mymongo.FindinCol1("statistic", query).then(function(items) {
      console.info('The promise was fulfilled with items!', items);
      if (items.length == 1) {
        let increaseNum = parseInt(items[0].memberCount) + 1 ;
        Mymongo.updateTodb('statistic',query, { $set: {memberCount : increaseNum}});
      } else {
        console.log("ERROR Cannot increase member count");
      }
    }, function(err) {
      console.error('The promise was rejected', err, err.stack);
      res.sendStatus(500);
    });
  }
}
