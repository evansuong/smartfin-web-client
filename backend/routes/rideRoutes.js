const router = require("express").Router();
const auth = require("../middleware/auth");
const maintain = require("../middleware/maintain");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

router.post("/addRide", async (req, res) => {
  try {
    const verifiedId = await auth.auth(req.header("auth-token"));
    if (verifiedId == null)
      return res.status(401).json({
        msg: "Access Denied"
      });
    const user = await maintain.addRide(verifiedId, req.body.rideId);
    return res.json(user);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
})

module.exports = router;