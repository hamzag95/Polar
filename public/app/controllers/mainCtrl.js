angular.module('mainCtrl', [])

.controller('mainController', ['$scope', '$http', '$rootScope', '$location', 'Note', function($scope, $http, $rootScope, $location, Note) {

    var vm = this;

    $scope.checkLoggedIn = function() {
        $http.get('/auth/loggedin/').then(function(data) {
            $scope.data = data;
        });
    };

    $scope.$watch('data', function() {
        console.log($scope.data);
    });

    var testFunction = function() {
        $http.get('/auth/loggedin/').then(function(data) {
            var loginState = data['data']['loggedIn'];
            console.log(loginState);
            if (loginState) {
                return true;
            } else {
                return false;
            }
        });
    };

    vm.loggedIn = testFunction(); 

    vm.user = Note.getUser();

    //vm.allNotes = Note.getAllNotes(vm.user.id);
}]);
