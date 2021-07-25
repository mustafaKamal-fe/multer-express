require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const path = require('path');
var filesRouter = require('./routes/files');

const PORT = process.env.PORT || 5000;

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/files', filesRouter);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
// 	console.log(err);
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.json({ error: err });
// });

app.listen(PORT, function () {
	console.error(` listening on port ${PORT}`);
});
