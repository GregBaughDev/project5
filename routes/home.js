const express = require('express');
const router = express.Router();
const genres = require('../helpers/genres')
const db = require('../conn/conn');
const { checkAuthenticated} = require('../helpers/auth')

router
  .route('/')
  .get( (req, res) => {
    console.log(req.user)
    res.render('pages/home', {genres, login: req.isAuthenticated()});
  });

router
  .route('/rating/:id')
  .get(checkAuthenticated, (req, res) => {
    const {id} = req.params
    db.oneOrNone('SELECT AVG(rating) FROM ratings WHERE movie_id = $1', [id])
    .then((rating) => {
    res.status(200).json(rating)
    });
  });

module.exports = router;

