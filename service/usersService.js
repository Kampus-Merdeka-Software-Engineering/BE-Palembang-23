// userService.js

const User = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUser = async ({ name, email, password, role, hint, images }) => {
  try {
    if (!name || !email || !password || !role) {
      throw new Error("Missing required fields (name, email, password, or role)");
    }

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new Error("User with the same email already exists");
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const hashedHint = await bcrypt.hash(hint, saltRounds);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      hint: hashedHint,
      images,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};
const resetPassword = async (email, hint, newPassword) => {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      const isHintMatch = await bcrypt.compare(hint, user.hint);
  
      if (!isHintMatch) {
        throw new Error("Hint does not match");
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      await user.update({
        password: hashedPassword,
      });
  
      return "Password reset successfully";
    } catch (error) {
      throw error;
    }
  };
  const loginUser = async (email, password) => {
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        throw new Error('Login failed');
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        throw new Error('Login failed');
      }
  
      const accessToken = jwt.sign(user.toJSON(), 'secret_key');
      return accessToken;
    } catch (error) {
      throw error;
    }
  };
  const changeUserPassword = async (userId, currentPassword, newPassword) => {
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        throw new Error('Pengguna tidak ditemukan');
      }
  
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
      if (!isPasswordValid) {
        throw new Error('Password saat ini salah');
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      user.password = hashedPassword;
      await user.save();
  
      return 'Password berhasil diubah';
    } catch (error) {
      throw error;
    }
  };
module.exports = {
  createUser,resetPassword,loginUser,changeUserPassword
};
