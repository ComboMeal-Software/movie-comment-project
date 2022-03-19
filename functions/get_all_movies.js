module.exports = function (app, Movie) {
    app.get('/movies', (req, res) => {
        Movie.find({}).sort({ imdbId: 1 }).limit(req.query.limit).exec((err, result) => {
            res.send(err ?? result);
            res.end();
        });
    });
}
