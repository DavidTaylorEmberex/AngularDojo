dojo.controller("Controller", ["$scope", "Service", function($scope, Service) {
	var name = Service.getData().name;
	
	$scope.greeting = function() {
		console.log("updating");
		return "Hello, " + name + "! ("+$scope.username	+")";
	}
	$scope.doThings = function() {
		$scope.greeting;// = "Hello, " + $scope.username + "!";
		alert("Current radio selection: " + $scope.radioModel);
	};
}]);
