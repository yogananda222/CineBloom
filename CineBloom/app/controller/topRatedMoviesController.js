app.controller('topRatedMoviesController', function ($scope, movieService, $location) {
    $scope.topRatedMovies = [];
    $scope.currentPage = 1;
    $scope.loading = true;


    $scope.isNavOpen = false;


    $scope.toggleNav = function() {
        $scope.isNavOpen = !$scope.isNavOpen;
    };


    $scope.fetchTopRatedMovies = function (page) {
        $scope.loading = true;
        movieService.getTopRatedMovies(page).then(function (data) {
            if (data && data.results) {
                $scope.topRatedMovies = data.results;
            } else {
                console.error('No top-rated movie data received');
            }
            $scope.loading = false;
        });
    };

    $scope.goToDetails = function (movieTitle) {
        var formattedTitle = movieTitle.replace(/\s+/g, '-').toLowerCase(); 
        $location.path('/top-rated/' + formattedTitle); 
    };

    $scope.nextPage = function () {
        $scope.currentPage++;
        $scope.fetchTopRatedMovies($scope.currentPage);
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.fetchTopRatedMovies($scope.currentPage);
        }
    };
    
    $scope.fetchTopRatedMovies($scope.currentPage);
});
