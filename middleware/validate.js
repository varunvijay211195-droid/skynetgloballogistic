const { body, param, validationResult } = require('express-validator');

// Middleware to check validation results and return errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Contact form validation rules
const validateContact = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ max: 100 }).withMessage('Name must be under 100 characters')
    .escape(),
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ max: 100 }).withMessage('Company must be under 100 characters')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .escape(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 2000 }).withMessage('Message must be under 2000 characters')
    .escape(),
  handleValidationErrors
];

// Shipment creation validation rules
const validateShipment = [
  body('trackingCode')
    .optional()
    .trim()
    .matches(/^SKY-\d{6}$/).withMessage('Tracking code must be in format SKY-XXXXXX'),
  body('status')
    .optional()
    .isIn(['Information Received', 'In Transit', 'Customs', 'Out for Delivery', 'Delivered'])
    .withMessage('Invalid shipment status'),
  body('origin')
    .optional()
    .trim()
    .escape(),
  body('destination')
    .optional()
    .trim()
    .escape(),
  handleValidationErrors
];

// Quote validation rules
const validateQuote = [
  body('origin')
    .trim()
    .notEmpty().withMessage('Origin is required')
    .escape(),
  body('destination')
    .trim()
    .notEmpty().withMessage('Destination is required')
    .escape(),
  body('freightType')
    .notEmpty().withMessage('Freight type is required')
    .isIn(['air', 'ocean-fcl', 'ocean-lcl', 'land'])
    .withMessage('Invalid freight type'),
  body('weight')
    .isFloat({ min: 0.1 }).withMessage('Weight must be greater than 0'),
  body('volume')
    .isFloat({ min: 0.1 }).withMessage('Volume must be greater than 0'),
  body('estimatedCost')
    .isFloat({ min: 0 }).withMessage('Estimated cost must be a positive number'),
  body('contactEmail')
    .optional({ values: 'falsy' })
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  handleValidationErrors
];

// Validate MongoDB ObjectId in URL params
const validateObjectId = [
  param('id')
    .isMongoId().withMessage('Invalid record ID'),
  handleValidationErrors
];

module.exports = {
  validateContact,
  validateShipment,
  validateQuote,
  validateObjectId,
  handleValidationErrors
};
