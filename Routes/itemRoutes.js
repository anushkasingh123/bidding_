const express = require('express');
const itemController = require('../Controllers/itemController');
const {authenticateToken,authorizeRoles} = require('../Utils/middleware.js')
const upload= require('../Utils/multer.js')

const router = express.Router();

router.post('/add-item',authenticateToken,  authorizeRoles(['owner','admin']),upload.single('image'),itemController.createItem);
router.get('/getItem/:id', itemController.getItemById);
router.patch('/update-item/:id',authenticateToken  ,authorizeRoles(['owner', 'admin']),itemController.updateItem);
router.delete('/delete-Item/:id', authenticateToken, authorizeRoles(['owner', 'admin']),itemController.deleteItem);
router.get('/Item-list', itemController.getItems);


module.exports = router;