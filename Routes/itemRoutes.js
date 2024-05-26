const express = require('express');
const itemController = require('../Controllers/itemController');
const {authenticateToken,authorizeRoles} = require('../Utils/middleware.js')

const router = express.Router();

router.post('/add-item', authenticateToken, authorizeRoles('buyer', 'admin'), itemController.createItem);
router.get('/getItem/:id', itemController.getItemById);
router.patch('/update-item', authenticateToken, authorizeRoles('user', 'admin'),itemController.updateItem);
router.delete('/delete-Item/:id', authenticateToken, authorizeRoles('user', 'admin'),itemController.deleteItem);
router.get('/Item-list', itemController.getItems);

module.exports = router;