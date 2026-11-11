const authService = require('./auth.service');
const asyncHandler = require('../../utils/asyncHandler');
const sendResponse = require('../../utils/responseHandler');

const register = asyncHandler(async (req, res) => {
  const { email, password, name, role } = req.body;
  const result = await authService.register({ email, password, name, role });
  sendResponse(res, 201, true, result, 'User registered successfully');
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  sendResponse(res, 200, true, result, 'User logged in successfully');
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  sendResponse(res, 200, true, user, 'Current user profile fetched successfully');
});

module.exports = {
  register,
  login,
  getMe,
};
