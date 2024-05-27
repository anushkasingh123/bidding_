const express = require('express');
const bidController = require('../Controllers/bidController');
const { authenticateToken } = require('../Utils/middleware');

const router = express.Router();

router.get('/:itemId/bids', bidController.getBidsForItem);
router.post('/:itemId/bids',authenticateToken, bidController.placeBid);

module.exports = router;