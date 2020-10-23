const router = require("express").Router();
const functions = require("../functions/registration_functions");
const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, displayName } = req.body;

    const savedUser = await functions.registerNewUser(email, password, passwordCheck, displayName, res);

    res.json(savedUser);

    /** 
    var realDisplayName = "";
    const { email, password, passwordCheck, displayName } = req.body;

    //validation 
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    if (password.length < 8)
      return res.status(400).json({ msg: "Password must be at least 8 characters long" });
    if (password != passwordCheck)
      return res.status(400).json({ msg: "Enter the same password twice" });
    const existingUser = await User.findOne({ email: email })
    if (existingUser)
      return res.status(400).json({ msg: "Account with user already exists" });
    if (!displayName)
      realDisplayName = email;
    else realDisplayName = displayName;

    const salt = await bcrypt.genSalt();
    const hashing = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashing,
      realDisplayName
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
    **/

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }

})

module.exports = router;