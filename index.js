const express = require('express');
const db = require('./conn/conn');

const app = express();
const port = process.env.PORT || 3000;

// require routes
const homeRouter = require('./routes/home');

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

// GB - DEV Only - Search Bar route
app.get('/search', (req, res) => {
  // TODO[GB]: Move object to seperate file
  const genres = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    "Sci Fi": 878,
    "TV Movie": 10770,
    Thriller: 53,
    War: 10752,
    Western: 37
  }
  res.render('genre_search', {genres})
})

// Server
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
