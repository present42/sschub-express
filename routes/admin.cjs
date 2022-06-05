var express = require('express');
var router = express.Router();
var db = require('../database.cjs');

router.get('/', function(req, res, next) {
  res.redirect('/admin/board');
});

router.get('/board', function(req, res, next) {
  var sql = 'SELECT * FROM boards';
  db.query(sql, req.params, function(err, data) {
    if(err) throw err;
    console.log("Read data (board list) is successful",  { title: 'Express', board_list: data });
    res.render('admin_board', { board_list: Object.values(JSON.parse(JSON.stringify(data))) });
  });
});

router.get('/board/:board_id', function(req, res, next) {
  var sql = 'SELECT * FROM boards WHERE ?';
  console.log(req.params.board_id);
  db.query(sql, req.params, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    console.log(data[0]);
    res.render('admin_board_details', { board: Object.values(JSON.parse(JSON.stringify(data))) });
  });
});

router.get('/post', function (req, res, next) {
  var sql = 'SELECT * FROM posts';
  res.render('admin_post');
});

// router.post('/create', function(req, res, next) {
//   const postDetails = req.body;
//   console.log(postDetails);
//   var sql = 'INSERT INTO posts SET ?';
//   db.query(sql, postDetails, function (err, data) {
//     if(err) throw err;
//       console.log("Post data is inserted successfully");
//   });
//   res.redirect('/');
// });

// router.post('/create/board', function(req, res, next) {
//   const boardDetails = req.body;
//   console.log(boardDetails);
//   var sql = 'INSERT INTO boards SET ?';
//   db.query(sql, boardDetails, function(err, data) {
//     if(err) throw err;
//     console.log("Post data (board) is inserted successfully");
//   });
//   res.redirect('/admin');
// })


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;