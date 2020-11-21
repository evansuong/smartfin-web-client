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

async function addRide(id, rideId) {
  await User.findByIdAndUpdate(
    id, {
    $addToSet: { "favoriteRides": rideId }
  }
  )
  const user = await User.findById(id);
  return user.favoriteRides;

}

module.exports = {
  deleteUser,
  find,
  addRide
}