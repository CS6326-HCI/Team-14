var express = require('express');
var router = express.Router();
const fs = require("fs");

const account = require('../account.json')
var loginerror = ""
var currentprofile;

// Home or Lnading page
router.get('/', function (req, res, next) {
  res.render('index', {loginmessage: loginerror});
});

// Login authentication
router.post('/', function(req, res) {
  let username = req.body.email;
  let password = req.body.password;
  console.log(username,password)
  var done = 0
  for (var i = 0; i < account.length; i++){
    if (account[i].username == username && account[i].password == password){
      done = 1;
      currentprofile = account[i];
      loginerror = "";
      res.redirect('/dashboard');
    }
  }
  if(done == 0){
    loginerror = "Invalid login credentails. Please try again.";
    res.redirect('/');
  }
});

// Sign Up page
router.get('/register', function (req, res) {
  res.render('register');
});

router.post('/register', function (req, res) {
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  let email = req.body.email;
  let pwd = req.body.pwd;
  let newuser = { 
    "username": email, 
    "password": pwd,
    "firstname":firstname,
    "lastname":lastname,
    "countchildren": 0,
    "childrenname":[],
    "childrenage": [],
    "childrenallergy":[]
  }
  account.push(newuser);
  fs.writeFile("account.json", JSON.stringify(account), err => { 
    // Checking for errors
    if (err) throw err;  
  });
  currentprofile = newuser;
  loginerror = ""; 
  res.redirect('/profile');
});

// Profile page
router.get('/profile', function (req, res) {
  res.render('profile', {user: currentprofile});
});

router.post('/profile', function(req, res) {
  let count = req.body.children;
  let childname = req.body.childname;
  let childage = req.body.childage;
  let allergy = req.body.allergy;

  if(count){
    currentprofile.countchildren = count;
    }

  currentprofile.childrenname.push(childname);
  currentprofile.childrenage.push(childage);
  currentprofile.childrenallergy.push(allergy);


  fs.writeFile("account.json", JSON.stringify(account), err => { 
    if (err) throw err;  
  });
  loginerror = "";
  res.redirect('/profile');
});

// Dashboard page
router.get('/dashboard', function (req, res) {
  res.render('dashboard', {user: currentprofile});
});

// Quiz/Game start page
router.get('/activities', function (req, res) {
  res.render('activities', {user: currentprofile});

});

// Quiz page
router.get('/quiz', function (req, res) {
  res.render('quiz');

});

// Game page
router.get('/game', function (req, res) {
  res.render('game');
});

// Food preference report page
router.get('/foodReport', function (req, res) {
  res.render('foodReport', {user: currentprofile});

});

//Recipe page
router.get('/recipe', function (req, res) {
  res.render('recipe', {user: currentprofile});
});

// Recipe review page
router.get('/review', function (req, res) {
  res.render('review', {user: currentprofile});
});

module.exports = router;
