var express = require('express');
var router = express.Router();
const fs = require("fs");

const account = require('../account.json')
var recipejson = require('../recipes.json');
var loginerror = "";
var accounterror = "";
var currentprofile;
var title;
var videoUrl;
var withKids;
var withoutKids;
var ingredients;
var Id;

// Home or Landing page
router.get('/', function (req, res, next) {
  currentprofile = undefined;
  res.render('index', { loginmessage: loginerror });
});



router.get('/recipe/:id', function (req, res) {
  recipeId = req.params.id;
  let recipe = null;
  for (let i = 0; i < recipejson.length; i++) {
    if (recipejson[i].Id == recipeId) {
      recipe = recipeDetails(recipejson[i].Name, recipejson[i].Url,
        recipejson[i].WithKids, recipejson[i].WithOutKids, recipejson[i].Ingredients, recipejson[i].Id);
    }
  }

  res.render('recipe', { user: currentprofile, recipeInfo: recipe });
});


function recipeDetails(title, videoUrl, withKids, withoutKids, ingredients, Id) {
  this.title = title;
  this.videoUrl = videoUrl;
  this.withKids = withKids;
  this.withoutKids = withoutKids;
  this.ingredients = ingredients;
  this.Id = Id;
  return this;
}

// Login authentication
router.post('/', function (req, res) {
  let username = req.body.email;
  let password = req.body.password;
  console.log(username, password)
  var done = 0
  for (var i = 0; i < account.length; i++) {
    if (account[i].username == username && account[i].password == password) {
      done = 1;
      currentprofile = account[i];
      loginerror = "";
      res.redirect('/dashboard');
    }
  }
  if (done == 0) {
    loginerror = "Invalid login credentails. Please try again.";
    res.redirect('/');
  }
});

// Sign Up page
router.get('/register', function (req, res) {
  res.render('register', {accounterror : accounterror});
});

router.post('/register', function (req, res) {
  var same = 0;
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  let email = req.body.email;
  let pwd = req.body.pwd;
  for (var i = 0; i < account.length; i++) {
    if (account[i].username == email) {
      same = 1;
      accounterror = "Account with this email already exists! Please use a different email or login with an existing account!!";
      res.redirect('/register');
    }
  } 
if(same == 0)
{
  let newuser = {
    "username": email,
    "password": pwd,
    "firstname": firstname,
    "lastname": lastname,
    "countchildren": 0,
    "childrenname": [],
    "childrenage": [],
    "childrenallergy": []
  }

  account.push(newuser);
  fs.writeFile("account.json", JSON.stringify(account), err => {
    // Checking for errors
    if (err) throw err;
  });
  currentprofile = newuser;
  loginerror = "";
  accounterror = "";
  res.redirect('/profile');
}
});

// Profile page
router.get('/profile', function (req, res) {
  res.render('profile', { user: currentprofile});
});

router.post('/profile', function (req, res) {
  let count = req.body.children;
  let childname = req.body.childname;
  let childage = req.body.childage;
  let allergy = req.body.allergy;

  if (count) {
    currentprofile.countchildren = count;
  }
  currentprofile.childrenname = [];
  currentprofile.childrenage = [];
  currentprofile.childrenallergy = [];

  if (count < 2)
  {
    currentprofile.childrenname.push([childname]);
  currentprofile.childrenage.push([childage]);
  currentprofile.childrenallergy.push([allergy]);
  }
  else {
  currentprofile.childrenname.push(childname);
  currentprofile.childrenage.push(childage);
  currentprofile.childrenallergy.push(allergy);
  }


  fs.writeFile("account.json", JSON.stringify(account), err => {
    if (err) throw err;
  });
  loginerror = "";
  accounterror = "";
  res.redirect('/profile');
});

// Dashboard page
router.get('/dashboard', function (req, res) {
  res.render('dashboard', { user: currentprofile });
});

// Quiz/Game start page
router.get('/activities', function (req, res) {
  res.render('activities', { user: currentprofile });

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
  res.render('foodReport', { user: currentprofile });

});

//Recipe page
router.get('/recipe', function (req, res) {
  res.render('recipe', { user: currentprofile });
});

// Recipe review page
router.get('/review', function (req, res) {
  res.render('review', { user: currentprofile });
});

//search Page
router.get('/search', function (req, res) {
  res.render('search', { user: currentprofile });

});

module.exports = router;
