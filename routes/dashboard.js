const express = require('express');
const { checkAuthenticated } = require('../helpers/auth');
const router = express.Router();

router
    .route('/')
    .get(checkAuthenticated,(req, res) => {
        res.render('pages/dashboard', { name: req.user.email})
    })

module.exports = router