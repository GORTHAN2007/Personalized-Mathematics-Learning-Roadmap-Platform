const sendResponse = (res, statusCode, success, data = null, message = '') => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

module.exports = sendResponse;
