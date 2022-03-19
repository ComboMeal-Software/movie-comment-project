module.exports = function (app, Comment) {
    app.get('/movie_comments', (req, res) => {
        Comment.find({ imdbId: req.query.imdbId }).exec((err, result) => {
            res.send(err ?? result);
            res.end();
        });
    });
}

