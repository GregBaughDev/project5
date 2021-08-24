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
        let movieData = []
        let watchData = []
        req.user ? loggedIn = true : null
        if(loggedIn){
            // GB TODO - LOOK INTO THE BELOW
            db.any("SELECT * FROM ratings WHERE movie_id = $1 AND user_id = $2", [id, req.user.user_id])
            .then(data => {
                movieData = data
                db.any("SELECT * FROM watchlist WHERE movie_id = $1 AND user_id = $2", [id, req.user.user_id])
                .then(watchlist => {
                    let userRating = false
                    console.log(watchlist, watchlist.length)
                    if(movieData.length != 1 && watchData.length != 1) {
                        res.render('pages/details', {id, loggedIn, userRating, watchData})
                    } else if(movieData.length == 1 && watchData.length != 1) {
                        userRating = data[0].rating
                        watchData = false
                        res.render('pages/details', {id, loggedIn, userRating, watchData})
                    } else if(movieData.length == 1 && watchData.length == 1) {
                        userRating = data[0].rating
                        watchData = watchlist
                        res.render('pages/details', {id, loggedIn, userRating, watchData})
                    }
                })
                .catch(e => {
                    console.log(e)
                    res.send('error')
                })
                
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
        .then(() => {
            // Send flash message
            res.render('pages/home', {genres})
        })
        .catch(e => {
            console.log(e)
            // send flash message
            res.redirect('pages/home', {genres})
        })
    })

router
    .route('/:id/watch')
    .post(checkAuthenticated, (req, res) => {
        const {id} = req.params
        db.none("INSERT INTO watchlist (movie_id, user_id) VALUES ($1, $2);", [id, req.user.user_id])
        .then(() => {
            // Send flash message
            console.log('added to watchlist')
            res.render('pages/home', {genres})
        })
        .catch(e => {
            console.log(e)
            // Send flash message
            res.redirect('pages/home', {genres})
        })
    })
    .delete(checkAuthenticated, (req, res) => {
        const {id} = req.params
        db.none("DELETE FROM watchlist WHERE movie_id = $1 AND user_id = $2", [id, req.user.user_id])
        .then(() => {
            // Send flash message
            console.log('deleted from watchlist')
            res.render('pages/home', {genres})
        })
        .catch(e => {
            console.log(e)
            // Send flash message
            res.redirect('pages/home', {genres})
        })
    })

module.exports = router