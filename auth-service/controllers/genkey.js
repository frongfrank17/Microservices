const configs = require('../config')
const crypto = require('crypto');
const hashHmacSha256 = string => crypto
  .createHmac('sha256', configs.tokenSettings.publicKey)
  .update(string)
  .digest('hex');
// Server-Side
function genKey() {

    //console.log("rawKEY"+rawKey)
    const key = hashHmacSha256( configs.tokenSettings.publicKey);
    return key;
  }
  module.exports = genKey