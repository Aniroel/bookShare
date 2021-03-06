var jwt = require('jwt-simple');
var secret = 'unicorn';

var models = require('../models');
var User = models.User;

module.exports = {
  errorLogger: function (error, req, res, next) {
    console.error(error.stack);
    next(error);
  },
  errorHandler: function (error, req, res, next) {
    res.status(500).send({error: error})
  },
  encode: function (user){
    var token = jwt.encode({id: user.id}, secret);
    return token;
  },

  decode: function (req, res, next) {
    var token = req.headers['authorization'];
    var user;

    if (!token) {
      return res.sendStatus(403);
    }

    try {
      user = jwt.decode(token, secret);

      if (user === undefined || user.id === undefined) {
        return res.status(401).json({error: 'invalid token', user: user});
      }
      req.decodedToken = user;

      User.findAll({where: {id: req.decodedToken.id}}).then(function(users) {
        req.currentUser = users[0];
        next();
      }).catch(function(err) {
        return res.sendStatus(403);
      });
    } catch (error) {
      return next(error);
    }

  }
};
