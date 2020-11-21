const router = require("express").Router();
const auth = require("../middleware/auth");
const maintain = require("../middleware/maintain");

/**
 * This adds a ride to the user's favorite ride
 */
router.post("/addRide", async (req, res) => {
  try {
    const verifiedId = await auth.auth(req.header("auth-token"));
    if (verifiedId == null)
      return res.status(401).json({
        msg: "Access Denied"
      });
    const rides = await maintain.addRide(verifiedId, req.body.rideId);
    return res.json(rides);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
})

/**
 * This deletes a ride from the user's favorite rides
 */
router.post("/deleteRide", async (req, res) => {
  try {
    const verifiedId = await auth.auth(req.header("auth-token"));
    if (verifiedId == null)
      return res.status(401).json({
        msg: "Access Denied"
      });
    const rides = await maintain.deleteRide(verifiedId, req.body.rideId);
    return res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
})

module.exports = router;