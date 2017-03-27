angular.module('mainCtrl', [])

.controller('mainController', ['$scope', '$http', '$rootScope', '$location', 'Note', function($scope, $http, $rootScope, $location, Note) {

    var vm = this;

    $scope.checkLoggedIn = false;

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

    vm.user = Note.getUser();

    //vm.allNotes = Note.getAllNotes(vm.user.id);
}]);
