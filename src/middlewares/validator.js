import { query, body } from 'express-validator/check';

export const validateUserBody = [
  query('userId', 'userId must be a positive integer')
    .isInt({ gt: 0 })
]

export const validateUserId = [
  body('name',
    'Name  cannot be empty and must be between 3 and 50 characters long')
    .trim().isLength({ min: 3, max: 50 }),
  body('phoneNumber',
    'phoneNumber cannot be empty and must be more than 7 digits')
    .trim({ min: 7 })
]
