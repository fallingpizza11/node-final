//By Isaac Giuricich
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ordersRouter = require('./routes/orders');
let thankRouter = require('./routes/thank')
let reviewRouter = require('./routes/review')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/orders', ordersRouter);
app.use('/thank', thankRouter)
app.use('/review', reviewRouter)

module.exports = app;
