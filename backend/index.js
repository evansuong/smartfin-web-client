const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//set up express

const app = express();
app.use(express.json()); //read JSON from web (JSON body parser)
app.use(cors());

//if a PORT has been assigned, use it, otherwise use port 9000
const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`The server has started on PORT: ${PORT}`));

//set up Mongoose

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  if (err) throw err;
  console.log("MongoDB connection established");
});

//set up Routes 

//when e start with /users, use the userRouter router
app.use("/users", require("./routes/userRouter"));
