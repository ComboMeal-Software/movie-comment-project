'use strict';

angular.module('app.mainPage', []).directive('appMainPage', [function () {
    return {
        templateUrl: 'modules/main-page/main-page.html'
    };
}]).controller('MainPageCtrl', ['$scope', '$http', '$location', '$window',
    function ($scope, $http, $location, $window) {
        $scope.baseUrl = new $window.URL($location.absUrl()).origin;

        $scope.mode = 'dvd';
        $scope.searchText = '';

        $scope.showLoader = false;
        $scope.showLoadError = false;

        $scope.dvdData = [];
        $scope.clientData = null;

        $scope.loadData = () => {
            $scope.showLoader = true;

            if ($scope.mode === 'dvd') {
                $scope.loadDvds();
            } else {
                $scope.loadClient();
            }

            $scope.showLoader = false;
        }

        $scope.loadDvds = () => {
            $scope.dvdData = [];

            $http({
                method: 'GET',
                url: $scope.baseUrl + '/dvd-rental-app/dvd/find',
                params: {name: $scope.searchText},
            }).then(response => {
                $scope.dvdData = response.data;
            }).catch(() => {
                $scope.showLoadError = true;
            });
        }

        $scope.loadClient = () => {
            if (!$scope.searchText) return;

            $scope.clientData = null;

            $http({
                method: 'GET',
                url: $scope.baseUrl + '/dvd-rental-app/client/find',
                params: {telNumber: encodeURI($scope.searchText)},
            }).then(response => {
                $scope.clientData = response.data.data;
            }).catch(() => {
                $scope.showLoadError = true;
            });
        }

        $scope.rentDvd = (dvd) => {
            $http({
                method: 'POST',
                url: $scope.baseUrl + '/dvd-rental-app/rent/add',
                data: {dvdId: dvd.id, clientTelNumber: dvd.rentClient},
            }).then(() => {
                $scope.loadData();
            }).catch(() => {
                alert("Renting error occurred, operation wasn't finished!");
            });
        }

        $scope.returnDvd = (dvd) => {
            const {rentId} = dvd;
            if (!rentId) return;

            $http({
                method: 'POST',
                url: $scope.baseUrl + '/dvd-rental-app/rent/return',
                data: {rentId},
            }).then(() => {
                dvd.rentId = null;
            });
        }

        $scope.isNull = (el) => !el || el === 'null';

        $scope.loadData();
    }]);
