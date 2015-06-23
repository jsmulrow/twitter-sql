var express = require('express')
var router = express.Router()
module.exports = router
var tweetBank = require('./tweetbank')
var fs = require('fs')

router.get('/', function(req, res, next) {
  // res.json(tweetBank.list())
  tweetBank.list(function(tweets) {
  	res.render('index', {
  		tweets: tweets
  	});
  });
})

router.post('/', function(req, res, next) {
  tweetBank.add(req.body.name, req.body.tweet, function() {
  	res.status(201).end();
  })
  // res.status(201).end()
})

router.get('/users/:user', function(req, res, next) {
  var tweets = tweetBank.find({ name: req.params.user }, function(tweets){
  	  res.render('index', { tweets: tweets })
  })
})

// example without static file server
router.get('/style.css', function(req, res) {
  fs.readFile('./public/stylesheets/style.css', function(err, contentBuffer) {
    var css = contentBuffer.toString()
    res.header('Content-Type', 'text/css')
    res.send(css)
  })
})



