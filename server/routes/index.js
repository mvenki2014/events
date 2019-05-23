var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var nodemailer = require('nodemailer');
const router = express.Router();

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,  //true for 465 port, false for other ports
    service: 'gmail',
    auth: {
        user: 'venkatesh.m@fininfocom.com',
        pass: 'Venkisingle123?'
    }
});


router.use(bodyParser.json());
/*const {Pool, Client} = require('pg');

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
});*/

router.get('/getuser', function (req, res) {
    res.send({type: 'get', data: ['getServiceUsers serice']});
});

router.get('/', function (req, res) {
    res.send({type: 'get', data: ['getService', req.id]});
});

router.post('/upload', function (req, res, next) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        fstream = fs.createWriteStream('./public/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
            res.redirect('/thanks.html');           //where to go next
        });
    });
});


router.post('/postMail', function (req, res) {
    var mailOptions = {
        from: 'venkatesh.m@fininfocom.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<h1>Welcome</h1><p>That was easy!</p>'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.msg = 'Mail has Error' + error;
        } else {
            res.msg = 'Email sent: ' + info.response;
        }
        res.send({
            type: 'POST',
            data: {
                email: req.body.email
            },
            response: {
                "message": res.msg
            }
        })
    });
});

router.put('/putuser/:id', function (req, res) {
    res.send({type: 'PUT', data: ['putUSers', req.id]});
});

router.delete('/deluser/:id', function (req, res) {
    res.send({type: 'Delete', data: 'DeleteUSers'});
});

module.exports = router;
