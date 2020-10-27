const jwt = require("jsonwebtoken");
const config = require("../config/config");


async function auth(token) {
  try {
    if (!token)
      return null;
    const verified = jwt.verify(token, config.jwt_token);

    if (!verified)
      return null;

    return verified.id;
  } catch (err) {
    console.log(err);
    return null;
  }
}

/*
const auth = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res.status(401).json({
        msg: "Access Denied"
      })
    const verified = jwt.verify(token, config.jwt_token);

    if (!verified) {
      return res.status(401).json({
        msg: "Token Verification Failed"
      })
    }

    req.user = verified.id;
    next();

  }
  catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
  */

module.exports = { auth };
