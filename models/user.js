var mongoose = require('mongoose')
var passport = require("passport");
var userSchema = new mongoose.Schema({ 
 name: String,
 email: String,
 password: String
});

userSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9), null);
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema);