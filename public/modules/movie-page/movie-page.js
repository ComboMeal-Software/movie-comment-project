'use strict';

angular.module('app.moviePage', []).directive('appMoviePage', [function () {
    return {
        templateUrl: 'modules/movie-page/movie-page.html'
    };
}]).controller('MoviePageCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        // Loader and error message display flags for movie info
        $scope.showLoader = false;
        $scope.showLoadError = false;

        // Loader and error message display flags for movie comments
        $scope.showCommentsLoader = false;
        $scope.showCommentsLoadError = false;

        // Flag for replacing comment adding form with "Thank you" message
        $scope.showThankYou = false;

        $scope.movieData = null;
        $scope.commentsData = [];
        // Object for new comment, filled inputs will be added as its properties.
        // Some fields (movie ID and language) are predefined as already known and constant.
        $scope.newComment = { imdbId: $routeParams.id, language: 'ENG' };

        $scope.loadMovieData = () => {
            // Show loader on loading start
            $scope.showLoader = true;

            $http({
                method: 'GET',
                url: `http://localhost:8081/movie?imdbId=${$routeParams.id}`,
            }).then(response => {
                // Populate received data (first and only received movie)
                $scope.movieData = response.data[0];
            }).catch(() => {

                $scope.showLoadError = true;
            }).finally(() => {
                // Hide loader on any result
                $scope.showLoader = false;
            });
        }

        $scope.loadCommentsData = () => {
            // Show loader on loading start
            $scope.showCommentsLoader = true;

            $http({
                method: 'GET',
                url: `http://localhost:8081/movie_comments?imdbId=${$routeParams.id}`,
            }).then(response => {
                // Populate received data (first and only received movie)
                $scope.commentsData = response.data;
            }).catch(() => {
                // Show error on loading failure
                $scope.showCommentsLoadError = true;
            }).finally(() => {
                // Hide loader on any result
                $scope.showCommentsLoader = false;
            });
        }

        // POST for new comment adding. newComment object is passed as data
        $scope.submitForm = () => {
            $http({
                method: 'POST',
                url: 'http://localhost:8081/add_comment',
                data: $scope.newComment,
            }).then(() => {
                // Reload comments section and replace form with "Thank you" message
                $scope.loadCommentsData();
                $scope.showThankYou = true;
            }).catch(() => {
                // Show error on comment adding failure
                alert('Error was occurred!');
            });
        };

        // Load movie and its comment data on page opening
        $scope.loadMovieData();
        $scope.loadCommentsData();
    }]);
