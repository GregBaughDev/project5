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
      successRedirect: '/dashboard',
      failureRedirect: '/login',
    }))
    
router.get('/logout', (req, res) => {
  req.logout();
  console.log('You have logged out successfully');
  res.redirect('/');
});

module.exports = router;
