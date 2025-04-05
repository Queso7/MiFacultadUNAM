const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/dataController');

router.get('/data', getData); // Ejemplo: GET /api/data

module.exports = router;