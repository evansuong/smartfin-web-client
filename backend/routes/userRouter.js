const router = require("express").Router();
const functions = require("../functions/registration_functions");


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

module.exports = router;