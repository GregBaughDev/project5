const express = require('express');
const db = require('../conn/conn');
const { checkAuthenticated } = require('../helpers/auth');
const router = express.Router();
const image_URL = 'https://image.tmdb.org/t/p/w185/';

router.
  route('/')
  .get(checkAuthenticated, (req, res) => {
    res.render('pages/dashboard', { username: req.user.username });
  });

router
  .route('/ratings')
  .get(checkAuthenticated, (req, res) => {
    db.any('SELECT * FROM ratings WHERE user_id = $1 ORDER BY rating desc', [req.user.user_id,])
      .then((ratings) => {
        res.json(ratings);
      })
      .catch((e) => {
        console.log(e);
        res.send('error');
      });
  });

router
  .route('/watchlist')
  .get(checkAuthenticated, (req, res) => {
    db.any('SELECT * FROM watchlist WHERE user_id = $1', [req.user.user_id])
      .then((watchlist) => {
        res.json(watchlist);
      })
      .catch((e) => {
        console.log(e);
        res.send('error');
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    db.oneOrNone('SELECT * FROM users WHERE username = $1', [id])
      .then((data) => {
        let username = data.username[0].toUpperCase() + data.username.slice(1);
        res.render('pages/user', { myAvatar: image_URL + data.avatar, username });
      })
      .catch((e) => {
        console.log(e);
        res.send('error');
      });
  });

module.exports = router;
