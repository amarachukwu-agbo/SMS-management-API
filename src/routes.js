import express from 'express';
import User from './controllers/User';
import {
  validateUserBody,
  validateUserId
} from './middlewares/validator';

const router = express.Router();

// User routes
router.post('/users', validateUserBody, User.createUser);
router.get('/users/:userId', validateUserId, User.getUser);
router.get('/users', User.getUsers);

export default router;
