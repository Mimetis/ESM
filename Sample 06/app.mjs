// @ts-check
import express from "express";
import path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import index from "./routes/index";
import users from "./routes/users";
import speakers from "./routes/speakers";
import speaker from "./routes/speaker";
import conferences from "./routes/conferences";

var app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', index);
app.use('/users', users);
app.use('/conferences', conferences);
app.use('/speakers', speakers);
app.use('/speaker', speaker);
app.use('/speakers/', speakers);
app.use('/speakers/:pageName', speakers);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');

  // @ts-ignore
  err.status = 404;
  next(err);
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


export default app;
