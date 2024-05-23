"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.handleError = void 0;
const handleError = (res, err) => {
    const statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        message = `Product with name "${err.keyValue.name}" already exists`;
    }
    if (err.name === 'ZodError') {
        message = err.issues[0].message;
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.handleError = handleError;
const globalErrorHandler = (err, req, res, next) => {
    (0, exports.handleError)(res, err);
};
exports.globalErrorHandler = globalErrorHandler;
