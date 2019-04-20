import express from 'express';
import User from './controllers/User';
import {
  validateUserBody,
  validateUserId,
  validateResult
} from './middlewares/validator';

const router = express.Router();

// User routes
router.post('/users', validateUserBody, validateResult, User.createUser);
router.get('/users/:userId', validateUserId, validateResult, User.getUser);
router.get('/users', User.getUsers);
router.delete('/users/:userId', validateUserId, validateResult, User.deleteUser);

export default router;
