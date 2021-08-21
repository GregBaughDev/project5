// Forked from https://github.com/hy-js/Incode-Project-4/blob/master/routes/mailer.js
const express = require('express');
const router = express.Router();
const db = require('../conn/conn');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const Valid = require('../class/validator')

router
    .route('/forgot')
    .get((req, res) => {
        res.render('pages/forgot',)
    })

router
    // Route to handle password reset
    .route('/reset')
    .post((req, res) => {
        const {email} = req.body
        if(email == ''){
            console.log('blank email')
        }
        db.oneOrNone('SELECT * FROM users WHERE email = $1', [email.toLowerCase()])
            // If no user is associated with the email address, user is informed
            .then(async (user) => {
                if(!user){
                    res.render('pages/forgot')
                    console.log('Not a user')
                } else {
                    /* If user does exist, is_confirmed to false so they are unable to login while
                    they are updating their password */
                    db.none('UPDATE users SET is_confirmed = B\'0\' WHERE user_id = $1', [user.user_id])
                    .then(async () => {
                        res.redirect('/login')
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
                            to: `<${user.email}>'`,
                            subject: "Reset your password",
                            text: "Hi there! You requested a password reset. Please click here to reset your password",
                            html: `<h2>Hi there!</h2><p>You requested a password reset, please click <a href="http://localhost:3000/email/update/${user.user_id}">here</a> to reset your password</p>`,
                        })
                        console.log("Message sent: %s", info.messageId);
                        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                        })
                    .catch(e => {
                        console.log(e)
                    })
                }
            })
            .catch(e => {
                console.log(e)
            })
    })

router
    // This route handles the link from the reset email. User is redirected to form to enter new password
    .route('/update/:id')
    .get((req, res) => {
        const {id} = req.params
        res.render('pages/update', {id})
    })

router
    // This route handles the password change and validations. If all validations are passed, new email is input to database
    .route('/update/:id/passwordchange')
    .post((req, res) => {
        const {id} = req.params
        const {newpassword, confirmpassword} = req.body
        
        let errors = {
            passwordmatch: '',
            password: ''
        }
        
        let allTests = true
        const tests = new Valid
        newpassword != confirmpassword ? errors.passwordmatch = "Passwords must match" : null
        newpassword == '' || confirmpassword == '' ? errors.password = "Field must be completed" : null
        !tests.passTest(newpassword) ? errors.password = "Please enter a valid password" : null
        
        for(let key in errors){
            if(errors[key] != ""){
                allTests = false
                return res.render('pages/update', {id})
            } 
        }

        if(allTests){
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            const hash = bcrypt.hashSync(newpassword, salt)
            db.none("UPDATE users SET password = $1, is_confirmed = B'1' WHERE user_id = $2 ", [hash, id])
                .then(() => {
                    res.render('pages/login')
                })
                .catch(e => {
                    console.log(e)
                })
        }
    })

router
    // This route handles new user confirmation link from email
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params
        db.none("UPDATE users SET is_confirmed = B'1' WHERE user_id = $1 ", [id])
                .then(() => {
                    res.render('pages/login')
                })
                .catch(e => {
                    console.log(e)
                })
        })

module.exports = router



