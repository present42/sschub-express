var express = require('express');
var app = express.Router();
var db = require('../database.cjs');

app.get('/', function (req, res, next) {
  res.redirect('/admin/board');
});

app.get('/board', function (req, res, next) {
  if (req.session.loggedin) {
    var sql = 'select b.board_id, b.title, b.background_img, b.font_family, b.background_color, b.title_color, b.bg_music, c.board_id as current_board_id from boards b inner join current_main_board c';
    db.query(sql, req.params, function (err, data) {
      if (err) throw err;
      console.log("Read data (board list) is successful", { title: 'Express', board_list: data });
      res.render('admin_board', { board_list: Object.values(JSON.parse(JSON.stringify(data))) });
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/board/:board_id', function (req, res, next) {
  if (req.session.loggedin) {
    var sql = 'SELECT * FROM boards WHERE ?';
    console.log(req.params.board_id);
    db.query(sql, req.params, function (err, data) {
      if (err) throw err;
      console.log("Read data (with board id) is successful");
      console.log(data[0]);
      res.render('admin_board_details', { board: Object.values(JSON.parse(JSON.stringify(data))) });
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/post', function (req, res, next) {
  res.redirect('/admin/post/pending');
});

app.get('/post/pending', function (req, res, next) {
  if (req.session.loggedin) {
    var unapproved_sql = 'SELECT * FROM posts WHERE status = 0';
    db.query(unapproved_sql, function (err, data) {
      if (err) throw err;
      console.log("Reading unapproved posts is successful");
      console.log(data);
      res.render('admin_post_withnav', { data: data, text: 'Pending Posts' });
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/post/approved', function (req, res, next) {
  if (req.session.loggedin) {
    var unapproved_sql = 'SELECT * FROM posts WHERE status = 1';
    db.query(unapproved_sql, function (err, data) {
      if (err) throw err;
      console.log("Reading unapproved posts is successful");
      console.log(data);
      res.render('admin_post_withnav', { data: data, text: 'Accepted Posts' });
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/post/rejected', function (req, res, next) {
  if (req.session.loggedin) {
    var unapproved_sql = 'SELECT * FROM posts WHERE status = 2';
    db.query(unapproved_sql, function (err, data) {
      if (err) throw err;
      console.log("Reading unapproved posts is successful");
      console.log(data);
      res.render('admin_post_withnav', { data: data, text: 'Rejected Posts' });
    });
  } else {
    res.redirect('/login');
  }
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

module.exports = app;
