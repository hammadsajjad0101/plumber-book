const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const roleRoutes = require('./roleRoutes');
const rolePermissionRoutes = require('./permissionRoutes');

router.use("/users", userRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', rolePermissionRoutes);
module.exports = router;
