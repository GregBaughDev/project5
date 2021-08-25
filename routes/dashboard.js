const express = require('express');
const db = require('../conn/conn');
const { checkAuthenticated } = require('../helpers/auth');
const router = express.Router();
const image_URL = 'https://image.tmdb.org/t/p/w185/'


router
    .route('/')
    .get(checkAuthenticated,(req, res) => {
        res.render('pages/dashboard', {username: req.user.username})
    })
    // .post(checkAuthenticated,(req, res) => {
    //     db.one("INSERT INTO users (privacy) VALUES ($1, $2, $3) RETURNING user_id", [privacy])
    //     .then((e) => {
    //         console.log(e)
    //     })
                
    //     .catch((e) => {
    //         console.log(e)
    //     })  
    // })
router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params
        db.oneOrNone("SELECT * FROM users WHERE username = $1", [id])
            .then(data => {
                let username = data.username[0].toUpperCase() + data.username.slice(1)
                res.render('pages/user', {myAvatar: image_URL + data.avatar, username}) 
            })
            .catch(e => {
                console.log(e)
                res.send('error')
            })

    })

module.exports = router