/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	// This loads the sign-up page --> user/new.ejs
  new: function(req, res) {
    res.view('user/new');
  },

	create: function(req, res, next) {

    var userObj = {
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password'),
      confirmation: req.param('confirmation')
    };

    User.create(userObj).exec(function(err, user) {

      // // If there's an error
      if (err) {
				req.flash('error', err);
				return res.redirect('user/new');
			}

      // Log user in
      req.session.authenticated = true;
      req.session.user = user;

      req.flash('success', 'User ' + user.name + ' created and logged-in.');
      return res.redirect('/user/show/' + user.id);
    });
  },

  // render the profile view (e.g. /views/show.ejs)
  show: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  }

};
