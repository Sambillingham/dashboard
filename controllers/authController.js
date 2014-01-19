var Account = require('../models/account'),
    passport = require('passport');


var authController = {

    get : {

        register: function(req, res) {
            res.render('register', {
                title: 'Register',
            });
        },
        login: function(req, res) {

            res.render('login', {
                user : req.user,
                title: 'Login',
                messages: req.flash('error')
            });
        },
        logout : function(req, res) {
            req.logout();
            res.redirect('/');
        },

        ping : function(req, res){
            res.send("pong!", 200);
        }
    },

    post : {

        register : function(req, res) {

            Account.register( new Account({ username : req.body.username }), req.body.password, function(err, account) {
                if (err) {
                    return res.render('register', {info: "Sorry. That username already exists. Try again."});
                }

                passport.authenticate('local')(req, res, function () {
                    res.redirect('/');
                });
            });
        }

    },

    isLoggedIn: function (req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        req.flash('error', 'You need to be logged in to view this page');
        res.redirect('/login');
    }
    
};

module.exports = authController;