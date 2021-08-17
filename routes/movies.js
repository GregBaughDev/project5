const express = require('express');
const router = express.Router();

router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params
        res.render('./details', {id})
    })

module.exports = router