const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skynet-admin-secret-key-change-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '8h';

// Middleware to verify JWT token from Authorization header
const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach admin info to request
    req.admin = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please login again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid token. Access denied.'
    });
  }
};

// Generate JWT token
const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      username: admin.username,
      displayName: admin.displayName,
      role: admin.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
};

module.exports = { requireAuth, generateToken, JWT_SECRET };
