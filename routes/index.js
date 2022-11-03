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

router.get('/recipe', function (req, res) {
  res.render('recipe');
});


router.post('/', function (req, res) {
  res.redirect('/dashboard');
});


module.exports = router;
