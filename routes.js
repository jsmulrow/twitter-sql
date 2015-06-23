var express = require('express');
var router = express.Router();
module.exports = router;
var tweetBank = require('./tweetbank');
var fs = require('fs');

router.get('/', function(req, res, next) {
  tweetBank.list()
  .then(function(tweets) {
	res.render('index', {
		tweets: tweets,
		showForm: true
	});
  });
});

router.post('/submit', function(req, res, next) {
  tweetBank.add(req.body.name, req.body.text)
  .then(function() {
	// res.status(201).end()
	res.redirect('/');
  });
});

router.get('/users/:user', function(req, res, next) {
	tweetBank.find({name: req.params.user})
	.then(function(tweets) {
		res.render('index', {tweets: tweets});
	});
});

// example without static file server
router.get('/style.css', function(req, res) {
  fs.readFile('./public/stylesheets/style.css', function(err, contentBuffer) {
    var css = contentBuffer.toString();
    res.header('Content-Type', 'text/css');
    res.send(css);
  });
});