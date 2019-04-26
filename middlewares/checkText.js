function checkText(req, res, next) {
  const {text} = req.body;
  if (!text) {
    res.status(404).json({errorMessage: 'Please provide text for the post'});
  } else {
    next();
  }
} // Checks if the text for the post was provided in the request of a POST or PUT route.

module.exports = checkText;
