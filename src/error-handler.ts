import { NextFunction, Request, Response } from "express";

export const handleErrors = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
//defining SQL error codes that indicate a bad request
	const badRequestCodes = ["22008", "22001", "42703"];

//checking if the error passed is a custom error, and sending the status and message if so
	if (err.status && err.message) {
		res.status(err.status).send({ message: err.message });
	}

//checking if the error passed is one related to a bad request
	if (badRequestCodes.includes(err["code"])) {
		res.status(400).send({ message: "Bad request" });
	}

//catching any unhandled errors
	res.status(500).send({ msg: "Internal server error" });
};
