module.exports = function (app, Movie) {
    app.post('/add_movie', (req, res) => {
        if (!req.body.imdbId) {
            res.sendStatus(500);
            res.end();

            return;
        }

        const insertMovie = new Movie({...req.body});

        insertMovie.save(function (err) {
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

