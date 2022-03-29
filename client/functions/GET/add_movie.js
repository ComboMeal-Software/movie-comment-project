const http = require("http");

module.exports = function (app, API) {
    app.get('/add_movie', async (req, res) => {
        const urls = [API.latestComments, API.getAllMovies];
        const responseNames = ["latestComments", "movies"];

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
                            let movie = responses.movies.find(m => m.imdbId === responses.latestComments[i].imdbId);
                            if (movie) {
                                responses.latestComments[i].title = movie.title;
                            } else {
                                responses.latestComments[i].title = "Unknown film";
                            }
                        }

                        const renderData = {...responses};

                        responses.movies = [];

                        res.render('addMovie', renderData);
                    }
                });
            });
        });
    });
}