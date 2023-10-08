const express = require('express');
const router = express.Router();
// const controller = require('../controller/index');
const userController = require('../controller/usercontrollers');
const User = require('../model/users');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); 
const authenticateToken = require('../middleware/auth')
router.use(express.json());
router.use(cookieParser()); 

// const authenticateToken = require('../middleware/authMiddleware');
// function authenticateToken(req, res, next) {
//     const token = req.cookies.token;
//     if (token == null) return res.sendStatus(401);
  
//     jwt.verify(token, 'secret_key', (err, user) => {
//       if (err) return res.sendStatus(403);
//       req.user = user;
//       next();
//     });
//   }
  
// router.get('/', controller.users.getAll);
// router.post('/', controller.users.getCreate);
// router.post('/create', controller.users.getCreate);
// router.post('/create_user', userController.create_user);
// router.put('/:id', controller.users.getUpdate);
// router.delete('/:id', controller.users.getDelete);
router.post('/reset-password', userController.resetPassword);
router.post('/login', userController.login);
router.post('/create_user', userController.userCreate);
router.post('/change-password', authenticateToken,userController.changePassword);


module.exports = router;
