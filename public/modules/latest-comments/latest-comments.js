'use strict';

angular.module('app.latestComments', []).directive('appLatestComments', [function () {
    return {
        templateUrl: 'modules/latest-comments/latest-comments.html'
    };
}]).controller('LatestCommentsCtrl', ['$scope', '$http',
    function ($scope, $http) {
        // Loader and error message display flags
        $scope.showLoader = false;
        $scope.showLoadError = false;

        $scope.commentsData = [];

        $scope.loadData = () => {
            // Show loader on loading start
            $scope.showLoader = true;

            $http({
                method: 'GET',
                url: 'http://localhost:8081/latest_comments?limit=3',
            }).then(response => {
                // Populate received data
                $scope.commentsData = response.data;
                $scope.enrichDataWithMovieNames();
            }).catch(() => {
                // Show error on loading failure
                $scope.showLoadError = true;
            }).finally(() => {
                // Hide loader on any result
                $scope.showLoader = false;
            });
        }

        $scope.enrichDataWithMovieNames = () => {
            // Each comment doesn't have movie name initially.
            // Movie names are loaded and populated for each comment separately.
            $scope.commentsData.map((comment, index) => $http({
                method: 'GET',
                url: `http://localhost:8081/movie?imdbId=${comment.imdbId}`,
            }).then(response => {
                $scope.commentsData[index] = {
                    ...comment,
                    movieTitle: response.data[0]?.title,
                };
            }));
        }

        // Start data loading on app starting
        $scope.loadData();
    }]);
