const express = require('express');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

// GET Route to get all the users from the daatabase.
router.get('/', async (req, res) => {
  try {
    const users = await userDb.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({errorMessage: 'Error getting the users'});
  }
});

// GET route to get a single user based on the id parameter in the url.
router.get('/:id', async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id, req.body);
    if (!user) {
      res.status(404).json({errorMessage: 'User not found'});
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error getting the user'});
  }
});

module.exports = router;
