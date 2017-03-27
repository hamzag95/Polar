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

    vm.loggedIn = function() {
        return $http.get('/auth/loggedin/').then(function(data) {
            if (data['loggedIn'] == true) {
                return true;
            } else {
                return false;
            }
        });
    };

    vm.user = Note.getUser();

    //vm.allNotes = Note.getAllNotes(vm.user.id);
}]);
