// globalErrorHandler.js or placed at the bottom of app.js

app.use((err, req, res, next) => {
    // 1. Fallback values if the error isn't an instance of ApiError
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = err.errors || [];

    // 2. Optional: Log the error for the developer (useful in production)
    console.error(`[Error] ${req.method} ${req.url} - Status: ${statusCode}`);
    console.error(err.stack);

    // 3. Send the structured response back to Postman/client
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        errors: errors,
        // Only show stack trace in development mode for security
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
