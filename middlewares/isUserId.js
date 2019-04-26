const userDb = require('../data/helpers/userDb.js');

function isUserId(req, res, next) {
  const id = parseInt(req.body.user_id);
  userDb.getById(id).then(user => {
    if (user) {
      next();
    } else {
      res.status(404).json({errorMessage: `User ID doesn't exist`});
    }
  });
} // Checks if the user ID provided in the request of a POST or PUT route belongs to an existing user in the database.

module.exports = isUserId;
