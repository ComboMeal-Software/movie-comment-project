'use strict';

angular.module('app.mainPage', []).directive('appMainPage', [function () {
    return {
        templateUrl: 'modules/main-page/main-page.html'
    };
}]).controller('MainPageCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.showLoader = false;
        $scope.showLoadError = false;

        $scope.moviesData = [];

        $scope.loadData = () => {
            $scope.showLoader = true;

            $http({
                method: 'GET',
                url: 'http://localhost:8081/movies',
            }).then(response => {
                $scope.moviesData = response.data;
            }).catch(() => {
                $scope.showLoadError = true;
            }).finally(() => {
                $scope.showLoader = false;
            });
        }

        $scope.loadData();
    }]);
