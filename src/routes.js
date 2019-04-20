import express from 'express';
import User from './controllers/User';
import Message from './controllers/Message';
import {
  validateUserBody,
  validateUserId,
  validateResult,
  validateMessageParams,
  validateMessageBody,
  checkUserExists,
  validateMessageUsers
} from './middlewares/validator';

const router = express.Router();

// User routes
router.post(
  '/users',
  validateUserBody,
  validateResult,
  User.createUser
);
router.get(
  '/users/:userId',
  validateUserId,
  validateResult,
  User.getUser
);
router.get('/users', User.getUsers);
router.delete(
  '/users/:userId',
  validateUserId,
  validateResult,
  User.deleteUser
);


//SMS routes
router.post(
  '/messages',
  validateMessageBody,
  validateResult,
  validateMessageUsers,
  Message.createMessage
);
router.get(
  '/users/:userId/messages',
  validateMessageParams,
  validateResult,
  checkUserExists,
  Message.getMessages
);
router.get(
  '/users/:userId/messages/:messageId',
  validateMessageParams,
  validateResult,
  checkUserExists,
  Message.getMessage
);

export default router;
