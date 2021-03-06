var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');


router.post('/', function (req, res) {
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
                });//end client.query
        }//end pool.connect else statement
    });//end pool.connect function
});//end router.post

router.get('/', function (req, res) {
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
            });//end client.query
        }//end pool.connect else statement
    });//end pool.connect function
});//end router.get

router.delete('/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to database:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM tasks WHERE id = $1;',
                [req.params.id],
                function (errorMakingQuery, results) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query:', errorMakingQuery)
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });//end client.query
        }//end pool.connect else statement
    });//end pool.connect function
});//end router.delete

router.put('/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to database:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query("UPDATE tasks SET done = 'Y' WHERE id = $1;",
                [req.params.id],
                function (errorMakingQuery, result) {
                    if (errorMakingQuery) {
                        console.log('Error making query:', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });//end client.query
        }//end pool.connect else statement
    });//end pool.connect function
});//end router.put

module.exports = router;