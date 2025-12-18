const { HTTP_STATUS } = require("../constants");

const sendSuccessResponse = (
  res,
  data = null,
  message = "Success",
  code = HTTP_STATUS.OK
) => {
  return res.status(code).json({
    success: true,
    message,
    data,
    code,
  });
};

const sendErrorResponse = (
  res,
  message = "Something went wrong",
  code = HTTP_STATUS.SERVER_ERROR
) => {
  return res.status(code).json({
    success: false,
    message,
    code,
  });
};

module.exports = { sendSuccessResponse, sendErrorResponse };
