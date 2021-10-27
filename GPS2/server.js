const cors = require("cors"),
  bodyParser = require("body-parser"),
  express = require("express"),
  // mongoose = require("mongoose"),
  axios = require('axios')
  config = require("./config");

var server = express();
const corsOptions = {
  origins: ["*"],
  allowHeaders: ["Content-Type", "Content-Length", "Authorization"],
};
server.use(cors(corsOptions));
server.use(require("morgan")("dev"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.listen(config.serverSettings.port, () => {
  console.log(`---${config.name} Service ---`);
  console.log(`Connecting to ${config.name} repository...`);

  console.log("Connected. Starting Server");

  require("./routes")(server);
  server.get('/' , async (req , res ) => {
    try {

      
    }catch(err){
      res.status(500).json({ message : err.message })
    }

  }  )
  console.log(
    `Server started succesfully, running on port: ${config.serverSettings.port}.`
  );


});

process.on("SIGINT", () => {
  process.exit(0);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log(`Closing ${config.name} Service.`);
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log("Server closed.");

    // mongoose.connection.close(false, () => {
    //   console.log("MongoDb connection closed.");
    //   process.exit(0);
    // });
  });
});

module.exports = server;
