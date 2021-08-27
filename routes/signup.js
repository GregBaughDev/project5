const express = require('express');
const router = express.Router();
const db = require('../conn/conn');
const bcrypt = require('bcrypt');
const Valid = require('../class/validator')
const nodemailer = require('nodemailer')
const { checkNotAuthenticated } = require('../helpers/auth')
const flash = require('express-flash');
app = express();
app.use(flash())

// SIGN UP

router
  .route('/')
  .get(checkNotAuthenticated, (req, res) => {
      let currData = false
      res.render('pages/signup', {currData})
  })
  .post(checkNotAuthenticated, async (req, res) => {
      const {avatar, username, email, pword, pwordcheck} = req.body
      // Valid is a class containing regexs and tests
      const tests = new Valid
      
      // error object created to contain specific errors which can be placed next to input fields 
      let errors = {
          email: "",
          password: "",
          passwordMatch: "",
          userExists: ""
      }
      // Flag to check if validations have all been passed
      let allTests = true

      const checkNewUser = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email])

      !tests.emailTest(email) ? errors.email = "Please enter a valid email" : null
      !tests.passTest(pword) ? errors.password = "Please enter a valid password" : null
      pword != pwordcheck ? errors.passwordMatch = "Passwords don't match" : null
      checkNewUser ? errors.userExists = "This email address is already in use" : null        

      /* If the error object contains any errors the user is redirected to signup form, error objects 
      and current user data is passed back to be entered into input fields for better UX */
      for(let key in errors){
        if(errors[key] != ""){
            allTests = false
            const currData = req.body
            return res.render('pages/signup', {currData, error: "Invalid details"})
        } 
    }

      // If all validations are passed the information is input to DB and user is redirected to login 
      if(allTests){
          const saltRounds = 10
          const salt = bcrypt.genSaltSync(saltRounds)
          const hash = bcrypt.hashSync(pword, salt)
          db.one("INSERT INTO users(avatar, username, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id", [avatar, username, email.toLowerCase(), hash])
              .then(async (data) => {
                  const { user_id } = data
                  let transporter = nodemailer.createTransport({
                      host: "smtp.ethereal.email",
                      port: 587,
                      secure: false,
                      auth: {
                          user: 'giuseppe.hickle@ethereal.email',
                          pass: '45vKFHFPatDx567R9R'
                      },
                  })
                  let info = await transporter.sendMail({
                      from: "Cinema <movies@cinema.com>",
                      to: `${username} ${email}`,
                      subject: "Please confirm your account",
                      text: "Hi there! To start using your account, please click the activation link",
                      html: `<h2>Hi there!</h2><p>To start using your account, please click the activation link</p><a href='http://localhost:3000/email/${user_id}'>Link!</a>`,
                  })
                  let link = nodemailer.getTestMessageUrl(info)
                  res.render('pages/login', { success: "Account Created. Confirm Here!", link})
                  console.log("Message sent: %s", info.messageId);
                  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              })
              .catch((e) => {
                  console.log(e)
              })
      }
  })

module.exports = router;
