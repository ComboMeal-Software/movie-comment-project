const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const request = require('request')
const app = express();

const API = {
    addComment: 'http://localhost:8081/add_comment',
    latestComments: 'http://localhost:8081/latest_comments?limit=3',
    movieComments: (filmId) => 'http://localhost:8081/movie_comments?imdbId=' + filmId,
    addMovie: 'http://localhost:8081/add_movie',
    getAllMovies: 'http://localhost:8081/movies',
    getMovie: (filmId) => 'http://localhost:8081/movie?imdbId=' + filmId,
}

const idToName = [];
idToName[1464335] = "Uncharted";
idToName[11252248] = "Dog";
idToName[10872600] = "Spider-Man: No Way Home";
idToName[7657566] = "Death on the Nile";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', async (req, res) => {
    const urls = [API.latestComments, API.getAllMovies];
    const responseNames = ["latestComments", "movies"];
    
    if (req.query.imdbId) {
        urls.push(API.movieComments(req.query.imdbId));
        responseNames.push("movieComments");
    }

    let responses = { };

    let completed_requests = 0;

    urls.forEach(function (url, index) {
        http.get(url, function (response) {
            response.on('data', function (chunk) {
                responses[responseNames[index]] = JSON.parse(chunk.toString());
            });

            response.on('end', function () {
                if (completed_requests++ === urls.length - 1) {

                    for (let i = 0; i < responses.latestComments.length; i++) {
                        let movie = responses.movies.find(m => m.imdbId == responses.latestComments[i].imdbId);
                        if (movie) {
                            responses.latestComments[i].title = movie.title;
                        } else {
                            responses.latestComments[i].title = "Unknown film";
                        }
                    }

                    const renderData = {...responses};

                    if (!renderData.movieComments) {
                        renderData.movieComments = [];
                    }

                    res.render('index', renderData);
                }
            });
        });
    });
});

app.get('/movies', async (req, res) => {
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
                        console.log();
                        let movie = responses.movies.find(m => m.imdbId == responses.latestComments[i].imdbId);
                        if (movie) {
                            responses.latestComments[i].title = movie.title;
                        } else {
                            responses.latestComments[i].title = "Unknown film";
                        }
                    }

                    const renderData = {...responses};
                    
                    res.render('movies', renderData);
                }
            });
        });
    });
});

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
                        let movie = responses.movies.find(m => m.imdbId == responses.latestComments[i].imdbId);
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
                        console.log();
                        let movie = responses.movies.find(m => m.imdbId == responses.latestComments[i].imdbId);
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

app.post('/add_comment', (req, res) => {
    request.post({
        url: API.addComment,
        body: req.body,
        json: true
    }, function () {
        res.redirect('/?imdbId=' + req.body.imdbId);
    });
});

app.post('/add_movie', (req, res) => {
    request.post({
        url: API.addMovie,
        body: req.body,
        json: true
    }, function () {
        res.redirect('/movie?imdbId=' + req.body.imdbId);
    });
});

const port = 8082;

app.listen(port, () => console.log("Listening on " + port));