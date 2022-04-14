var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/form', function(req, res, next) {
  res.render('posts');
});

router.post('/create', function(req, res, next) {
  const postDetails = req.body;
  console.log(postDetails);
  var sql = 'INSERT INTO posts SET ?';
  db.query(sql, postDetails, function (err, data) {
    if(err) throw err;
      console.log("Post data is inserted successfully");
  });
  res.redirect('/');
});

router.post('/create/board', function(req, res, next) {
  const boardDetails = req.body;
  console.log(boardDetails);
  var sql = 'INSERT INTO boards SET ?';
  db.query(sql, boardDetails, function(err, data) {
    if(err) throw err;
    console.log("Post data (board) is inserted successfully");
  });
  res.redirect('/admin');
})


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
