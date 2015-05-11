module.exports = function(req, res, next) {
  console.log('authenticated ' + req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else{
    req.session.redirect_to = req.url;
    return res.redirect('/login');
  }
};
