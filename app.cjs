var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var app = express();

const indexRouter = require('./routes/index.cjs');
const postsRouter = require('./routes/posts.cjs');
const boardsRouter = require('./routes/boards.cjs');
const adminRouter = require('./routes/admin.cjs');
const loginRouter = require('./routes/login.cjs');

app.set('trust proxy', 1);
app.use(session({
  secret: "fd34s@!@dfa453f3DF#$D&W",
  saveUninitialized: false,
  resave: false,
  proxy: true,
  cookie: {
    maxAge: 3600000,
    secure: false
  }
}));

app.get('/helloworld', function (req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    console.log(req.session);
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

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
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
