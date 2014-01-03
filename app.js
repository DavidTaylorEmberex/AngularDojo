(function() {
    if (!String.format) {
        String.format = function (format) {
            var args = Array.prototype.slice.call(arguments, 1);
            var sprintfRegex = /\{(\d+)\}/g;
            var sprintf = function (match, number) {
                return number in args ? args[number] : match;
            };
            return format.replace(sprintfRegex, sprintf);
        };
    }

    var foo = angular.module('dojoApp', []);

    foo.controller("dojoController", function($scope, SaveService) {
        function reset() {
            $scope.user = {
                name: "",
                email: "",
                gender: ""
            };
            if ($scope.userform) {
                $scope.userform.$setPristine();
            }
            $scope.people = getPeople();
        }
        
        $scope.submitForm = function() {
            if ($scope.userform.$valid) {
                SaveService.saveUser($scope.user);
                reset();
            } else {
                alert("Fix your missing input, dude.");
            }
        };
        
        $scope.killPeople = function() {
            SaveService.clearUsers();
            reset();
        };

        function getPeople() {
            return SaveService.getAllUsers();
        }
        
        reset();
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
            },
            clearUsers: function() {
                data = {};
            }
        };
    });

    foo.directive("genderOptions", ["$compile", function($compile) {
        var genders = ["Male", "Female"];
        return {
            restrict: "E",
            templateUrl: "template.html",
            replace: true,
            controller: "dojoController",
            compile: function(element, attributes) {
                var optionString = '<div ng-repeat="gender in foo"><input type="radio" id="{{gender}}" value="{{gender}}" name="gender" ng-model="user.gender"/><label for="{{gender}}">{{gender}}</label><br/></div>';
                var radioOption = angular.element(optionString);
                element.prepend(radioOption);
                
                return {
                    pre: function(scopePre, elementPre, attrsPre) {
                        scopePre.foo = genders;
                        scopePre.$watch(function() {
                            return scopePre.user.name;
                        }, function() {
                            scopePre.name = scopePre.user.name;
                        });
                        genders.push("Other");
                    },
                    
                    post: function(scopePost, elementPost, attrsPost) {
                        scopePost.$watch(function() {
                            return scopePost.user.gender;
                        }, function() {
                            scopePost.gender = scopePost.user.gender;
                        });
                        genders.push("Undisclosed");
                    }
                };
            }
        };
    }]);
}());
