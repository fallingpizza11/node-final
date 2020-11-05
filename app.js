//By Isaac Giuricich
var express = require('express');
var path = require('path');
var logger = require('morgan');

const session = require('cookie-session')
const passport = require('passport')
const Account = require('./models/account')
const LocalStrat = require('passport-local').Strategy

var indexRouter = require('./routes/index');
var ordersRouter = require('./routes/orders');
let thankRouter = require('./routes/thank')
let reviewRouter = require('./routes/review')
let loginRouter = require('./routes/login')

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ keys: ['keyone', 'keytwo', 'keythree']}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())
passport.use(new LocalStrat(Account.authenticate()))

app.use('/', indexRouter);
app.use('/api/orders', ordersRouter);
app.use('/thank', thankRouter)
app.use('/review', reviewRouter)
app.use('/login', loginRouter)

module.exports = app;
