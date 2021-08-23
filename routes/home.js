const express = require('express');
const router = express.Router();
const genres = require('../helpers/genres');
const db = require('../conn/conn');
const { checkAuthenticated } = require('../helpers/auth');

router
  .route('/')
  .get((req, res) => {
  res.render('pages/home', { genres, login: req.isAuthenticated() });
});

// Route to get community score
router
  .route('/rating/:id')
  .get((req, res) => {
  const { id } = req.params;
  db.oneOrNone('SELECT AVG(rating) FROM ratings WHERE movie_id = $1', [
    id,
  ]).then((score) => {
    res.send(score);
  });
});

module.exports = router;
