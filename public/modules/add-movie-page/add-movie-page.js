'use strict';

angular.module('app.addMoviePage', []).directive('appAddMoviePage', [function () {
    return {
        templateUrl: 'modules/add-movie-page/add-movie-page.html'
    };
}]).controller('AddMoviePageCtrl', ['$scope', '$http', '$location', '$window',
    function ($scope, $http, $location, $window) {
        $scope.movie = {};

        $scope.submitForm = () => {
            $http({
                method: 'POST',
                url: 'http://localhost:8081/add_movie',
                data: $scope.movie,
            }).then(() => {
                alert('Success!');
                $location.path("main");
            }).catch(() => {
                alert('Error was occurred!');
            });
        };
    }]);
