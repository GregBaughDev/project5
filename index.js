const express = require('express');
const db = require('./conn/conn');

const app = express();
const port = process.env.PORT || 3000;

// require routes
const homeRouter = require('./routes/home');
const movies = require('./routes/movies')

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
app.use('/movies', movies);

// Server
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
