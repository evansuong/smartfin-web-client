
async function deleteUser(id) {
  return await user.findByIdAndDelete(id);
}

module.exports = {
  deleteUser
}