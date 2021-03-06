var db = require('../lib/db.js')
	, mongojs = require('mongojs');

module.exports = function(app) {
	
	/**
	 * Spec 1.1 get the most recent 20 users with GET
	 */
	app.get('/api/users', function(req, res) {
		// order by 'firstname' with aescendant. 
		var sort = [['firstname', 1]];
		db.find('user',{sort:sort,limit:20}, function(err, users) {
			if (!err) {
				var result = db.filterId(users);
				return res.send(200,result);
			} else {
				return console.log(err);
			}
		});
	});

	/**
	 * Spec 1.2 get the user by object id with GET
	 */
	app.get('/api/users/:id', function(req, res){
		var id = req.params.id;
		db.findOne('user', {'_id': mongojs.ObjectId(id)}, {}, function(err, user){
			if (!err) {
				return res.send(200,user);
			} else {
				return console.log(err);
			}
		});
	});
	
	/**
	 * Spec 1.3 add a new user with POST
	 */
	app.post('/api/users', function(req, res){
		db.save('user', req.body)
		res.send(200,req.body);
	});
	
	/**
	 * Spec 1.4 edit a user with PUT
	 */
	app.put('/api/users', function(req, res){
		var id = req.body._id;
		delete req.body['_id']
		db.update('user',  {'_id': mongojs.ObjectId(id)}, {$set: req.body},
			{upsert: false, multi:false}, function(){res.send(200,req.body);
		});
	});
	
	/**
	 * Spec 1.5 delete a user by object id with DELETE
	 */
	app.delete('/api/users/:id', function(req, res){
		var id = req.params.id;
		db.remove('user', {'_id': mongojs.ObjectId(id)}, function(err, message){
			if (!err) {
				res.json(true);
			} else {
				console.log(err);
				res.json(false);
			}
		});
	});
};
