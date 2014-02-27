module.exports = {
	/**
	 * Add Access-Control-Allow-Headers in HTTP response
	 */
	header : function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
		next();
	},
	
	/**
	 * Authentication each /api/* request with the session id
	 * 
	 * if session contains user object: next();
	 * else return res.send(401, { message : 'please login' });
	 */
	authentication: function(req, res, next) {
		var sid = req.sessionID;
		//console.log('in authentication, sid=' + sid);
		//console.log('in authentication, session=%j', req.session);
		if (req.session.user) {
			next();
		} else {
			return res.send(401, { message : 'please login' });
		}
	},
	
	/**
	 * Authorization: check if the user with tokenid has rights to access the api 
	 */
	authorization: function(tokenid, url) {
		//return {status: status_code, message : 'xxxx'}
	}
}
