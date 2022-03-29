const http = require('http');

module.exports = function (app, API) {
    app.get('/movie', async (req, res) => {
        const urls = [API.latestComments, API.getMovie(req.query.imdbId), API.movieComments, API.getAllMovies];
        const responseNames = ["latestComments", "movie", "movieComments", "movies"];

        const responses = {};

        let completed_requests = 0;

        urls.forEach(function (url, index) {
            http.get(url, function (response) {
                response.on('data', function (chunk) {
                    responses[responseNames[index]] = JSON.parse(chunk.toString());
                });

                response.on('end', function () {
                    if (completed_requests++ === urls.length - 1) {
                        for (let i = 0; i < responses.latestComments.length; i++) {
                            console.log();
                            let movie = responses.movies.find(m => m.imdbId === responses.latestComments[i].imdbId);
                            if (movie) {
                                responses.latestComments[i].title = movie.title;
                            } else {
                                responses.latestComments[i].title = "Unknown film";
                            }
                        }

                        responses.movies = [];

                        const renderData = {...responses};

                        res.render('movie', renderData);
                    }
                });
            });
        });
    });
}