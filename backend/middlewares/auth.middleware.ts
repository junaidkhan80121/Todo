import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isLoggedIn = async (req: any, res: any, next: any) => {
  try {
    const accessToken = req.headers.accesstoken;
    if (!accessToken)
      return res.status(401).send({ msg: "Unauthorized Request. Please Login/Signup" });
    const user = jwt.verify(accessToken, process.env.ACCESSTOKENKEY!)// as string);
    req.user = user;
    next();
  } catch (err: any) {
    return res.status(500).send({ msg: "Internal sever error" });
  }
};

exports = isLoggedIn;
