'use strict';

angular.module('app.addDvdPage', []).directive('appAddDvdPage', [function () {
    return {
        templateUrl: 'modules/add-dvd-page/add-dvd-page.html'
    };
}]).controller('AddDvdPageCtrl', ['$scope', '$http', '$location', '$window',
    function ($scope, $http, $location, $window) {
        $scope.baseUrl = new $window.URL($location.absUrl()).origin;

        $scope.showLoader = true;
        $scope.showLoadError = false;

        $scope.categoriesData = [];
        $scope.dvd = {};

        $scope.loadCategories = () => {
            $http({
                method: 'GET',
                url: $scope.baseUrl + '/dvd-rental-app/dvd/types',
            }).then(response => {
                $scope.categoriesData = response.data;
                $scope.dvd.typeId = $scope.categoriesData[0].id;
            }).catch(() => {
                $scope.showLoadError = true;
            }).finally(() => {
                $scope.showLoader = false;
            });
        }

        $scope.submitForm = () => {
            $http({
                method: 'POST',
                url: $scope.baseUrl + '/dvd-rental-app/dvd/create',
                data: $scope.dvd,
            }).then(() => {
                alert('Success!');
                $location.path("main");
            }).catch(() => {
                alert('Error was occurred!');
            });
        };

        $scope.loadCategories();
    }]);
