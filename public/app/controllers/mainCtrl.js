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
        $http.put('/api/users/' + $scope.user.id + '/notes/' + $scope.currentNote._id,
        { title: $scope.currentNote.title, markdownBody: $scope.currentNote.markdownBody }).then(
            function(data) {
                for (i = 0; i < $scope.allNotes.length; i++) {

                    if ($scope.allNotes[i]._id == $scope.currentNote._id) {
                        $scope.allNotes[i].title = data['data']['newTitle'];
                        $scope.allNotes[i].markdownBody = data['data']['newBody'];
                    }

                    //console.log($scope.allNotes[i].title);
                }
            }, function(err) {
                console.log(err);
            });

        //$scope.$apply();

        //getNotes();

    };

    var debounceSaveUpdates = function(newVal, oldVal) {
        if (newVal != oldVal) {
            if (timeout) {
                $timeout.cancel(timeout)
            }

            timeout = $timeout(saveUpdates, 750);
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

    $scope.newNote = function() {
        $http.post('/api/users/' + $scope.user.id + '/notes/', { title: "New Note", markdownBody: "", user_id: $scope.user.id }).then(
            function(data) {
                $scope.currentNote.title = data['data']['title'];
                $scope.currentNote._id = data['data']['_id'];
                $scope.currentNote.author = data['data']['author'];
                $scope.currentNote.markdownBody = data['data']['markdownBody'];

                $scope.noteSelected = true;
                $scope.allNotes.push(data['data']);
                //$scope.selectNote(data['data']);
            }
        );
    };

    //vm.allNotes = Note.getAllNotes(vm.user.id);
}]);
