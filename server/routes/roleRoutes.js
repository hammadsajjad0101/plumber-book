const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');


router.post('/createRole', roleController.createRole);
router.get('/getAllRoles', roleController.getAllRoles);
router.get('/getRole/:id', roleController.getRoleById);
router.put('/updateRole/:id', roleController.updateRole);
router.delete('/deleteRole/:id', roleController.deleteRole);
router.post('/assignPermission/:roleId', roleController.assignPermissionsToRole);
router.get('/getPermissions/:roleId', roleController.getPermissionsOfRole);
module.exports = router;
