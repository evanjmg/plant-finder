var express              = require('express'), 
    app                  = express(), 
    bodyParser           = require('body-parser'),
    flash                = require('connect-flash'),
    passport             = require('passport'),
    expressViews         = require('express-ejs-views'),
    mongoose             = require('mongoose'),
    morgan               = require('morgan'),
    path                 = require('path'), 
    layout               = require('express-ejs-layouts'),
    cookieParser         = require('cookie-parser'),
    session              = require('express-session'),
    connect              = require('connect'), 
    request              = require('request'),
    sassMiddleware       = require('node-sass-middleware'),
    MongoStore = require('connect-mongo')(session);

app.use('/styles', sassMiddleware({
      src: srcPath,
      dest: destPath,
      debug: true,
      outputStyle: 'expanded'
    }));

app.use(bodyParser.json());
  app.use(bodyParser({ extended: true}));
  
  var methodOverride = require('method-override');

  var srcPath = './public/sass';
  var destPath = './public/styles';
  app.use(cookieParser('secret'));

  app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }));

  app.use(express.static(__dirname + '/public'));
  app.set('views', './views');
  app.engine('ejs', require('ejs').renderFile);
  app.set('view engine', 'ejs');
  var mongoose = require('mongoose');
  var databaseURL = process.env.MONGOLAB_URI ||'mongodb://localhost/e-commerce';
  mongoose.connect(databaseURL);
  app.use(require('./controllers'));


  app.listen(process.env.PORT || 5000, function () {
    console.log('listening on port 5000 - Plant-Finder')
  });