var express = require('express');
var router = express.Router();
var db = require('../database.cjs');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });

// TODO (1) select which board to show to the public (incl. UI)

// TODO (2) 

router.post('/create', upload.single('background_img'), function(req, res, next) {
  const boardDetails = req.body;
  console.log(boardDetails);
  var sql = 'INSERT INTO boards SET ?';
  db.query(sql, boardDetails, function(err, data) {
    if(err) throw err;
    console.log("Post data (board) is inserted successfully");
  });
  res.redirect('/admin');
})

router.post('/:board_id/edit', upload.single('background_img'), function(req, res, next) {
  const boardDetails = req.body;
  const fileDetails = req.file;
  console.log(req.body, req.file);

  const sql = `UPDATE boards SET title = '${boardDetails.title}', title_color = '${boardDetails.title_color}', color = '${boardDetails.color}', background_img = '${fileDetails?.filename}', board_type = ${boardDetails.animationMode} WHERE board_id = ${boardDetails.board_id}`
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
