const router = require("express").Router();
const registration_functions = require("../functions/registration_functions");
const functions = require("../functions/registration_functions");
const jwt = require("jsonwebtoken");
const config = require("../config/config");


router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, displayName } = req.body;

    const savedUser = await functions.registerNewUser(email, password, passwordCheck, displayName);

    if (savedUser.hasOwnProperty("msg")) {
      res.status(400).json(savedUser);
    } else {
      res.json(savedUser);
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }

})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await registration_functions.login(email, password);

    if (user == null)
      return res.status(400).json({ msg: "Check email/password" });

    const token = jwt.sign({ id: user._id }, config.jwt_token);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.displayName,
        email: user.email
      }
    })

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
})

module.exports = router;