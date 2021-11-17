const mongoose = require("mongoose");
const chalk = require("chalk");
module.exports = {
  connect: (url) => {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false,
        //useCreateIndex: true,
        autoIndex: false,
      })
      .then((db) => {
        console.log(
          chalk.hex("#4DFDBB")("Connected to the Mongodb database. log")
        );
      })
      .catch((err) => {
        console.log(
          chalk.hex("#4DFDBB")(
            "Unable to connect to the Mongodb database. Error:" + err,
            "error"
          )
        );
      });
  },
};
