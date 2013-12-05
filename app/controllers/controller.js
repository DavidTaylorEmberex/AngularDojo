dojo.controller("Controller", ["$scope", "Service", function($scope, Service) {
	var name = Service.getData().name;
	$scope.greeting = "Hello, " + name + "!";
	$scope.doThings = function() {
		$scope.greeting = "Hello, " + $scope.username + "!";
		alert("Current radio selection: " + $scope.radioModel);
	};
}]);
