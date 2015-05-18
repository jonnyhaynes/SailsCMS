/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, next) {

  // User is allowed, proceed to controller
  if (req.user && req.user.admin) {
    return next();
  }

  // User is not allowed
  else {
    req.flash('error', 'You must be an admin to access that page.');
    res.redirect('/login');
    return;
  }
};
