var amqp = require('amqplib/callback_api');
const rabbitURI = 'amqp://localhost'
//const rabbitURI =   "amqp://api-gps:P%40ssw0rdapi@10.224.187.36:1991/api-gps?heartbeat=60"
exports.receiveGPS = async function (req, res, next) {
  try {
    let data = req.body;
    
    let response = await sendRabit(data);
    if (response === true) {
      
      res.status(200).send({ message:"Success" });
    } else {
      
      res.status(400).send({  message:"Fail"});
    }
    
  } catch (error) {
    res.status(500).send(error);
  }
};

async function sendRabit(data_message) {
  return new Promise((resolve, reject) => {

    try {
      amqp.connect(
        rabbitURI,
        function (error0, connection) {
          if (error0) {
            console.log(error0);
            resolve(false);
            return;
          }
          connection.createChannel(function (error1, channel) {
            try {
              if (error1) {
                console.log(error1);
                resolve(false);
              }
             // var exchange = "receive_gps";
              var exchange = "receive_token";
              var msg = JSON.stringify(data_message);
              console.log(msg)
              channel.assertExchange(exchange, "fanout", {
                durable: false,
              });
              channel.publish(exchange, "", Buffer.from(msg));
            } catch (error) {
              console.log(error);
              resolve(false);
            }
          });
          setTimeout(function () {
            connection.close();
          }, 1000);
        }
      );
      resolve(true);
    } catch (error) {
      console.log(error);
      resolve(false);
    }
  });
}
