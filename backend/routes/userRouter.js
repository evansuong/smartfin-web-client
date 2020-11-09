const router = require("express").Router();
const login = require("../middleware/login");
const auth = require("../middleware/auth");
const maintain = require("../middleware/maintain");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { find } = require("../models/userModel");

/**
 * Register a new user
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, displayName } = req.body;

    const savedUser = await login.registerNewUser(email, password, passwordCheck, displayName);

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

/**
 * Login with registered user
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await login.login(email, password);

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

/**
 * Delete a user
 */
router.delete("/delete", async (req, res) => {
  try {
    const verifiedId = await auth.auth(req.header("auth-token"));
    if (verifiedId == null)
      return res.status(401).json({
        msg: "Access Denied"
      });
    const userDeleted = await maintain.deleteUser(verifiedId);
    res.json(userDeleted);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

/**
 * See if JWT token is valid or not 
 */
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.json(false);
    const verifiedId = auth.auth(token);
    if (verifiedId == null) {
      return res.json(false);
    }
    const user = await maintain.find(verifiedId);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
})

module.exports = router;