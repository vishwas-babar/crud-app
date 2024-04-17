export default class ApiError extends Error {

    statusCode: number;
    message: string;
    errors: any[];
    stack: string | undefined;

    constructor(
        statusCode: number,
        message: string = "something went wrong and no message was provided from controller",
        errors: any[] = [],
        stack: string | undefined = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.stack = stack;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
