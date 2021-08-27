const LocalStrategy = require('passport-local').Strategy;
const db = require('./conn/conn');
const bcrypt = require('bcrypt');

function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])
      .then(async (user) => {
        if (!user) return done(null, false, { message: 'Incorrect details.' });
        if (user.is_confirmed != 1)
          done(null, false, { message: 'Please confirm your email.' });
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
          }
          if (isMatch) {
            return done(null, user, { message: 'Logged in.' });
          } else {
            return done(null, false, { message: 'Incorrect details.' });
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, authenticateUser)
  );
  //  TODO: Research serialize session-storage
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
}

module.exports = initialize;
