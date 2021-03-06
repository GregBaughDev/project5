require('dotenv').config();
const express = require('express');
const passport = require("passport");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();

const port = process.env.PORT || 3000;

app.use(methodOverride('_method'))

/// Session Middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 Day
}));

// Passport.js
const initializePassport = require("./passportConfig");
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Set login variable when authenticated
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next(); 
});

// Set API key
app.use(function (req, res, next) {
  res.locals.key = process.env.SECRET;
  next(); 
});

// require routes
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login')
const dashboardRouter = require('./routes/dashboard')
const signupRouter = require('./routes/signup')
const moviesRouter = require('./routes/movies');
const emailRouter = require('./routes/mailer')

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
app.use("/login", loginRouter)
app.use("/dashboard", dashboardRouter)
app.use("/signup", signupRouter)
app.use('/movies', moviesRouter);
app.use("/email", emailRouter)


// TODO: REMOVE
// Test passport
app.get('/test', function (req, res) {
  if(!req.user) return res.send("Not logged in")
  return res.send(req.user)
})

// 404
app.get("*", (req, res) => {
  res.render("pages/error");
})

// Server
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
