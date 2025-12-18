const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");

router.post("/createPermission", permissionController.createPermission);
router.get("/getAllPermissions", permissionController.getAllPermissions);
router.get("/getPermission/:id", permissionController.getPermissionById);
router.put("/updatePermission/:id", permissionController.updatePermission);
router.delete("/deletePermission/:id", permissionController.deletePermission);

module.exports = router;
