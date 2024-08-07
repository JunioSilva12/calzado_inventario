
const BackblazeB2 = require('backblaze-b2');

const b2 = new BackblazeB2({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID, // Account ID
    applicationKey: process.env.B2_APPLICATION_KEY, // Application Key
  });
  
  async function authorizeB2() {
    await b2.authorize();
  }
  

  

module.exports = { authorizeB2}