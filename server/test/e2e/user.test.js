'use strict';

var should = require('should')
	, mongojs = require('mongojs')
	, db = require('../../lib/db')
	, superagent = require('superagent');

describe('Test users api\n', function() {

	var loginAgent = superagent.agent();
	var credentials = {
		username: 'mary@demo.org',
		password: 'passwd'
	};
	
	var url = 'http://localhost:3000'
	var url_user_api = '/api/users';
	
	describe('Tests with login and logout', function() {
		
		it('should gain a session on POST login', function(done) {
			loginAgent
			.post(url + '/public/login')
			.send(credentials)
			.end(function (err, res) {
				should.not.exist(err);
				res.should.have.status(200);
				//should.not.exist(res.headers['set-cookie']);
				res.body.should.have.property('message', 'login success!');
				done();
			});
		});

		//Test get a list of users: GET-> /api/users
		it('should return 4 users for url ', function(done) {
			loginAgent
			.get(url + url_user_api)
			.end(function(err,res){
				should.not.exist(err);
				res.should.have.status(200);
				res.headers.should.have.property('access-control-allow-headers', 'Content-Type, X-Requested-With');
				res.headers.should.have.property('content-type', 'application/json; charset=utf-8');
				res.body.should.have.lengthOf(4);
				res.body[0].should.have.property('firstname', 'Dustin');
				if (err) return done(err);
				done();
			});
		});
		
		//Test get user by id: GET-> /api/users/52e9ce56977f8a8b113a09f9
		it('should be able to query user by id ', function(done) {
			loginAgent
			.get(url + url_user_api + '/52e9ce56977f8a8b113a09f9')
			.end(function(err,res){
				should.not.exist(err);
				res.should.have.status(200);
				res.headers.should.have.property('access-control-allow-headers', 'Content-Type, X-Requested-With');
				res.headers.should.have.property('content-type', 'application/json; charset=utf-8');
				res.body.should.have.property('firstname', 'Dustin');
				if (err) return done(err);
				done();
			});
		});
		
		// Test add user: POST -> /api/users
		it('should be able to add user ' + url_user_api, function(done) {
			
			var user = {
				"firstname" : "Bill",
				"lastname" : "Gates",
				"age" : 56
			};
			
			loginAgent
			.post(url + url_user_api)
			.send(user)
			.end(function(err,res){
				should.not.exist(err);
				res.should.have.status(200);
				res.headers.should.have.property('access-control-allow-headers', 'Content-Type, X-Requested-With');
				res.headers.should.have.property('content-type', 'application/json; charset=utf-8');
				res.body.should.have.property('firstname', 'Bill');
				if (err) return done(err);
				db.remove('user', {'firstname': "Bill"}, function(err, numberOfRemovedDocs) {
					should.not.exist(err);
					// console.log('delete %j user', numberOfRemovedDocs);
					done();
				});
			});


		});
		
		it('should be able to delete user ' + url_user_api, function(done) {
		
			var user = {
					"_id": new mongojs.ObjectId("52e9ce56977f8a8b113a09f9"),
					'password': '30274c47903bd1bac7633bbf09743149ebab805f',
					'email': 'dustin@demo.org',
					"firstname" : "Dustin",
					"lastname" : "Light",
					"age" : 35
				}
			
			loginAgent
			.del(url + url_user_api + '/52e9ce56977f8a8b113a09f9')
			.end(function(err,res){
				should.not.exist(err);
				res.should.have.status(200);
				res.headers.should.have.property('access-control-allow-headers', 'Content-Type, X-Requested-With');
				res.headers.should.have.property('content-type', 'application/json; charset=utf-8');
				res.body.should.be.true;
				//res.body.should.have.lengthOf(3);
				if (err) return done(err);
				db.save('user', user, function(err, numberOfRemovedDocs) {
					should.not.exist(err);
					// console.log('delete %j user', numberOfRemovedDocs);
					done();
				});
			});
		});
		
		it('should be able to logout', function(done) {
			loginAgent
			.get(url + '/api/logout')
			.end(function (err, res) {
				should.not.exist(err);
				res.should.have.status(200);
				res.body.should.have.property('message', 'logged out');
				done();
			});
		});
	});
	
	describe('Test get a list of users without login', function() {

		it('access list without login should return status code 401', function(done) {
			loginAgent
			.get(url + url_user_api)
			.end(function(err,res){
				should.not.exist(err);
				res.should.have.status(401);
				res.body.should.have.property('message', 'please login');
				if (err) return done(err);
				done();
			});
		});
		
		it('logout without login should return status code 401', function(done) {
			loginAgent
			.get(url + '/api/logout')
			.end(function (err, res) {
				should.not.exist(err);
				res.should.have.status(401);
				res.body.should.have.property('message', 'please login');
				done();
			});
		});
	});
});