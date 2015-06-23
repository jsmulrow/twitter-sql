var User = require('./models').User;
var Tweet = require('./models').Tweet;



module.exports = {
  add: function(name, tweet, callback) {
    User.findOrCreate({where: {name: name},})

    

  },
  find: function(query, callback) {
    // iterate through tweets attempting to match for query object
    // eg tweets = [{ name: 'zeke', tweet: 'foo'}, { name: 'omri', tweet: 'bar'}]
    // query { name: 'zeke' }
    // will return [{ name: 'zeke', tweet: 'foo'}]

    Tweet.findAll({include: [{
        model: User,
        where: {name: query.name}
      }]
    })
    .then(function(data) {
      return data.map(function(elem) {
        return {
          tweet: elem.dataValues.tweet,
          name: elem.dataValues.User.dataValues.name
          }
      });
    })
    .then(function(data) {
      callback(data);
    });
  },
  list: function(callback) {
    Tweet.findAll({include: [{
        model: User,
      }]
    })
    .then(function(data) {
      return data.map(function(elem) {
        return {
          tweet: elem.dataValues.tweet,
          name: elem.dataValues.User.dataValues.name
          }
      });
    })
    .then(function(data) {
      callback(data);
    });
  }
};


var randArrayEl = function(arr) {
 return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
 var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
 var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
 return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
 var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
 return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
 module.exports.add( getFakeName(), getFakeTweet() );
}