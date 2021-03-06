angular.module('mainCtrl', [])

.controller('mainController', ['$scope', '$http', '$rootScope', '$location', '$timeout', 'Note', function($scope, $http, $rootScope, $location, $timeout, Note) {

    var vm = this;

    $scope.checkLoggedIn = false;
    $scope.allNotes = [];
    $scope.user = {};
    $scope.currentNote = {};
    $scope.noteSelected = false;
    var timeout = null;

    String.prototype.replaceAll = function (find, replace) {
            var str = this;
            return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    };

    var replace = function(term, definition) {
        console.log(term);
        $scope.currentNote.markdownBody = $scope.currentNote.markdownBody.replaceAll(term, term.substring(1, term.length - 1) + "—" + definition);
    }


    var define = function(term) {
        var word = term.substring(1, term.length - 1);
        word.replace(/\ /g, '%20');

        url = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/"+word+"?key=730039c6-8572-4885-a778-43fd75c70e5e";
        $.get(url, function(data) {
            var textContent = "";
            var definition = data.getElementsByTagName('dt')[0]
            if (definition != undefined)
                textContent = definition.textContent;
            console.log(textContent);
            replace(term, textContent);
        })
    }

    var saveUpdates = function() {
        if ($scope.noteSelected == false) { return; }

        var splitDefinitions = $scope.currentNote.markdownBody.split('?');
        var toDefine = $scope.currentNote.markdownBody.match(/\?.+\?/g);
        console.log(toDefine);

        if (toDefine != null && toDefine.length > 0)
            for (var i = 0; i < toDefine.length; i++) {
                var word = toDefine[i];

                console.log(word);
                define(word);
            }

        setTimeout(function(){
                console.log('after');
        },5000);
        var splitString = $scope.currentNote.markdownBody.split('\n');
        //console.log(splitString);

        var hasNumber = /\d/;

        for (var i = 0; i < splitString.length; i++) {
            if (splitString[i].substring(0, 1) == '=') {
                var total = 0;
                for (var j = i - 1; j >= 0; j--) {
                    if (!hasNumber.test(splitString[j])) {
                        break;
                    }
                    total += parseFloat(splitString[j].match(/\d+(\.\d+)?|\.\d/g)[0]);
                }

                if (total != 0) {
                    splitString[i] = "= " + total;
                }
                console.log(splitString[i]);
            }
        }

        $scope.currentNote.markdownBody = splitString.join('\n');

        $http.put('/api/users/' + $scope.user.id + '/notes/' + $scope.currentNote._id,
        { title: $scope.currentNote.title, markdownBody: $scope.currentNote.markdownBody }).then(
            function(data) {
                for (i = 0; i < $scope.allNotes.length; i++) {

                    if ($scope.allNotes[i]._id == $scope.currentNote._id) {
                        $scope.allNotes[i].title = data['data']['newTitle'];
                        $scope.allNotes[i].markdownBody = data['data']['newBody'];

                        // comment

                    }
                }
            }, function(err) {
                console.log(err);
            });

    };

    var debounceSaveUpdates = function(newVal, oldVal) {
        if (newVal != oldVal) {
            if (timeout) {
                $timeout.cancel(timeout)
            }

            timeout = $timeout(saveUpdates, 250);
        }
    };

    $scope.$watch('currentNote.markdownBody', saveUpdates);
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
        $http.post('/api/users/' + $scope.user.id + '/notes/', { title: "New Note", markdownBody: "Body", user_id: $scope.user.id }).then(
            function(data) {
                console.log(data);
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



    $scope.deleteNote = function () {
        if($scope.noteSelected == false) return;
        $http.delete('api/users/' + $scope.user.id + '/notes/' +  $scope.currentNote._id).then(
            function(response) {

                $scope.noteSelected = false;

                var index = findNote($scope.currentNote._id);

                console.log("index : " + index);
                $scope.allNotes.splice(index, 1);
            });
       console.log($scope.currentNote);
   }

   var findNote = function(noteId) {
       for (i = 0; i < $scope.allNotes.length; i++) {
           if ($scope.allNotes[i]._id == noteId) {
               return i;
           }
       }

       return -1;
   }

   $scope.randomVal = 0;

   $scope.generate = function() {
       var range = parseInt($scope.range);
       $scope.randomVal = Math.floor(Math.random() * (range/2)) + 1;
   }


    //vm.allNotes = Note.getAllNotes(vm.user.id);
}]);
