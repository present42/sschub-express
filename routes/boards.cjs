var express = require('express');
var router = express.Router();
var db = require('../database.cjs');

// TODO (1) select which board to show to the public (incl. UI)

// TODO (2) 

router.post('/create', function(req, res, next) {
  const boardDetails = req.body;
  console.log(boardDetails);
  var sql = 'INSERT INTO boards SET ?';
  db.query(sql, boardDetails, function(err, data) {
    if(err) throw err;
    console.log("Post data (board) is inserted successfully");
  });
  res.redirect('/admin');
})

router.get('/list', function(req, res, next) {
  var sql = 'SELECT * FROM boards';
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (board list) is successful");
    res.send(data);
  });
});

router.get('/:board_id', function (req, res, next) {
  var sql = 'SELECT * FROM boards WHERE ?';
  console.log(req.params.board_id);
  db.query(sql, req.params, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
