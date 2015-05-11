/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  login: function(req, res) {

    passport.authenticate('local', function(err, user, info) {

      if ((err) || (!user)) {
        req.flash('error', info.message);
        return res.redirect('/login');
      }

      req.logIn(user, function(err) {
        if (err) res.send(err);
        var redirect_to = req.session.redirect_to ? req.session.redirect_to : '/admin';
        delete req.session.redirect_to;
        req.flash('success', 'Welcome ' + user.name);
        return res.redirect(redirect_to);
      });

    })(req, res);

    // passport.authenticate('local', function(err, user, info) {
    //   if ((err) || (!user)) {
    //     return res.send({
    //       message: info.message,
    //       user: user
    //     });
    //   }
    //   req.logIn(user, function(err) {
    //     if (err) res.send(err);
    //     return res.send({
    //       message: info.message,
    //       user: user
    //     });
    //   });
    //
    // })(req, res);

  },

  logout: function(req, res) {
    req.logout();
    req.flash('success', 'You\'ve successfully logged out');
    res.redirect('/');
  }

};
