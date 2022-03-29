const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const API = {
    addComment: 'http://localhost:8081/add_comment',
    latestComments: 'http://localhost:8081/latest_comments?limit=3',
    movieComments: (filmId) => 'http://localhost:8081/movie_comments?imdbId=' + filmId,
    addMovie: 'http://localhost:8081/add_movie',
    getAllMovies: 'http://localhost:8081/movies',
    getMovie: (filmId) => 'http://localhost:8081/movie?imdbId=' + filmId,
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.set('views', 'views');

require('./functions/GET/index')(app, API);
require('./functions/GET/add_movie')(app, API);
require('./functions/GET/movie')(app, API);
require('./functions/GET/movies')(app, API);
require('./functions/POST/add_comment')(app, API);
require('./functions/POST/add_movie')(app, API);

/*app.on('error', function (error) {

});*/

const port = 8082;

app.listen(port, () => console.log("Listening on " + port));