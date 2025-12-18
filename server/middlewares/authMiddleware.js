// middlewares/authenticate.js
const jwt = require("jsonwebtoken");
const { User, Role, Permission } = require("../models");
const { sendErrorResponse } = require("../utils/helper/responseHelper");
const { HTTP_STATUS } = require("../utils/constants");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return sendErrorResponse(
        res,
        "Authorization token required",
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    const token = authHeader.split(" ")[1];
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return sendErrorResponse(
        res,
        "Invalid or expired token",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const user = await User.findOne({
      where: { id: payload.id },
      attributes: ["id", "firstName", "lastName", "email", "phone", "roleId"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
          include: [
            {
              model: Permission,
              as: "permissions",
              attributes: ["id", "name"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!user) {
      return sendErrorResponse(res, "User not found", HTTP_STATUS.UNAUTHORIZED);
    }
    if (!user.roleId) {
      return sendErrorResponse(res, "No role assigned", HTTP_STATUS.FORBIDDEN);
    }

    req.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      roleId: user.role.id,
      role: user.role.name,
      permissions: user.role.permissions.map((p) => p.name),
    };

    console.log("Authenticated user:", req.user);

    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return sendErrorResponse(
      res,
      "Internal Server Error",
      HTTP_STATUS.SERVER_ERROR
    );
  }
};

module.exports = authenticate;
