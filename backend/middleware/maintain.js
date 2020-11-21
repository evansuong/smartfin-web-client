const User = require("../models/userModel")

/**
 * This simply deletes a user. You must verify if the 
 * user is permittted to delte this id BEFORE you call this function
 * @param {String} id    if of user you want to delete
 */
async function deleteUser(id) {
  return await user.findByIdAndDelete(id);
}
/**
 * THis simply finds a user
 * @param {String} id    id of user you want to find
 */
async function find(id) {
  return await User.findById(id);
}

/**
 * This adds a favorite ride for the user 
 * @param {String} id      id of user the ride needs to be added to
 * @param {String} rideId   ride ID for the ride needed to be added
 * @return {[String]}       Array of Ride Id's for the user 
 */
async function addRide(id, rideId) {
  await User.findByIdAndUpdate(
    id, {
    $addToSet: { "favoriteRides": rideId }
  }
  )
  const user = await User.findById(id);
  return user.favoriteRides;
}

/**
 * This deletes a favorite ride for the user
 * @param {*} id          id of the yser
 * @param {*} rideId      rideId to be deleted
 * @return {[String]}     array of updated rides
 */
async function deleteRide(id, rideId) {
  await User.findByIdAndUpdate(
    id, {
    $pull: { "favoriteRides": rideId }
  }
  )
  const user = await User.findById(id);
  return user.favoriteRides;
}

module.exports = {
  deleteUser,
  find,
  addRide,
  deleteRide,
}