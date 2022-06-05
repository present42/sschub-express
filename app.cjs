var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// const multer = require('multer');
// const upload = multer({dest: 'uploads/'});

var indexRouter = require('./routes/index.cjs');
var postsRouter = require('./routes/posts.cjs');

var boardsRouter = require('./routes/boards.cjs');
var adminRouter = require('./routes/admin.cjs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/post', postsRouter);
app.use('/boards', boardsRouter);
app.use('/admin', adminRouter);

// app.post('/post/create', upload.single('image'), function(req, res, next) {
//   console.log("Hello");
//   console.log(req.fields, req.files);
//   const postDetails = req.body;
//   console.log("req.body", postDetails);
//   // TODO - Allow the admin to change this value 
//   postDetails.parent_board_id = 1;
//   var sql = 'INSERT INTO posts SET ?';
//   // db.query(sql, postDetails, function (err, data) {
//   //   if(err) throw err;
//   //     console.log("Post data is inserted successfully");
//   // });
//   console.log(req.file);
//   // res.redirect('/form');
//   res.send('success');
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
