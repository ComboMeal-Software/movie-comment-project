const request = require("request");

module.exports = function (app, API) {
    app.post('/add_comment', (req, res) => {
        request.post({
            url: API.addComment,
            body: req.body,
            json: true
        }, function () {
            res.redirect('/?imdbId=' + req.body.imdbId);
        });
    });
}