angular.module('mainCtrl', [])

.controller('mainController', ['$scope', '$http', '$rootScope', '$location', '$timeout', 'Note', function($scope, $http, $rootScope, $location, $timeout, Note) {

    var vm = this;

    $scope.checkLoggedIn = false;
    $scope.allNotes = [];
    $scope.user = {};
    $scope.currentNote = {};
    $scope.noteSelected = false;
    var timeout = null;

    var saveUpdates = function() {
        console.log("saveUpdates");
        $http.put('/api/users/' + $scope.user.id + '/notes/' + $scope.currentNote._id,
        { title: $scope.currentNote.title, markdownBody: $scope.currentNote.markdownBody }).then(function(data) {console.log("success")}, function(err) { console.log(err); });

        getNotes();

        /*
        for (i = 0; i < $scope.allNotes.length; i++) {
            if ($scope.allNotes[i]._id == $scope.currentNote._id) {
                $scope.allNotes[i].title = $scope.currentNote.title;
            }
        }
        */
    };

    var debounceSaveUpdates = function(newVal, oldVal) {
        if (newVal != oldVal) {
            if (timeout) {
                $timeout.cancel(timeout)
            }

            timeout = $timeout(saveUpdates, 10000);
        }
    };

    $scope.$watch('currentNote.markdownBody', debounceSaveUpdates);
    $scope.$watch('currentNote.title', debounceSaveUpdates);

    $scope.selectNote = function(note) {
        $scope.currentNote.title = note.title;
        $scope.currentNote._id = note._id;
        $scope.currentNote.author = note.author;
        $scope.currentNote.markdownBody = note.markdownBody;

        $scope.noteSelected = true;
    };

    var testFunction = function() {
        $http.get('/auth/loggedin/').then(function(data) {
            var loginState = data['data']['loggedIn'];
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

                //return data['data'];
            });
        });
    };

    vm.getNotes = getNotes();

    //vm.allNotes = Note.getAllNotes(vm.user.id);
}]);
