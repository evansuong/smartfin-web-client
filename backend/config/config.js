require('dotenv').config();
// input parameters based on env
const dev = {
  app: {
    port: 9000
  },
  db_url: process.env.MONGO_DB
}

module.exports = dev;