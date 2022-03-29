'use strict';

// Import all required AngularJS modules
angular.module('app', [
    'ngRoute',
    'app.header',
    'app.latestComments',
    'app.mainPage',
    'app.moviePage',
    'app.addMoviePage',
]).config(function ($routeProvider) {
    // Configure all routes
    $routeProvider
        .when("/main", {templateUrl: "modules/main-page/main-page.html"})
        .when("/movie/:id", {templateUrl: "modules/movie-page/movie-page.html"}) // :id is unique for each movie
        .when("/add-movie", {templateUrl: "modules/add-movie-page/add-movie-page.html"})
        .otherwise(({redirectTo: '/main'})) // In case of unknown URL will be performed path redirect to /main
});
