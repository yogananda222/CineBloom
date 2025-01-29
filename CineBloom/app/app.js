var app = angular.module('MovieApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html', 
            controller: 'mainController'
        })
        .when('/top-rated', {
            templateUrl: 'app/views/topRatedMovies.html',
            controller: 'topRatedMoviesController'
        })
        .when('/movie/:movieName', {
            templateUrl: 'app/views/movie-details.html',
            controller: 'movieDetailsController'
        })
        .when('/top-rated/:movieName', {
            templateUrl: 'app/views/topRatedMovieDetails.html',
            controller: 'topRatedMovieDetailsController'
        })
        .when('/RecentlyAddedMovies', {
            templateUrl: 'app/views/recentlyAddedMovies.html',
            controller:'recentlyAddedMoviesController'
        })
        .when('/RecentlyAddedMovies/:movieName', {
            templateUrl: 'app/views/recentlyAddedMovieDetails.html',
            controller: 'recentlyAddedMovieDetailsController'
        })
        .when('/actor', {
            templateUrl: 'app/views/actor.html',
            controller:'actorController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
});
