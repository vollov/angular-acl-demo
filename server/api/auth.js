var db = require('../lib/db.js')
	, security = require('../lib/security');

module.exports = function(app) {
	/** 
	 * login logic:
	 * 		if db has email and password:
	 *			generate token id and send back
	 * 		else:
	 *			return 401 and error message
	 */
	app.post('/public/login', function(req, res){
//		console.log('getting credential from login = %j', req.body)
		var username = req.body.username;
		var password = req.body.password;
		db.findOne('user', {'email': username}, {'password':1}, function(err, user){
//			console.log('findOne return a user = %j', user);
			if(!err) {
				// if user not in DB
				if(user == null){
					// console.log('user not in db');
					return res.send(401, { message : 'user name is not existing' });
				}else{
					//console.log('found user-> %j', user);
					// if password match, save user in to session
					if(security.hash(password) == user['password']) {
						var user = {
							'username': username,
							'role': user['role']
						};
						req.session.user = user;
						//console.log('logging session-> %j', req.session.user);
						return res.send(200, { message : 'login success!' });
					}else{
						return res.send(401, { message : 'incorrect password' });
					}
				}
			} else {
				return res.send(500, { message : 'Error when querying database' });
			}
		});
	});
	
	app.get('/api/logout', function(req, res){
		req.session.regenerate(function() {
			res.send(200, { message : 'logged out' });
		});
	});
	
//	app.get('/public/routes', function(req, res){
//		return res.send(200, {routes: ['/','/login','/logout','/postcodes','/about']});
//	});
}
