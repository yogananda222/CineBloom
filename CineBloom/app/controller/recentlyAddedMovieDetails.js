app.controller('recentlyAddedMovieDetailsController', function ($scope, $routeParams, movieService) {
    var movieName = $routeParams.movieName.replace(/-/g, ' '); 
    $scope.loading = true;

    $scope.isNavOpen = false;


    $scope.toggleNav = function() {
        $scope.isNavOpen = !$scope.isNavOpen;
    };

    // Function to get upcoming movie details by title
    $scope.fetchRecentMovieDetails = function (movieName) {
        movieService.recentMovies(1).then(function (data) {
            if (data && data.results) {
                var movie = data.results.find(function (movie) {
                    return movie.title.toLowerCase() === movieName.toLowerCase(); 
                });
                if (movie) {
                    $scope.movie = movie;
                } else {
                    console.error('Movie not found');
                }
            }
            $scope.loading = false;
        });
    };

    $scope.fetchRecentMovieDetails(movieName);
});
