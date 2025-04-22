import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {Request, Response, NextFunction} from 'express'
dotenv.config();

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.accesstoken as string;
    if (!accessToken)
      return res.status(401).send({ msg: "Unauthorized Request. Please Login/Signup" });
    const user = jwt.verify(accessToken, process.env.ACCESSTOKENKEY!);
    (req as any).user  = user;

    next();
  } catch (err) {
    return res.status(500).send({ msg: "Internal sever error" });
  }
};

