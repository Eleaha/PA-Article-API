import { Request, Response, NextFunction } from "express";

export const getRunningConfirmation = (
    req:Request,
    res: Response,
    next: NextFunction
) => {
    res.status(200).send({message: "api running successfully"})
}