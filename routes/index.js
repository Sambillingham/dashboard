var applicationController = require("../controllers/applicationController"),
    authController = require("../controllers/authController"),
    passport = require('passport');

var routes = {

    init: function (app) {

        app.get('/', applicationController.index);

        app.post('/', applicationController.add);
        
        app.get('/items', authController.isLoggedIn, applicationController.list);

        app.get('/register', authController.get.register);

        app.post('/register', authController.post.register);

        app.get('/login', authController.get.login);

        app.post('/login', passport.authenticate('local', {
                                    successRedirect: '/',
                                    failureRedirect: '/login',
                                    failureFlash: 'oops, looks like like an incorrect email or password',
                                    successFlash: 'Welcome onboard!' }) );

        app.get('/logout', authController.get.logout);

        app.get('/ping', authController.get.ping);

        app.get('/flash', function(req, res){
            req.flash('info', 'Hi there!');
            res.redirect('/');
        });
    }

};

module.exports = routes.init;
