const express = require('express');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

// Custom Middleware
function checkForName(req, res, next) {
  const {name} = req.body;
  if (!name) {
    res.status(400).json({errorMessage: 'Please provide a name'});
  } else {
    next();
  }
}

router.post('/', checkForName, (req, res) => {
  const newUser = req.body;
  userDb
    .insert(newUser)
    .then(user => res.status(200).json(user))
    .catch(err =>
      res
        .status(500)
        .json({errorMessage: 'Error creating user in the database'})
    );
});

router.get('/', (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .json(500)
        .json({errorMessage: 'Error retrieving users from the database'})
    );
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  userDb
    .getById(id)
    .then(user => {
      if (user === undefined) {
        res.status(404).json({errorMessage: `User ID doesn't exist`});
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err =>
      res
        .status(404)
        .json({errorMessage: `Error getting the user from the database`})
    );
});

router.put('/:id', checkForName, (req, res) => {
  const {id} = req.params;
  userDb
    .update(id, req.body)
    .then(user => {
      if (user === 0) {
        res.status(404).json({errorMessage: `User ID doesn't exist`});
      } else {
        res.status(202).json(user);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({errorMessage: 'Error updating the user in the database'})
    );
});

module.exports = router;
