const request = require("request");

module.exports = function (app, API) {
    app.post('/add_movie', (req, res) => {
        request.post({
            url: API.addMovie,
            body: req.body,
            json: true
        }, function () {
            res.redirect('/movie?imdbId=' + req.body.imdbId);
        });
    });
}