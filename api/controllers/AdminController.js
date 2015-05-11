/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res) {
    return res.view('admin/pages/index');
  },

  new: function(req, res) {
    res.view('user/new', {
      admin: true
    });
  }

};
