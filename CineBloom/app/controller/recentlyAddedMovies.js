app.controller('recentlyAddedMoviesController', function ($scope, movieService, $location) {
    $scope.recentMovies = [];
    $scope.currentPage = 1;
    $scope.loading = true;


    $scope.isNavOpen = false;


    $scope.toggleNav = function() {
        $scope.isNavOpen = !$scope.isNavOpen;
    };


    $scope.fetchRecentMovies = function (page) {
        $scope.loading = true;
        movieService.recentMovies(page).then(function (data) {
            if (data && data.results) {
                $scope.recentMovies = data.results;
            } else {
                console.error('No upcoming movie data received');
            }
            $scope.loading = false;
        });
    };

    $scope.goToDetails = function (movieTitle) {
        var formattedTitle = movieTitle.replace(/\s+/g, '-').toLowerCase(); 
        $location.path('/RecentlyAddedMovies/' + formattedTitle);
    };

    $scope.nextPage = function () {
        $scope.currentPage++;
        $scope.fetchRecentMovies($scope.currentPage);
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.fetchRecentMovies($scope.currentPage);
        }
    };

    $scope.fetchRecentMovies($scope.currentPage);
});
