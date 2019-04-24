const express = require('express');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

// GET Route to get all the users from the daatabase
router.get('/', async (req, res) => {
  try {
    const users = await userDb.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({errorMessage: 'Error retrieving the users'});
  }
});

module.exports = router;
