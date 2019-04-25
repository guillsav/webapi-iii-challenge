function checkText(req, res, next) {
  const text = req.body.text;

  if (!text || text === '') {
    res.status(404).json({errorMessage: 'Please provide text for the post'});
  } else {
    next();
  }
} // Checks if the text for the post was provided in the request of a POST or PUT route.

module.exports = checkText;
