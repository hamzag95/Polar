angular.module('noteService', [])

.factory('Note', function($http) {

    // create a new object
    var noteFactory = {};

    noteFactory.isLoggedIn = function() {
        $http.get('/auth/loggedin/').then(function(data) {
            return true;
        });
    };

    noteFactory.getUser = function() {
        return $http.get('/api/users/');
    };

    // get all of a user's notes
    noteFactory.getAllNotes = function(userId) {
        return $http.get('/api/users/' + userId + '/notes/');
    };

    // get a single note
    noteFactory.getSingleNote = function(userId, noteId) {
        return $http.get('/api/users/' + userId + '/notes/' + noteId);
    };

    noteFactory.create = function(userId, noteData) {
        return $http.post('/api/users/' + userId + '/notes/', noteData);
    };

    return noteFactory;
});
