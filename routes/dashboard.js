const express = require('express');
const db = require('../conn/conn');
const { checkAuthenticated } = require('../helpers/auth');
const router = express.Router();

router
    .route('/')
    .get(checkAuthenticated,(req, res) => {
        db.any("SELECT * FROM watchlist WHERE user_id = $1", [req.user.user_id])
        .then(watchlist => {
            res.render('pages/dashboard', { name: req.user.email, watchlist})
        })
        .catch(e => {
            console.log(e)
            res.render('pages/dashboard', { name: req.user.email})
        })
    })

module.exports = router