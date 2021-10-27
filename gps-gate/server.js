const cors = require("cors"),
  bodyParser = require("body-parser"),
  express = require("express"),
  // mongoose = require("mongoose"),
  axios = require('axios')
  config = require("./config");
 const amqp = require('amqplib/callback_api');
  const rabbitURI = 'amqp://localhost'
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

  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = "receive_token";
  
      channel.assertExchange(exchange, 'fanout', {
        durable: false
      });
  
      channel.assertQueue('', {
        exclusive: true
      }, function(error2, q) {
        if (error2) {
          throw error2;
        }
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
        channel.bindQueue(q.queue, exchange, '');
  
        channel.consume(q.queue, function(msg) {
          if(msg.content) {
              console.log(" [x] %s", msg.content.toString());
            }
        }, {
          noAck: true
        });
      });
    });
  });


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
