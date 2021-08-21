const express = require('express');
const db = require('./conn/conn');
const session = require('express-session');
const bcrypt = require('bcrypt')
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
/// Session Middleware
app.use(session ({
  name: "Cinema",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}))

// require routes
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const movies = require('./routes/movies');


// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/movies', movies);

// Server
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
