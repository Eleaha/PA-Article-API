import { NextFunction, Request, Response } from "express";

export const handleErrors = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const badRequestCodes = ["22008", "22001", "42703"];

	if (err.status && err.message) {
		res.status(err.status).send({ message: err.message });
	}

	if (badRequestCodes.includes(err["code"])) {
		res.status(400).send({ message: "Bad request" });
	}

	res.status(500).send({ msg: "Internal server error" });
};
