const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const url = "mongodb+srv://bolshakova:spbstu@weblabs.qwnil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url, {dbName: "comments"});

const commentSchema = new mongoose.Schema(
    {
        imdbId: String,
        author: String,
        language: String,
        rating: Number,
        comment: String,
        date: Date,
    }
);
const Comment = mongoose.model('Comment', commentSchema);

const movieSchema = new mongoose.Schema(
    {
        imdbId: String,
        director: String,
        title: String,
    }
);
const Movie = mongoose.model('Movie', movieSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

require('./functions/add_comment.js')(app, Comment);
require('./functions/latest_comments.js')(app, Comment);
require('./functions/movie_comments.js')(app, Comment);
require('./functions/add_movie')(app, Movie);
require('./functions/get_all_movies')(app, Movie);
require('./functions/get_movie')(app, Movie);

const port = 8081;

app.listen(port, () => console.log("Listening on " + port));