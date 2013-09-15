
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

process.env.TEMP = process.env.TMP = "./tmp"

// all environments
app.set('port', process.env.APP_PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('env', process.env);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/examples', routes.examples);
app.get('/submit', routes.submit);
app.post('/upload', routes.upload);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
