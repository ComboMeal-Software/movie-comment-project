'use strict';

angular.module('app.mainPage', []).directive('appMainPage', [function () {
    return {
        templateUrl: 'modules/main-page/main-page.html'
    };
}]).controller('MainPageCtrl', ['$scope', '$http',
    function ($scope, $http) {
        // Loader and error message display flags
        $scope.showLoader = false;
        $scope.showLoadError = false;

        $scope.moviesData = [];

        $scope.loadData = () => {
            $scope.showLoader = true;

            $http({
                method: 'GET',
                url: 'http://localhost:8081/movies',
            }).then(response => {
                // Populate received data
                $scope.moviesData = response.data;
            }).catch(() => {
                // Show error on loading failure
                $scope.showLoadError = true;
            }).finally(() => {
                // Hide loader on any result
                $scope.showLoader = false;
            });
        }

        $scope.loadData();
    }]);
