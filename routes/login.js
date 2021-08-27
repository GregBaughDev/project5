const express = require('express');
const passport = require('passport');
const router = express.Router();
const { checkNotAuthenticated } = require('../helpers/auth');

router
  .route('/')
  .get(checkNotAuthenticated, (req, res) => {
    res.render('pages/login');
  })
  .post(checkNotAuthenticated,
    passport.authenticate('local', {
      failureRedirect :"/login",
      failureFlash : true,
      successRedirect: '/dashboard',
      successFlash : true,
    }))
    
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
