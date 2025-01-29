app.controller('actorController', function($scope, movieService) {
    $scope.actorName = ''; 
    $scope.actorDetails = {}; 
    $scope.errorMessage = '';
    $scope.loading = false;

    // Function to search for an actor
    $scope.searchActor = function() {
        if (!$scope.actorName) {
            return;
        }

        $scope.loading = true;
        $scope.errorMessage = '';
        movieService.searchActor($scope.actorName)
            .then(function(response) {
                if (response && response.results && response.results.length > 0) {
                    const actor = response.results[0]; 
                    $scope.actorDetails = actor;
                    $scope.getActorMovies(actor.id); 
                } else {
                    $scope.errorMessage = 'No actor found with this name.';
                }
            })
            .finally(function() {
                $scope.loading = false;
            });
    };

    $scope.getActorMovies = function(actorId) {
        $scope.loading = true;
        movieService.getActorMovies(actorId)
            .then(function(response) {
                if (response && response.cast && response.cast.length > 0) {
                    $scope.actorMovies = response.cast;
                } else {
                    $scope.errorMessage = 'No movies found for this actor.';
                }
            })
            .finally(function() {
                $scope.loading = false;
            });
    };
});
