const express = require('express');
const router = express.Router();
const genres = require('../helpers/genres');
const db = require('../conn/conn');
const { checkAuthenticated} = require('../helpers/auth');

router
  .route('/')
  .get((req, res) => {
  res.render('pages/home', { genres, login: req.isAuthenticated() });
});

// Route to get community score
router
  .route(`/top/`)
  .get((req, res) => {
    db.any('SELECT COUNT(rating), AVG(rating)::numeric(4, 1), movie_id FROM ratings GROUP BY movie_id ORDER BY AVG(rating) desc limit 20')
    .then((top) => {
      res.json(top)
    })
    .catch(e => {
      console.log(e)
      res.send('error')
    })
})
// Route to get vote count, community score and movie_id
router
  .route('/rating/')
  .get((req, res) => {
    db.any('SELECT COUNT(rating), AVG(rating)::numeric(4, 1), movie_id FROM ratings GROUP BY movie_id')
  .then((score) => {
    res.send(score);
  })
  .catch(e => {
    console.log(e)
    res.send('error')
  })
})

// route to get user's score for this move
router
  .route('/rating/:id/user')
  .get(checkAuthenticated, (req, res) => {
    const {id} = req.params
      db.any("SELECT rating FROM ratings WHERE movie_id = $1 AND user_id = $2", [id, req.user.user_id])
      .then((rating) => {
        res.send(rating);
      })
      .catch(e => {
        console.log(e)
        res.send('error')
      })
  })

module.exports = router;
