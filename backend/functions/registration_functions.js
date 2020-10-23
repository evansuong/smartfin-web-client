const router = require("express").Router();
const user = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function hashing(password) {
  return await bcrypt.hash(password, await bcrypt.genSalt());
}

async function registerNewUser(email, password, passwordCheck, displayName, res) {
  var realDisplayName = "";

  if (!email || !password || !passwordCheck)
    return { msg: "Not all fields have been entered" };

  if (password.length < 8)
    return { msg: "Password must be at least 8 characters long" };
  if (password != passwordCheck)
    return { msg: "Enter the same password twice" };
  const existingUser = await User.findOne({ email: email })
  if (existingUser)
    return { msg: "Account with user already exists" };

  if (!displayName)
    realDisplayName = email;
  else realDisplayName = displayName;

  const hash = await hashing(password);

  const newUser = new User({
    email,
    password: hash,
    realDisplayName
  });

  const savedUser = await newUser.save();
  return savedUser;

}

module.exports = {
  registerNewUser
};


