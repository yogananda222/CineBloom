app.controller('mainController', function ($scope, $location, movieService) {


    $scope.isNavOpen = false;


    $scope.movies = [];
    $scope.currentPage = 1;
    $scope.searchTerm = '';
    $scope.loading = true;
    $scope.genreMovies = [];
    $scope.selectedGenre = null;
    $scope.selectedGenreName = '';
    $scope.searchResults = [];
    $scope.viewState = 'movies'; // Possible values: 'movies', 'search', 'genre'

    $scope.genres = {
        28: 'Action',
        35: 'Comedy',
        18: 'Drama',
        10749: 'Romance',
        27: 'Horror',
        878: 'Science Fiction',
        16: 'Animation',
        53: 'Thriller',
        12: 'Adventure'
    };


    $scope.toggleNav = function() {
        $scope.isNavOpen = !$scope.isNavOpen;
    };

    $scope.fetchMovies = function (page) {
        $scope.loading = true;
        $scope.viewState = 'movies';
        movieService.getMovies(page).then(function (data) {
            if (data && data.results) {
                $scope.movies = data.results;
            } else {
                console.error('No movie data received');
            }
            $scope.loading = false;
        });
    };

    $scope.searchMovies = function () {
        if ($scope.searchTerm) {
            $scope.loading = true;
            $scope.viewState = 'search';
            movieService.searchMovies($scope.searchTerm).then(function (data) {
                if (data && data.results) {
                    $scope.searchResults = data.results;
                } else {
                    console.error('No search results found');
                    $scope.searchResults = [];
                }
                $scope.loading = false;
            }).catch(error => {
                console.error('Error searching movies:', error);
                $scope.searchResults = [];
                $scope.loading = false;
            });
        }
    };

    $scope.fetchMoviesByGenre = function () {
        if ($scope.selectedGenre) {
            const genreId = $scope.selectedGenre;
            $scope.selectedGenreName = $scope.genres[genreId];
            $scope.loading = true;
            $scope.viewState = 'genre';

            movieService.getMoviesByGenre(genreId).then(function (data) {
                if (data && data.results) {
                    $scope.genreMovies = data.results.map(movie => ({
                        name: movie.name || movie.title || 'Untitled',
                        overview: movie.overview || 'No description available.',
                        poster_path: movie.poster_path
                    }));
                } else {
                    console.error('No genre movie data received');
                    $scope.genreMovies = [];
                }
                $scope.loading = false;
            }).catch(error => {
                console.error('Error fetching movies by genre:', error);
                $scope.genreMovies = [];
                $scope.loading = false;
            });
        }
    };

    $scope.goToDetails = function (movieTitle) {
        var formattedTitle = movieTitle.replace(/\s+/g, '-').toLowerCase();
        $location.path('/movie/' + formattedTitle);
    };

    $scope.nextPage = function () {
        $scope.currentPage++;
        $scope.fetchMovies($scope.currentPage);
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.fetchMovies($scope.currentPage);
        }
    };

    // Fetch the first page on initialization
    $scope.fetchMovies($scope.currentPage);
});
