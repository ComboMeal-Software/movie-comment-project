module.exports = function (app, Movie) {
    app.get('/movie', (req, res) => {
        Movie.find({ imdbId: req.query.imdbId }).exec((err, result) => {
            res.send(err ?? result);
            res.end();
        });
    });
}
