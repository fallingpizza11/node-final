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
const historyRouter = require('./routes/history')

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({ keys: ['keyone', 'keytwo', 'keythree']}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())
passport.use(new LocalStrat(Account.authenticate()))

app.use('/api/orders', ordersRouter);
app.use('/history', historyRouter)
app.use('/thank', thankRouter)
app.use('/review', reviewRouter)
app.use('/login', loginRouter)
app.use('/', indexRouter);  // ! ! routes have to be declared most specific to least specific to avoid routing problems


app.use(express.static(path.join(__dirname, 'public'))) // ! ! this has to be declared last or else it just serves index.html when going to root website directory


module.exports = app;
