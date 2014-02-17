'use strict';

demoApp.controller('UserCtrl', function ($scope, User) {
	$scope.users = User.query();

	$scope.selectUser = function(row) {
		$scope.selectedRow = row;
	};
	
});

demoApp.controller('EditUserCtrl', function($scope, $location, $routeParams, User ) {

	$scope.user = User.get({
		id : $routeParams.id
	});
});

demoApp.controller('LoginCtrl', function ($scope, $location, $cookieStore) {
	$scope.credentials = { username: "", password: ""};
	
	$scope.login = function() {
		
	};
});