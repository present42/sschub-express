var express = require('express');
var app = express.Router();
var db = require('../database.cjs');
const multer = require('multer');
const storage = multer.diskStorage({
  destination : function(req, file, cb){
    if (file.fieldname === 'bg_music') {
      cb(null, 'public/music');
    } else if (file.fieldname === 'background_img') {
      cb(null, 'public/images');
    }
}});
const upload = multer({ storage: storage});
var filefields = upload.fields([{name: 'background_img'}, {name: 'bg_music'}]);

// TODO (1) select which board to show to the public (incl. UI)

// TODO (2) 

app.post('/create', upload.fields([{name:'background_img', max_count:1},{name:'bg_music', max_count:1}]), function(req, res, next) {
  const boardDetails = req.body;
  const fileDetails = req.file;
  console.log(boardDetails);

  var sql = `INSERT INTO boards (title, background_img, background_color, title_color, board_type) VALUES ('${boardDetails.title}', '${fileDetails?.filename || ''}', '${boardDetails.background_color}', '${boardDetails.title_color}', '${boardDetails.type_check}')`;
  db.query(sql, boardDetails, function (err, data) {
    if (err) throw err;
    console.log("Post data (board) is inserted successfully", data);
    
    if(req.body.chooseAsMain && req.body.chooseAsMain == 'chooseAsMain') {
      const sql2 = `DELETE FROM current_main_board`;
      const sql3 = `INSERT INTO current_main_board VALUES (${data.insertId})`;
      db.query(sql2, function (err, data) {
        if(err) throw err;
        console.log("Edited info is successfully submitted");
      });
      db.query(sql3, function (err, data) {
        if(err) throw err;
        console.log("Edited info is successfully submitted");
      });
    }
  });

  res.redirect('/admin');
});

app.post('/:board_id/edit', filefields, function(req, res, next) {
  const boardDetails = req.body;
  const fileDetails = req.files;
  var board_title = boardDetails.title;
  board_title = board_title.replace('\'','\'\'');
  console.log(board_title);
  var temp ='';
  if (fileDetails['background_img'] == undefined){
    console.log("fileDetails is undefined");
    temp = `UPDATE boards SET title = '${board_title}', title_color = '${boardDetails.title_color}', background_color = '${boardDetails.background_color}', board_type = '${boardDetails.type_check}', text_color = '${boardDetails.text_color}' `;
  }else{
    console.log("fileDetails is defined");
    temp = `UPDATE boards SET title = '${board_title}', title_color = '${boardDetails.title_color}', background_color = '${boardDetails.background_color}', background_img = '${fileDetails['background_img'][0]['filename']}', board_type = '${boardDetails.type_check}', text_color = '${boardDetails.text_color}' `;
  }

  if(fileDetails['bg_music']!=undefined){
    console.log(fileDetails['bg_music']);
    temp += `, bg_music = '${fileDetails['bg_music'][0]['filename']}' `;
  }

  var post_colors = `, post_colors = '${boardDetails.post_color_1}  ${boardDetails.post_color_2}  ${boardDetails.post_color_3}  ${boardDetails.post_color_4}  ${boardDetails.post_color_5}' `;
  temp += post_colors;
  temp += `WHERE board_id = ${boardDetails.board_id}`;

  const sql = temp;
  console.log(sql);
  db.query(sql, boardDetails, function (err, data) {
    if (err) throw err;
    console.log("Post data (board) is inserted successfully");
  });

  if (req.body.chooseAsMain && req.body.chooseAsMain == 'chooseAsMain') {
    const sql2 = `DELETE FROM current_main_board`;
    const sql3 = `INSERT INTO current_main_board VALUES (${boardDetails.board_id})`;
    db.query(sql2, function (err, data) {
      if (err) throw err;
      console.log("Edited info is successfully submitted");
    });
    db.query(sql3, function (err, data) {
      if (err) throw err;
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

app.post('/:board_id/delete', function(req, res, next) {
  const board_id = Number(req.params.board_id);
  if(!Number.isInteger(board_id)) throw err;

  const sql = `SELECT * FROM boards WHERE board_id = ${board_id}`;
  console.log(sql);
  db.query(sql, function (err, data) {
    if (err) throw err;
    if (data.length == 1) {
      db.query(`DELETE FROM boards WHERE board_id = ${board_id}`, function (err, data) {
        if (err) throw err;
        console.log(`board with board_id = ${board_id} is successfully deleted`);
        res.send('OK');
        // res.sendStatus(200);
      });
    } else {
      console.log("No board record is found");
      res.sendStatus(400);
    }
  });
})


app.get('/list', function (req, res, next) {
  var sql = 'SELECT * FROM boards';
  db.query(sql, function (err, data) {
    if (err) throw err;
    console.log("Read data (board list) is successful");
    res.send(data);
  });
});

app.get('/:board_id', function (req, res, next) {
  var sql = 'SELECT * FROM boards WHERE ?';
  console.log(req.params.board_id);
  db.query(sql, req.params, function (err, data) {
    if (err) throw err;
    console.log("Read data (with board id) is successful");
    res.send(data);
  });
});


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = app;
