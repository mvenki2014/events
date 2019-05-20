var express = require('express');
const bodyParser = require('body-parser');
const {Pool, Client} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});
const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});
db.connect();

const router = express.Router();

router.use(bodyParser.json());

router.get('/getuser', function (req, res) {
    pool.query('SELECT * from reg_users', (err, dbRes) => {
        console.log(err, dbRes);
        res.send({
            type: 'GET',
            data: [
                dbRes.rows
            ]
        });
        pool.end()
    });
});

router.post('/postuser', function (req, res) {
    console.log(req.body);
    res.send({
        type: 'POST',
        data: [
            req.body.name,
            req.body.phone,
        ]
    });
});

router.put('/putuser/:id', function (req, res) {
    res.send({type: 'PUT', data: ['putUSers', req.id]});
});

router.delete('/deluser/:id', function (req, res) {
    res.send({type: 'Delete', data: 'DeleteUSers'});
});

module.exports = router;
