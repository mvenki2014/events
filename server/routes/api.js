var express = require('Express');
const router = express.Router();

router.get('/getuser',function (req, res) {
    res.send({type:'GET',data:'getUSers'});
});


router.post('/postuser',function (req, res) {
    res.send({type:'POST',data:'postUSers'});
});

router.put('/putuser/:id',function (req, res) {
    res.send({type:'PUT',data:'putUSers'});
});

router.delete('/deluser/:id',function (req, res) {
    res.send({type:'Delete',data:'DeleteUSers'});
});

