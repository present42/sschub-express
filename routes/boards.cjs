var express = require('express');
var app = express.Router();
var db = require('../database.cjs');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });

// TODO (1) select which board to show to the public (incl. UI)

// TODO (2) 

app.post('/create', upload.single('background_img'), function(req, res, next) {
  const boardDetails = req.body;
  console.log(boardDetails);
  var sql = 'INSERT INTO boards SET ?';
  db.query(sql, boardDetails, function(err, data) {
    if(err) throw err;
    console.log("Post data (board) is inserted successfully");
  });
  res.redirect('/admin');
})

app.post('/:board_id/edit', upload.single('background_img'), function(req, res, next) {
  const boardDetails = req.body;
  const fileDetails = req.file;
  console.log(req.body, req.file);
  var temp ='';
  if (boardDetails.color == '' && fileDetails == undefined){
    console.log("fileDetails is undefined");
    temp = `UPDATE boards SET title = '${boardDetails.title}', title_color = '${boardDetails.title_color}', background_color = '${boardDetails.color}', board_type = '${boardDetails.type_check}' WHERE board_id = ${boardDetails.board_id}`;
  }else{
    console.log("fileDetails is defined");
    temp = `UPDATE boards SET title = '${boardDetails.title}', title_color = '${boardDetails.title_color}', background_color = '${boardDetails.color}', background_img = '${fileDetails?.filename}', board_type = '${boardDetails.type_check}' WHERE board_id = ${boardDetails.board_id}`;
  }
  const sql = temp;
  console.log(sql);
  db.query(sql, boardDetails, function(err, data) {
    if(err) throw err;
    console.log("Post data (board) is inserted successfully");
  });

  if(req.body.chooseAsMain && req.body.chooseAsMain == 'chooseAsMain') {
    const sql2 = `DELETE FROM current_main_board`;
    const sql3 = `INSERT INTO current_main_board VALUES (${boardDetails.board_id})`;
    db.query(sql2, function (err, data) {
      if(err) throw err;
      console.log("Edited info is successfully submitted");
    });
    db.query(sql3, function (err, data) {
      if(err) throw err;
      console.log("Edited info is successfully submitted");
    });
  }
  res.redirect(`/admin/board/${boardDetails.board_id}?edit=success`);
  
  // var sql = 'INSERT INTO boards SET ?';
  // db.query(sql, boardDetails, function(err, data) {
  //   if(err) throw err;
  //   console.log("Post data (board) is inserted successfully");
  // });
  // res.redirect('/admin');
})

app.get('/list', function(req, res, next) {
  var sql = 'SELECT * FROM boards';
  db.query(sql, function(err, data) {
    if(err) throw err;
    console.log("Read data (board list) is successful");
    res.send(data);
  });
});

app.get('/:board_id', function (req, res, next) {
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

module.exports = app;
