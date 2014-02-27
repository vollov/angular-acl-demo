var express = require('express')
	, midware = require('./lib/midware')
var app = exports.app = express();
var MongoStore = require('connect-mongo')(express);

app.configure(function(){
	app.use(express.favicon());
	//app.use(express.logger('dev'));
	app.use( express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({
		secret: 'asdfds1^*4567890QWERTY',
		// session expiration in every 15 minutes
		cookie: {maxAge: 1000 * 60 * 15},
		store: new MongoStore({
			url:'localhost/demodb'
			//url: 'mongodb://root:myPassword@mongo.onmodulus.net:27017/3xam9l3'
		}),
	}));
	app.use(function(req, res, next) {
		req.session._garbage = Date();
		req.session.touch();
		next();
	});
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

app.all('*', midware.header);

app.options('/api/*', function(req,res){
	res.send(200);
});

app.all('/api/*', midware.authentication);

//API
require('./api/user')(app);
require('./api/auth')(app);

app.listen(3000, '0.0.0.0');
console.log("Express server listening...");
