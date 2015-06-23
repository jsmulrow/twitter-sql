var User = require('./models').User;
var Tweet = require('./models').Tweet;

module.exports = {
  add: function(name, tweet, callback) {
    // check if that name has an id
    User.findOne({where: {name: name}})
    .then(function(data) {
      // if the user is not there
      if (!data) {
        // throw error to skip to .catch and create a new user
        throw Error();
      }
      // extract user id from the result
      return data.dataValues.id;
    })
    .then(function(id) {
      return Tweet.create({UserId: id, tweet: tweet});
    })
    .then(function() {
      callback();
    })
    // create a new user entry for this person
    .catch(function() {
      return User.create({name: name, pictureUrl: undefined});
    })
    .then(function() {
      return User.findOne({where: {name: name}});
    })
    .then(function(data) {
      return data.dataValues.id;
    })
    .then(function(id) {
      console.log(id);
      return Tweet.create({UserId: id, tweet: tweet});
    })
    .then(function() {
      callback();
    });

  },

  find: function(query, callback) {
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
          };
      });
    })
    .then(function(data) {
      callback(data);
    });
  },

  list: function(callback) {
    Tweet.findAll({include: [{
        model: User
      }]
    })
    .then(function(data) {
      return data.map(function(elem) {
        return {
          tweet: elem.dataValues.tweet,
          name: elem.dataValues.User.dataValues.name
          };
      });
    })
    .then(function(data) {
      callback(data);
    });
  }
};
