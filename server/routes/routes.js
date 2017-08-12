var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');


router.post('/', function (req, res) {
    console.log('post route was hit');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to database:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO tasks (task, done) VALUES ($1, $2);',
            [req.body.task, req.body.done],
                function (errorMakingQuery, results) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query:', errorMakingQuery)
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
     });
});

router.get('/', function (req, res) {
    console.log('router get was hit');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasks;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                    //console.log(result.rows);
                }
            });
        }
    });
});

module.exports = router;