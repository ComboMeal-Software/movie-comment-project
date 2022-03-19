module.exports = function (app, Comment) {
    app.get('/latest_comments', (req, res) => {
        Comment.find({}).sort({ date: -1 }).limit(req.query.limit).exec((err, result) => {
            res.send(err ?? result);
            res.end();
        });
    });
}

