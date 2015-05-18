/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res) {

    User.count(function (err, num) {
      if(err) {
        return console.log(err);
      }

      res.view('admin/pages/index', {
        userCount: num
      });

    });

  },

  new: function(req, res) {
    res.view('user/new', {
      admin: true
    });
  }

};
