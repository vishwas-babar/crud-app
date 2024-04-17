"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message = "something went wrong and no message was provided from controller", errors = [], stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.stack = stack;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
