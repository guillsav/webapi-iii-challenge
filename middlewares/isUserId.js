const userDb = require('../data/helpers/userDb.js');

function isUserId(req, res, next) {
  const id = parseInt(req.body.user_id);
  if (id) {
    userDb.getById(id).then(user => {
      if (user) {
        res.status(200).json(1);
      } else {
        res.status(404).json({errorMessage: `User ID doesn't exist`});
      }
    });
  } else {
    res.status(500).json({errorMessage: 'Error checking user'});
  }
  next();
} // Checks if the user ID provided in the request of a POST or PUT route belongs to an existing user in the database.

module.exports = isUserId;
