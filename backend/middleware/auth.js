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
  }
  catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { auth };
