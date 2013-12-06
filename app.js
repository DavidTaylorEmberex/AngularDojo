var foo = angular.module('dojoApp', []);

foo.controller("dojoController", function($scope, SaveService) {

	$scope.name = "Hello!";

	$scope.validateName=function(){
		if($scope.name == "casey"){
			alert('valid!');
		}
	};
	
	$scope.saveStuff = function(thing) {
		SaveService.saveStuff(thing);
	}
	
});

foo.factory('SaveService', function() {
	var datas = [];
	
	return {
		saveStuff: function(thing) {
			datas.push(thing);
			console.log('datas: ', datas);
		}
	}

});