'use strict';

angular.module('app', [
    'ngRoute',
    'app.header',
    'app.latestComments',
    'app.mainPage',
    'app.moviePage',
    'app.addMoviePage',
]).config(function ($routeProvider) {
    $routeProvider
        .when("/main", {templateUrl: "modules/main-page/main-page.html"})
        .when("/movie/:id", {templateUrl: "modules/movie-page/movie-page.html"})
        .when("/add-movie", {templateUrl: "modules/add-movie-page/add-movie-page.html"})
        .otherwise(({redirectTo: '/main'}))
});
