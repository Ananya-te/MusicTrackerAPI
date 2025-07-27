// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    success: false,
    message: 'Internal Server Error',
    statusCode: 500
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    error.message = 'Validation Error';
    error.statusCode = 400;
    error.details = err.message;
  } else if (err.name === 'CastError') {
    error.message = 'Invalid ID format';
    error.statusCode = 400;
  } else if (err.code === 'SQLITE_CONSTRAINT') {
    error.message = 'Database constraint violation';
    error.statusCode = 400;
  } else if (err.code === 'ENOENT') {
    error.message = 'Resource not found';
    error.statusCode = 404;
  } else if (err.statusCode) {
    error.statusCode = err.statusCode;
    error.message = err.message;
  }

  // Send error response
  res.status(error.statusCode).json(error);
};

// 404 handler for undefined routes
const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFound
}; 