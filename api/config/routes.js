const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/search', dataController.searchData);

module.exports = router;
