const user = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function hashing(password) {
  return await bcrypt.hash(password, await bcrypt.genSalt());
}

/**
 * This function registers a new user, provided he passes the checks in place
 * @param {String} email           Email user wishes to be register with
 * @param {String} password        Password for the user
 * @param {String} passwordCheck   User's retyped password
 * @param {String} displayName     Username (optional)
 * 
 */
async function registerNewUser(email, password, passwordCheck, displayName,) {
  var realDisplayName = "";

  //make sure all fields have been entered
  if (!email || !password || !passwordCheck)
    return { msg: "Not all fields have been entered" };

  // length of password ust be >= 8
  if (password.length < 8)
    return { msg: "Password must be at least 8 characters long" };

  //password must be typed correctly twice
  if (password != passwordCheck)
    return { msg: "Passwords must match" };

  //user must not exist already
  const existingUser = await user.findOne({ email: email })
  if (existingUser)
    return { msg: "Account with user already exists" };

  //change the dsplayname ot email or the name given
  if (!displayName)
    realDisplayName = email;
  else realDisplayName = displayName;

  //hash password 
  const hash = await hashing(password);

  //create new user object
  const newUser = new User({
    email,
    password: hash,
    displayName: realDisplayName
  });

  //save to database 
  const savedUser = await newUser.save();
  console.log("SAVED USER 53", savedUser)
  return savedUser._id;

}

/**
 * This simply logs someone in to their account provided they have the correct credentials 
 * @param {String} email        Email user entered
 * @param {String} password     Password user entered
 */
async function login(email, password) {
  if (!email || !password)
    return { msg: "Not all fields have been entered" };

  const loginUser = await user.findOne({
    email: email
  })

  if (!loginUser) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, loginUser.password);

  if (!passwordMatch)
    return null;

  return loginUser._id;

}


module.exports = {
  registerNewUser,
  login,
};


