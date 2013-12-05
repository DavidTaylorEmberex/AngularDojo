dojo.factory("Service", [function() {
	var data = {
		name: "World"
	};

	return {
		getData: function() {
			return data;
		}
	};
}]);
