var express = require('express');
var router = express.Router();
var db = require('../database.cjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = 'SELECT * from current_main_board inner join boards on current_main_board.board_id = boards.board_id';
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (board list) is successful");
    console.log(data[0]);
    if(data[0].board_type == 0) {
      // layout -- flying messages
      res.render('mainboard', { data: data[0] } );
    } else if(data[0].board_type == 1) {
      // layout -- post-it messages
      res.render('mainboard_postit', { data: data[0] } );
    }
  });
});

router.get('/form', function(req, res, next) {
  var sql = 'SELECT * from current_main_board';
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (board list) is successful");
    console.log(data[0]);
    res.render('form_submit', { title: "Message Submission Form", data: data[0] });
  });
});

module.exports = router;
