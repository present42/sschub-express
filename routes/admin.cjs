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

app.get('/board/create', function (req, res, next) {
  if (req.session.loggedin) {
    res.render('admin_board_details', { board: [{ board_id: -1, title: "New Board", board_type: 0, color: 0, title_color: 0 }] });
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
  db.query(`SELECT * FROM current_main_board`, function (err, data) {
    if (err) throw err;

    res.redirect(`/admin/post/pending/${data[0].board_id}`);
  });
});

app.get('/post/pending/:board_id', function (req, res, next) {
  if (req.session.loggedin) {
    var unapproved_sql = `SELECT * FROM posts WHERE status = 0 and parent_board_id = ${db.escape(req.params.board_id)}`;
    db.query(unapproved_sql, function (err, data) {
      if (err) throw err;
      console.log("Reading unapproved posts is successful");
      console.log(data);

      var sql2 = 'SELECT * FROM boards';
      db.query(sql2, function (err, data2) {
        if (err) throw err;
        res.render('admin_post_withnav', { data: data, text: 'Pending Posts', board_data: data2, selected_board: data2.filter(board => board.board_id == req.params.board_id) });
      });
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/post/approved', function (req, res, next) {
  db.query(`SELECT * FROM current_main_board`, function (err, data) {
    if (err) throw err;

    res.redirect(`/admin/post/approved/${data[0].board_id}`);
  });
});

app.get('/post/approved/:board_id', function (req, res, next) {
  if (req.session.loggedin) {
    var unapproved_sql = `SELECT * FROM posts WHERE status = 1 and parent_board_id = ${db.escape(req.params.board_id)}`;
    db.query(unapproved_sql, function (err, data) {
      if (err) throw err;
      console.log("Reading approved posts is successful");
      console.log(data);

      var sql2 = 'SELECT * FROM boards';
      db.query(sql2, function (err, data2) {
        if (err) throw err;
        console.log(data2);
        res.render('admin_post_withnav', { data: data, text: 'Accepted Posts', board_data: data2, selected_board: data2.filter(board => board.board_id == req.params.board_id) });
      });
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/post/rejected', function (req, res, next) {
  db.query(`SELECT * FROM current_main_board`, function (err, data) {
    if (err) throw err;

    res.redirect(`/admin/post/rejected/${data[0].board_id}`);
  });
});

app.get('/post/rejected/:board_id', function (req, res, next) {
  if (req.session.loggedin) {
    var unapproved_sql = `SELECT * FROM posts WHERE status = 2 and parent_board_id = ${db.escape(req.params.board_id)}`;
    db.query(unapproved_sql, function (err, data) {
      if (err) throw err;
      console.log("Reading approved posts is successful");
      console.log(data);

      var sql2 = 'SELECT * FROM boards';
      db.query(sql2, function (err, data2) {
        if (err) throw err;
        res.render('admin_post_withnav', { data: data, text: 'Rejected Posts', board_data: data2, selected_board: data2.filter(board => board.board_id == req.params.board_id) });
      });
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = app;
