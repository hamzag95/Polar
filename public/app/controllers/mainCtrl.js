angular.module('mainCtrl', [])

.controller('mainController', ['$scope', '$http', '$rootScope', '$location', 'Note', function($scope, $http, $rootScope, $location, Note) {

    var vm = this;

    $scope.checkLoggedIn = false;
    $scope.allNotes = [];
    $scope.user = {};

    var testFunction = function() {
        $http.get('/auth/loggedin/').then(function(data) {
            var loginState = data['data']['loggedIn'];
            console.log(loginState);
            if (loginState) {
                $scope.checkLoggedIn = true;
                return true;
            } else {
                $scope.checkLoggedIn = false;
                return false;
            }
        });
    };

    vm.loggedIn = testFunction();

    var getUser = function() {
        $http.get('/api/users').then(function(data) {
            $scope.user = data['data'];
        })
    };

    vm.getUser = getUser();

    var getNotes = function() {
        $http.get('/api/users').then(function(data) {
            var id = data['data']['id'];

            $http.get('/api/users/' + id + "/notes").then(function(data) {
                $scope.allNotes = data['data'];
                return data['data'];
            });
        });
    };

    vm.getNotes = getNotes();

    //vm.allNotes = Note.getAllNotes(vm.user.id);
}]);
