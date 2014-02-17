'use strict';

var api_url_root = 'http://localhost:3000';

demoApp.factory('User', function($resource) {
	//var tokenid = SessionService.get('tid');
	return $resource(api_url_root + '/api/users/:id', {id: '@id'}, {
		update: {method:'PUT'}
	});
});

