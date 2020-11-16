const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  displayName: { type: String, required: true },
});

//mongoose.model("collection name", schema we need ot use )
module.exports = User = mongoose.model("user", userSchema);