var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'EatBits' });
});

// Dashboard page
router.get('/dashboard', function (req, res) {
  res.render('dashboard');
});


//Recipe page
router.get('/recipe', function (req, res) {
  res.render('recipe');
});

// Sign Up page
router.get('/register', function (req, res) {
  res.render('register');
});

// Profile page
router.get('/profile', function (req, res) {
  res.render('profile');
});

router.post('/', function (req, res) {
  res.redirect('/dashboard');
  res.redirect('/register');
});

router.post('/register', function (req, res) {
  res.redirect('/profile');
});

router.get('/quiz', function (req, res) {
  res.render('quiz');

});

router.get('/activities', function (req, res) {
  res.render('activities');

});


router.get('/foodReport', function (req, res) {
  res.render('foodReport');

});

router.get('/review', function (req, res) {
  res.render('review');
});

router.get('/game', function (req, res) {
  res.render('game');
});


module.exports = router;
