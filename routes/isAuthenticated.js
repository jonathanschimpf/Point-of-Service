// This is middleware for restricting routes a user is not allowed to visit if not logged in
function isAuthenticated(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }
  // If the user isn't logged in, redirect them to the login page
  // return res.redirect("/");
  return res.status(401).send('Unauthorized')
};

module.exports = isAuthenticated;