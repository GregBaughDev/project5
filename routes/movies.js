const express = require('express');
const router = express.Router();
const db = require('../conn/conn');
const { checkAuthenticated } = require('../helpers/auth')
const { genres } = require('../helpers/genres') 

router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params
        let loggedIn = false
        req.user ? loggedIn = true : null
        if(loggedIn){
            db.any("SELECT * FROM ratings WHERE movie_id = $1 AND user_id = $2", [id, req.user.user_id])
            .then(data => {
                let userRating = false
                if(data.length != 1) {
                    res.render('pages/details', {id, loggedIn, userRating})
                } else {
                    userRating = data[0].rating
                    res.render('pages/details', {id, loggedIn, userRating})
                } 
            })
            .catch(e => {
                console.log(e)
                res.send('error')
            })
        } else {
            res.render('pages/details', {id, loggedIn})
        }
    })

router
    .route('/:id/rate')
    .post(checkAuthenticated, (req, res) => {
        const {id} = req.params
        db.none("INSERT INTO ratings (movie_id, rating, user_id) VALUES ($1, $2, $3);", [id, req.body.rating, req.user.user_id])
        .then((data) => {
            // Send flash message
            res.render('pages/home', {genres})
        })
        .catch(e => {
            console.log(e)
            // send flash message
            res.redirect('pages/home', {genres})
        })
    })

module.exports = router