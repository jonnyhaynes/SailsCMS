/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	// This loads the sign-up page --> user/new.ejs
  new: function(req, res) {
    res.view('user/new', {
      admin: false
    });
  },

	create: function(req, res, next) {

    var userObj = {
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password'),
      confirmation: req.param('confirmation'),
      admin: req.param('admin')
    };

    User.create(userObj).exec(function(err, user) {

      // // If there's an error
      if (err) {
				req.flash('error', err);
				return res.redirect('user/new');
			}

      if (req.path === '/admin/user/create') {
        req.flash('success', 'User ' + user.name + ' created.');
        return res.redirect('/admin/user/index');
      }

      // Log user in
      req.login(user, function(err) {
        if (err) { return next(err); }
        req.flash('success', 'User ' + user.name + ' created and logged-in.');
        return res.redirect('/user/show/' + user.id);
      });

    });
  },

  show: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },

  index: function(req, res) {
    if (req.param('type') == 'admin') {
      User.find().where({
        admin: true
      }).exec(function(err, users) {
        if (err) { return res.serverError(err); }
        return res.view('user/index', {
          users: users,
          admin: true
        });
      });
    } else {
      User.find().where({
        admin: false
      }).exec(function(err, users) {
        if (err) { return res.serverError(err); }
        return res.view('user/index', {
          users: users,
          admin: false
        });
      });
    }

  },

  destroy: function(req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);

      if (!user) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);

        req.flash('error', user.name + ' deleted!');
        return res.redirect('admin/user/index');

      });

    });
  },

  indexRedirect: function(req, res) {
    return res.redirect('admin/user/index');
  }

};
