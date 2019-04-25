function checkForName(req, res, next) {
  const {name} = req.body;
  if (!name) {
    res.status(400).json({errorMessage: 'Please provide a name'});
  } else {
    next();
  }
} // Checks if name was provided in the request body of a POST or PUT request

module.exports = checkForName;
