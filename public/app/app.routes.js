angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

    $routeProvider

        // home page route
        .when('/', {
            templateUrl: 'app/views/home.html'
        })

        .when('/auth/google/', {

        });

    $locationProvider.html5Mode(true);
});