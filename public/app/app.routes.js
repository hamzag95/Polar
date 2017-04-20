angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

    $routeProvider

        // home page route
        .when('/', {
            templateUrl: 'app/views/home.html'
        })

        .when('/auth/google/', {

        })

        .when('/random', {
            templateUrl: 'app/views/random.html'
        });

    $locationProvider.html5Mode(true);
});
