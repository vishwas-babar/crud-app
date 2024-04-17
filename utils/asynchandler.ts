import { Response, Request } from "express";

const asynchandler = (fn: Function) => async (req: Request, res: Response, next: Function) => {
    try {
        await fn(req, res, next);
    } catch (error: any) {
        console.log(error)
        res.status(error.statusCode || 500).json({
            message: error.message || "something went wrong from async handler",
            error: error || "not got error"
        })
    }
}

export default asynchandler;