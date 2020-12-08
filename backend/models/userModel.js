const mongoose = require("mongoose");

/**
 * The user schema for every individual user
 * @property {String} email - the email for the user (Required for every user)
 * @property {String} password - the password for the user 
 * @property {String} displayName - the name which the user would like to be called bu 
 * @property {String []} rides - an array of RideID's favortied by the user
 */
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  displayName: { type: String, required: true },
  favoriteRides: [{
    type: String
  }]
});

//mongoose.model("collection name", schema we need ot use )
module.exports = User = mongoose.model("user", userSchema);