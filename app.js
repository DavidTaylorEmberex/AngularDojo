var foo = angular.module('dojoApp', []);

foo.controller("dojoController", function($scope, SaveService) {
	$scope.submitForm = function() {
		if ($scope.userform.$valid) {
			SaveService.saveUser($scope.user);
			$scope.user = {};
			$scope.userform.$setPristine();
		} else {
			alert("Fix your invalid input, dude.");
		}
	};

	$scope.getPeople = function() {
		return SaveService.getAllUsers();
	};
});

foo.factory('SaveService', function() {
	var data = {};
	return {
		saveUser: function(user) {
			data[user.name] = user;
		},
		getUser: function(name) {
			return data[name];
		},
		getAllUsers: function() {
			return data;
		}
	};
});

foo.directive("notMichael", function() {
	return {
		require: "ngModel",
		link: function(scope, element, attrs, controller) {
			scope.$watch(attrs.ngModel, function() {
				if (scope.user && scope.user.name && scope.user.name.match(/[Mm]i(ke|chael)/)) {
					controller.$setValidity('notMichael', false);
				} else {
					controller.$setValidity('notMichael', true);
				}
			});
		}
	}
});

foo.directive("dojoListItem", function() {
	return {
		restrict: 'E',
		replace: true,
		template: "<li>{{person}}</li>",
		link: function(scope, element) {
		}
	};
});
