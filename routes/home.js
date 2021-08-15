const express = require('express');
const router = express.Router();
const genres = require('../helpers/genres')

router.get('/', (req, res) => {
  res.render('pages/home', {genres});
});

module.exports = router;
