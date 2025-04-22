// import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken'

export const createRefreshToken = (payload:object) => {
    return jwt.sign(payload, process.env.REFRESHTOKENKEY!, { expiresIn: "7d" });
  };
  
  export const createAccessToken = (payload:object) => {
    return jwt.sign(payload, process.env.ACCESSTOKENKEY!, { expiresIn: "6h" });
  };

exports = {createRefreshToken, createAccessToken}