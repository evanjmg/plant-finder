var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
function authenticatedUser(req,res,next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
} 
var Plant = require('../models/plant')
var User = require('../models/user')
router.route('/camera')
  .get(function(req,res) {
    res.render('images/camera.ejs')
  })
router.route('/')
  .get(staticController.index);

router.route('/login')
  .get(usersController.login)
  module.exports = router;

//  Users Controller

// Images Controller
  // router.route('/api/images/')

// Plants Controller
router.route('/api/plants/')
  .get(plantsController.plantsIndex)
  .post(plantsController.plantsCreate)
  .delete(plantsController.plantsDelete);

router.route('/api/plants/:id')
  .get(plantsController.plantsShow)
  .put(plantsController.plantsUpdate);
