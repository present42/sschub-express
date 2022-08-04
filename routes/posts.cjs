var express = require('express');
var app = express.Router();
const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function(req, res, cb) {
//     cb(null, './tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// });

const upload = multer({ dest: 'public/images/posts' });

var db = require('../database.cjs');
var path = require('path');

app.post('/approve/:post_id', function(req, res, next) {
  console.log(req.params.post_id);
  const post_id = req.params.post_id;
  
  var sql = `UPDATE posts SET status=1, approved_time=CURRENT_TIMESTAMP WHERE post_id=${db.escape(req.params.post_id)}`;
  db.query(sql, function(err, data) {
    if(err) throw err;
    res.send({ success: true });
  });
});

app.post('/reject/:post_id', function(req, res, next) {
  console.log(req.params.post_id);
  const post_id = req.params.post_id;
  
  var sql = `UPDATE posts SET status=2, approved_time=CURRENT_TIMESTAMP WHERE post_id=${db.escape(req.params.post_id)}`;
  db.query(sql, function(err, data) {
    if(err) throw err;
    res.send({ success: true });
  });
});

app.get('/:post_id', function(req, res, next) {
  console.log(req.params.post_id);

  var sql = `SELECT * FROM posts WHERE post_id=${db.escape(req.params.post_id)}`;
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});

app.get('/:board_id/all', function(req, res, next) {
  var sql = `SELECT * FROM posts WHERE parent_board_id=${db.escape(req.params.board_id)}`;
  console.log(req.params.board_id);
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});

app.get('/:board_id/approved', function(req, res, next) {
  var sql = `SELECT * FROM posts WHERE parent_board_id=${db.escape(req.params.board_id)} and status=1`;
  console.log(req.params.board_id);
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});

app.get('/:board_id/pending', function(req, res, next) {
  var sql = `SELECT * FROM posts WHERE parent_board_id=${db.escape(req.params.board_id)} and status=0`;
  console.log(req.params.board_id);
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});

app.get('/:board_id/rejected', function(req, res, next) {
  var sql = `SELECT * FROM posts WHERE parent_board_id=${db.escape(req.params.board_id)} and status=2`;
  console.log(req.params.board_id);
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});

app.post('/create', upload.single('image'), function(req, res, next) {
  console.log("Hello");
  req.socket.setTimeout(10 * 60 * 1000);
  const postDetails = req.body;
  if(req.file) req.body.image_path = req.file.filename;
  console.log("req.body", postDetails);
  console.log(postDetails.message);
  
  var sql = 'INSERT INTO posts SET ?';
  db.query(sql, postDetails, function (err, data) {
    if(err) throw err;
      console.log("Post data is inserted successfully");
  });
  // console.log(req.body, req.file);
  // res.send({
  //   success: true
  // });
  res.redirect('/form?success');
});

// TODO (1) approve the post with the given post_id

// TODO (2) reject the post with the given post_id

// TODO (2-2) reject the post with the given post_id & reason

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

module.exports = app;
