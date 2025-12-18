const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");
const { PERMISSIONS } = require("../utils/permissions");
const { checkPermission } = require("../middlewares/permissionMiddleware");

router.post("/register",userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser/:id", userController.getUserById);
router.patch("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
