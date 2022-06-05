var express = require('express');
var router = express.Router();
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

const upload = multer({ dest: 'uploads/' });



var db = require('../database.cjs');
var path = require('path');

router.get('/:board_id/all', function(req, res, next) {
  var sql = `SELECT * FROM posts WHERE parent_board_id=${db.escape(req.params.board_id)}`;
  console.log(req.params.board_id);
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});

router.get('/:board_id/approved', function(req, res, next) {
  var sql = `SELECT * FROM posts WHERE parent_board_id=${db.escape(req.params.board_id)} and status=1`;
  console.log(req.params.board_id);
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});

router.get('/:board_id/pending', function(req, res, next) {
  var sql = `SELECT * FROM posts WHERE parent_board_id=${db.escape(req.params.board_id)} and status=0`;
  console.log(req.params.board_id);
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});

router.get('/:board_id/rejected', function(req, res, next) {
  var sql = `SELECT * FROM posts WHERE parent_board_id=${db.escape(req.params.board_id)} and status=2`;
  console.log(req.params.board_id);
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});

router.post('/create', upload.single('image'), function(req, res, next) {
  console.log("Hello");
  req.socket.setTimeout(10 * 60 * 1000);
  const postDetails = req.body;
  req.body.image_path = req.file.filename;
  console.log("req.body", postDetails);
  // TODO - Allow the admin to change this value 
  postDetails.parent_board_id = 1;
  var sql = 'INSERT INTO posts SET ?';
  db.query(sql, postDetails, function (err, data) {
    if(err) throw err;
      console.log("Post data is inserted successfully");
  });
  // console.log(req.body, req.file);
  // res.send({
  //   success: true
  // });
  res.redirect('/form');
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

module.exports = router;
