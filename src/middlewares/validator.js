import { param, body, validationResult } from 'express-validator/check';
import models from '../../models';

export const validateUserId = [
  param('userId', 'userId must be a positive integer')
    .isInt({ gt: 0 })
]

export const validateUserBody = [
  body('name',
    'Name  cannot be empty and must be between 3 and 50 characters long')
    .trim().isLength({ min: 3, max: 50 }),
  body('phoneNumber',
    'phoneNumber cannot be empty and must be more than 7 digits')
    .trim({ min: 7 })
]

export const validateMessageParams = [
  param('userId', 'userId must be a positive integer')
    .isInt({ gt: 0 }),
  param('messageId', 'messageId must be a positive integer')
    .isInt({ gt: 0 }).optional()
]

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
}

export const validateMessageBody = [
  body('content',
    'content cannot be empty and must be a positive integer')
    .trim().isLength({ min: 3, max: 50 }),
  body('senderId',
    'senderId cannot be empty and must be a positive integer')
    .isInt({ gt: 0 }),
  body('recipientId',
    'recipientId cannot be empty and must be a positive integer')
    .isInt({ gt: 0 })
]

export const checkUserExists = async (req, res, next) => {
  const { userId } = req.params;
  const user = await models.User.findByPk(userId);
  if (!user) {
    return res.status(404).json({
      error: 'User does not exist',
    });
  }
  next();
}
