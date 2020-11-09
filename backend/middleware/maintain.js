/**
 * This simply deltes a user. You must verify if the 
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
  return await user.findByID(id);
}

module.exports = {
  deleteUser,
  find
}