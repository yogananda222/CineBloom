app.service('movieService', function ($http) {

    const topRatedMoviesUrl = 'https://api.themoviedb.org/3/'
    const MoviesURL = 'https://api.themoviedb.org/3/discover/movie';
    const searchUrl= 'https://api.themoviedb.org/3/search/'
    const recentMovies = 'https://api.themoviedb.org/3/movie'
    const genreMovies = "https://api.themoviedb.org/3"
    const APIKEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s';

    this.getMovies = function (page) {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: APIKEY
            }
        };

        return $http.get(`${MoviesURL}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching movies:', error);
                return null;
            });
    };

    this.getTopRatedMovies = function (page) {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: APIKEY
            }
        };

        return $http.get(`${topRatedMoviesUrl}/movie/top_rated?language=en-US&page=${page}`, options)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching top-rated movies:', error);
                return null;
            });
    };
    
    this.searchMovies = function (query, page = 1) {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: APIKEY
            }
        };

        return $http.get(`${searchUrl}movie?include_adult=false&language=en-US&page=${page}&query=${encodeURIComponent(query)}`, options)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error searching for movies with query "${query}":`, error);
                return null;
            });
    };

    this.searchActor = function (query, page = 1) {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: APIKEY
            }
        };

        return $http.get(`${searchUrl}person?include_adult=false&language=en-US&page=${page}&query=${encodeURIComponent(query)}`, options)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error searching for actor "${query}":`, error);
                return null;
            });
    };

    this.getActorMovies = function (actorId, page = 1) {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: APIKEY
            }
        };

        return $http.get(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?language=en-US&page=${page}`, options)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching movies for actor with ID ${actorId}:`, error);
                return null;
            });
    };


    this.recentMovies = function (page) {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: APIKEY
            }
        };

        return $http.get(`${recentMovies}/upcoming?language=en-US&page=${page}`, options)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in fetching upcoming movies:', error);
                return null;
            });
    };

    this.getMoviesByGenre = function (genreId, page = 1) {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: APIKEY
            }
        };

        return $http
            .get(`${genreMovies}/discover/movie?with_genres=${genreId}&include_adult=false&language=en-US&page=${page}`, options)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching movies for genre ID ${genreId}:`, error);
                return null;
            });
    };
    

});

