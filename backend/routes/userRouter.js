const router = require("express").Router();
const login = require("../middleware/login");
const auth = require("../middleware/auth");
const maintain = require("../middleware/maintain");
const jwt = require("jsonwebtoken");
const config = require("../config/config");


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

module.exports = router;