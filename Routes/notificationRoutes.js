const express = require('express');
const notificationController = require('../Controllers/notifierController');
const { authenticateToken } = require('../Utils/middleware');

const router = express.Router();

router.get('/', authenticateToken, notificationController.getNotifications);
router.post('/mark-read', authenticateToken, notificationController.markNotificationsRead);

module.exports = router;