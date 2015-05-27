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
        if (req.path === '/admin/user/create/') {
          return res.redirect('/admin/user/new');
        }
        return res.redirect('/user/new');
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

  edit: function(req, res) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      if (req.path === '/admin/user/edit/' + user.id) {
        res.view({
          user: user,
          admin: true
        });
      } else {
        res.view({
          user: user,
          admin: false
        });
      }
    });
  },

  update: function(req, res, next) {

    var user = User.findOne(req.param('id')).exec(function(err, user) {

      if (err) {
        req.flash('error', err);
        if (req.path === '/admin/user/update/' + req.param('id')) {
          return res.redirect('/admin/user/edit/' + req.param('id'));
        }
        return res.redirect('/user/edit/' + req.param('id'));
      }

      if (req.body.name) {
        user.name = req.body.name;
      }

      if (req.body.email) {
        user.email = req.body.email;
      }

      if (req.body.password) {
        console.log(user.password, req.body.password);
        user.password = req.body.password;
      }

      if (req.body.confirmation) {
        console.log(user.confirmation, req.body.confirmation);
        user.confirmation = req.body.confirmation;
      }

      if (req.body.admin) {
        user.admin = req.body.admin;
      }

      user.save(function(err) {
        if(err) {
          req.flash('error', err);
          if (req.path === '/admin/user/update/' + req.param('id')) {
            return res.redirect('/admin/user/edit/' + req.param('id'));
          }
          return res.redirect('/user/edit/' + req.param('id'));
        } else {
          if (req.path === '/admin/user/update') {
            req.flash('success', 'User ' + user.name + ' updated.');
            return res.redirect('/admin/user/index');
          }

          req.flash('success', 'User ' + user.name + ' updated.');
          return res.redirect('/user/show/' + req.param('id'));
        }
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
