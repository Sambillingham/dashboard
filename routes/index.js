var applicationController = require("../controllers/applicationController"),
    authController = require("../controllers/authController"),
    passport = require('passport');

var routes = {

    init: function (app) {

        app.route('/')
            .get(applicationController.index)
            .post(applicationController.add);

        app.route('/items')
            .get(authController.isLoggedIn, applicationController.list);

        app.route('/register')
            .get(authController.get.register)
            .post(authController.post.register);

        app.route('/login')
            .get(authController.get.login)
            .post(passport.authenticate('local', {
                                    successRedirect: '/',
                                    failureRedirect: '/login',
                                    failureFlash: 'oops, looks like like an incorrect email or password',
                                    successFlash: 'Welcome onboard!' }) );

        app.route('/logout')
            .get(authController.get.logout);

        app.route('/ping')
            .get(authController.get.ping);

        app.route('/flash')
            .get(function(req, res){
                req.flash('info', 'Hi there!');
                res.redirect('/');
            });
    }

};

module.exports = routes.init;
