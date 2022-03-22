'use strict';

angular.module('app.addClientPage', []).directive('appAddClientPage', [function () {
    return {
        templateUrl: 'modules/add-client-page/add-client-page.html'
    };
}]).controller('AddClientPageCtrl', ['$scope', '$http', '$location', '$window',
    function ($scope, $http, $location, $window) {
        $scope.baseUrl = new $window.URL($location.absUrl()).origin;

        $scope.client = {};

        $scope.submitForm = () => {
            $http({
                method: 'POST',
                url: $scope.baseUrl + '/dvd-rental-app/client/create',
                data: $scope.client,
            }).then(() => {
                alert('Success!');
                $location.path("main");
            }).catch(() => {
                alert('Error was occurred!');
            });
        };
    }]
);
