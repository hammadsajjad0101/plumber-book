const { sendResponseWithError } = require("../utils/helper/responseHelper");
const { HTTP_STATUS } = require("../utils/constants");

const checkPermission = (permissionName) => {
  return (req, res, next) => {
    const perms = req.user?.permissions;
    if (!perms) {
      return sendResponseWithError(
        res,
        "Unauthorized",
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    if (!perms.includes(permissionName)) {
      return sendResponseWithError(res, "Forbidden", HTTP_STATUS.FORBIDDEN);
    }
    next();
  };
};

module.exports = { checkPermission };
