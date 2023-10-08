
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const User = require('../model/users');
const userService = require('../service/usersService');

const userCreate = async (req, res) => {
  try {
    const { name, email, password, role, hint, images } = req.body;
    const newUser = await userService.createUser({ name, email, password, role, hint, images });

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, hint, newPassword } = req.body;

    if (!email || !hint || !newPassword) {
      return res.status(400).json({
        message: "Missing required fields (email, hint, or newPassword)",
      });
    }

    const result = await userService.resetPassword(email, hint, newPassword);

    res.status(200).json({
      message: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to reset password",
      error: error.message,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const accessToken = await userService.loginUser(email, password);

    res.cookie('token', accessToken, { httpOnly: true });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const result = await userService.changeUserPassword(userId, currentPassword, newPassword);

    res.status(200).json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengganti password' });
  }
};
  
  

module.exports =  {
  userCreate,resetPassword,login,changePassword
};