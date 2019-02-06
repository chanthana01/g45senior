var Mymongo = require("../DBdriver/Mymongo.js");
module.exports = class Member {
    constructor(studentId, firstName, lastName, iden, email, password) {
      this.studentId = studentId.trim();
      this.firstName = firstName.trim();
      this.lastName = lastName.trim();
      this.iden = iden.trim();
      this.email = email.trim();
      this.password = password.trim();
      // this.rePassword = rePassword.trim();
      this.fullName = (this.firstName + " " + this.lastName).toUpperCase();
      this.previlege = "member";
      this.loginCount = 0;
    }
    get getStudentId() {
      return this.studentId;
    }
    get getFirstName() {
      return this.firstName;
    }
    get getLastName() {
      return this.lastName;
    }
    get getIden() {
      return this.iden;
    }
    get getEmail() {
      return this.email;
    }
    get getPassword() {
      return this.password;
    }
    get getFullName() {
      return this.fullName;
    }
    get getLoginCount() {
      return this.loginCount;
    }

    set setStudentId(studentId) {
      this.studentId = studentId.trim();
    }
    set setFirstName(firstName) {
      this.firstName = firstName.trim();
    }
    set setLastName(lastName) {
      this.lastName = lastName.trim();
    }
    set setIden(iden) {
      this.iden = iden.trim();
    }
    set setEmail(email) {
      this.email = email.trim();
    }
    set setPassword(password) {
      this.password = password.trim();
    }

    // set setFullName(fullName){
    //   this.fullName=fullName.trim();
    // }
    checkDuplicateMember() {
        let id = this.studentId;
        let name = this.fullName;
        let mail = this.email;
        let iden =this.iden;
        let data;
        let flag;
        return new Promise(function(resolve, reject) {
            Mymongo.FindinCol1("member", {
              $or: [{
                studentId: id
              }, {
                fullName: name
              },{
                iden: iden
              },{
                email:mail
              }]
            }).then(function(items) {
              data = items;
              console.info('The promise was fulfilled with items!', items);
            }, function(err) {
              console.error('The promise was rejected', err, err.stack);
            }).then(function(){
              // console.log("data");
              // console.log(data);
              if(data.length>0){
                flag = true;
                resolve(flag);
              }
              else{
                flag = false;
                resolve(flag);
              }
            })

          })
          }



        }
