import { param, body, validationResult } from 'express-validator/check';

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
