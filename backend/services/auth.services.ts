import bcrypt from 'bcrypt';
const {userModel} = require('../models/model.user')
import {createAccessToken, createRefreshToken} from '../utils/tokens';
import * as dotenv from 'dotenv';
dotenv.config();
import {Response} from 'express';
import * as jwt from 'jsonwebtoken';


const authServices = {
  loginService: async ({ email , password }:{email:string, password:string}, res:Response) => {
    try {
      if (!email || !password)
        return res.status(401).send({ msg: "Bad Input" });
      if (email.length < 5 || password.length < 5)
        return { status: 401, payload: { msg: "Credentials too short" } };

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>\-_+=`~;'])[A-Za-z0-9!@#$%^&*(),.?":{}|<>\-_+=`~;']+$/;

      if (!emailRegex.test(email))
        return { status: 401, payload: { msg: "Invalid Email" } };

      if (!passwordRegex.test(password))
        return { status: 401, payload: { msg: "Invalid Input" } };
      const user = await userModel.findOne({ email: email });
      if (!user) return { status: 404, payload: { msg: "User Not Found" } };
      const hashedPassword = await bcrypt.compare(password, user.password);
      const refreshToken = createRefreshToken({ uid: user._id });
      const accessToken = createAccessToken({ uid: user._id });
      res.cookie("refreshToken", refreshToken, {
        path: "/auth",
        httpOnly: true,
      });
      return {
        status: 200,
        payload: { msg: "Logged In", accessToken: accessToken },
      };
    } catch (err:any) {
      console.log("Inner", err.message);
      return { status: 500, payload: { msg: err } };
    }
  },

  signupService: async ({ email, password }:{email:string,password:string}, res:Response) => {
    try {
      if (!email || !password)
        return {
          status: 400,
          payload: { msg: "Please pass all the parameters" },
        };

      if (email.length < 5 || password.length < 5) {
        return {
          status: 400,
          payload: {
            msg: "Please choose username and password of at least of llength 5",
          },
        };
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>\-_+=`~;'])[A-Za-z0-9!@#$%^&*(),.?":{}|<>\-_+=`~;']+$/;

      if (!emailRegex.test(email))
        return { status: 401, payload: { msg: "Please choose a valid email" } };

      if (!passwordRegex.test(password))
        return {
          status: 401,
          payload: {
            msg: "Please Choose a password with at least 1 uppercase and 1 special character",
          },
        };

      const user = await userModel.findOne({ email: email });
      if (user) return { status: 401, payload: { msg: "User Already exists" } };
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({ email: email, password: hashedPassword });
      await newUser.save();
      const accessToken = createAccessToken({ uid: newUser._id });
      const refreshToken = createRefreshToken({ uid: newUser._id });
      res.cookie("refreshToken", refreshToken, {
        path: "/auth",
        httpOnly: true,
      });
      return { status: 201, payload: { accessToken: accessToken } };
    } catch (err:any) {
      console.log(err.message);
      return { status: 500, payload: { msg: String(err) } };
    }
  },

  refreshTokenService: async (refreshToken:string, res:Response) => {
    try {
      if (!refreshToken)
        return { status: 401, payload: { msg: "Unauthorized Request" } };
      const decodedToken = jwt.verify(refreshToken, process.env.REFRESHTOKENKEY!) as jwt.JwtPayload;
      const UID = decodedToken.uid;
      const accessToken = createAccessToken({ uid: UID });
      return {status: 200, payload: { msg: "Token Refreshed", accessToken: accessToken },
      };
    } catch (err:any) {
      console.log(err.message);
      if (err.name === "TokenExpiredError")
        return { status: 440, payload: { msg: "Invalid Token" } };
      return { status: 500, payload: { msg: "Internal server Error" } };
    }
  },

  logoutService: async (refreshToken:string, res:Response) => {
    try {
      if (!refreshToken)
        return res.status(401).send({ msg: "Unauthorized Request" });
      res.clearCookie("refreshToken", { path: "/auth", httpOnly: true });
      return { status: 200, payload: { msg: "Logged out Successfully" } };
    } catch (err:any) {
      console.log(err.message);
      return { status: 500, payload: { msg: "Internal server Error" } };
    }
  },
};

module.exports = authServices;
