const jwt = require("jsonwebtoken");

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESHTOKENKEY, { expiresIn: "7d" });
  };
  
  const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESSTOKENKEY, { expiresIn: "6h" });
  };

module.exports = {createRefreshToken, createAccessToken}