var User = require('./models').User;
var Tweet = require('./models').Tweet;

module.exports = {
  add: function(name, tweet) {
    // use findOrCreate() which returns the user (created or found)
    return User.findOrCreate({where: {name: name}})
      .then(function(data) {
        // extract their id
        return data[0].dataValues.id;
      })
      .then(function(id) {
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
