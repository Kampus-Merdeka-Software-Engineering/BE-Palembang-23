const authenticateToken = require('../middleware/auth')

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  };
  
  module.exports = {
    logout,
  };