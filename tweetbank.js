var User = require('./models').User;
var Tweet = require('./models').Tweet;

module.exports = {
  add: function(name, tweet) {
    // check if that name has an id
    return User.findOne({where: {name: name}})
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
      });

  },

  find: function(query) {
    return Tweet.findAll({include: [{
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
          });
  },

  list: function() {
    return Tweet.findAll({include: [{
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
          });
  }
};
