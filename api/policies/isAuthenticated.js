module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else{
    req.session.redirect_to = req.url;
    return res.redirect('/login');
  }
};
