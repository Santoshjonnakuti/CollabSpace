const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path : './config.env' });
const URI = process.env.URI;

const DBConnection = async () => {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
    console.log('DB Connected..!');
  } catch (error) {
    console.log('DB Not Connected..!');
  }
};

module.exports = DBConnection;