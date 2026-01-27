export const handleError = (error, context, res) => {
    console.error(`[❌ Error] ${context}:`, error);
  
    const statusCode = error.statusCode || 500;
  
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Something went wrong",
      context,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  };
  
  export default handleError;
  