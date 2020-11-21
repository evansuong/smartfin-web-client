const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require("./config/config");

var userRouter = require("./routes/userRouter.js");
var rideRoutes = require("./routes/rideRoutes.js");

//set up express

const app = express();
app.use(express.json()); //read JSON from web (JSON body parser)
app.use(cors());

//if a PORT has been assigned, use it, otherwise use port in config
const PORT = process.env.PORT || config.app.port;
app.listen(PORT, () => console.log(`The server has started on PORT: ${PORT}`));

//set up Mongoose

mongoose.connect(
  config.db_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    else console.log("MongoDB database connection established successfully");
  }
);

//set up Routes

//when e start with /users, use the userRouter router
app.use('/users', userRouter);
app.use('/rides', rideRoutes);
