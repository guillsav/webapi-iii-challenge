function checkuserId(req, res, next) {
  const id = req.body.user_id;

  if (!id || id === '') {
    res
      .status(404)
      .json({errorMessage: 'Please provide a user ID for the post'});
  } else {
    next();
  }
} // Checks if the user ID was provided in the request of a POST or PUT route.

module.exports = checkuserId;
