'use strict';

angular.module('app.latestComments', []).directive('appLatestComments', [function () {
    return {
        templateUrl: 'modules/latest-comments/latest-comments.html'
    };
}]).controller('LatestCommentsCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.showLoader = false;
        $scope.showLoadError = false;

        $scope.commentsData = [];

        $scope.loadData = () => {
            $scope.showLoader = true;

            $http({
                method: 'GET',
                url: 'http://localhost:8081/latest_comments?limit=3',
            }).then(response => {
                $scope.commentsData = response.data;
                $scope.enrichDataWithMovieNames();
            }).catch(() => {
                $scope.showLoadError = true;
            }).finally(() => {
                $scope.showLoader = false;
            });
        }

        $scope.enrichDataWithMovieNames = () => {
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

        $scope.loadData();
    }]);
