var User              = require('../models/user');
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;

var jwt = require('jwt-simple');
var moment         = require('moment');


// ============ PASSPORT SESSION SETUP
module.exports = function(passport, app){

  passport.serializeUser(function(token, done) {
    done(null, token);
  });

  passport.deserializeUser(function(token, done) {
    done(null, token);
  });

  // ============ LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    process.nextTick(function() {

      // Find a user with this e-mail
      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) return callback(err);

        // If there already is a user with this email 
        if (user) {
          return callback(null, false);
        } else {
        // There is no email registered with this email

          // Create a new user
          var newUser            = new User();
          newUser.local.email    = email;
          newUser.local.name    = req.body.name;
          newUser.linkedin.avatar    = req.body.avatar;
          newUser.linkedin.industry    = req.body.industry;
          newUser.local.password = newUser.encrypt(password);

          newUser.save(function(err) {
            if (err) throw err;
            return callback(null, createJwt(newUser).token);
          });
        }
      });
    });
  }));

  // ============ LOCAL LOGIN 
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    process.nextTick(function() {

      User.findOne({ 'local.email' :  email }, function(err, user){
        if (err) 
          return callback(err);
        if (!user) {
          return callback(null, false);
        }       
      if (!user.validPassword(password)) return callback(null, false); 
      return callback(null, createJwt(user));
      });

    })
  })
);

 

  function createJwt(user){
    var expires = moment().add(7, 'days').valueOf();
    var token = jwt.encode({
      iss: user.id,
      exp: expires
    }, app.get('jwtTokenSecret'));

    return {
      token : token
    };
  }
}




