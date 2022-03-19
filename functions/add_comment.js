module.exports = function (app, Comment) {
    app.post('/add_comment', (req, res) => {
        if (!req.body.imdbId) {
            res.sendStatus(500);
            res.end();

            return;
        }

        const insertComment = new Comment({...req.body, date: new Date().toUTCString()});

        insertComment.save(function (err) {
            if (err) {
                res.sendStatus(500);
                res.end();

                return;
            }

            res.send('Successfully saved');
            res.end();
        });
    });
}

