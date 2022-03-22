'use strict';

angular.module('app.moviePage', []).directive('appMoviePage', [function () {
    return {
        templateUrl: 'modules/movie-page/movie-page.html'
    };
}]).controller('MoviePageCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        $scope.showLoader = false;
        $scope.showLoadError = false;

        $scope.showCommentsLoader = false;
        $scope.showCommentsLoadError = false;
        $scope.showThankYou = false;

        $scope.movieData = null;
        $scope.commentsData = [];
        $scope.newComment = { imdbId: $routeParams.id, language: 'ENG' };

        $scope.loadMovieData = () => {
            $scope.showLoader = true;

            $http({
                method: 'GET',
                url: `http://localhost:8081/movie?imdbId=${$routeParams.id}`,
            }).then(response => {
                $scope.movieData = response.data[0];
            }).catch(() => {
                $scope.showLoadError = true;
            }).finally(() => {
                $scope.showLoader = false;
            });
        }

        $scope.loadCommentsData = () => {
            $scope.showCommentsLoader = true;

            $http({
                method: 'GET',
                url: `http://localhost:8081/movie_comments?imdbId=${$routeParams.id}`,
            }).then(response => {
                $scope.commentsData = response.data;
            }).catch(() => {
                $scope.showCommentsLoadError = true;
            }).finally(() => {
                $scope.showCommentsLoader = false;
            });
        }

        $scope.submitForm = () => {
            $http({
                method: 'POST',
                url: 'http://localhost:8081/add_comment',
                data: $scope.newComment,
            }).then(() => {
                $scope.loadCommentsData();
                $scope.showThankYou = true;
            }).catch(() => {
                alert('Error was occurred!');
            });
        };

        $scope.loadMovieData();
        $scope.loadCommentsData();
    }]);
