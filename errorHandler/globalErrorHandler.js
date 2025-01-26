const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);
  
    // Set a default status code and error message
    const statusCode = err.statusCode || 500; // 500 for Internal Server Error
    const message = err.message || "Internal Server Error";
  
    // Send error response
    res.status(statusCode).json({
      success: false,
      error: message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack, // Show stack only in development
    });
  };
  module.exports = errorHandler
  