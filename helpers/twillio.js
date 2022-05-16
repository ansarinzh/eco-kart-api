const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.FROM_PHONE;
const client = require('twilio')(accountSid, authToken);



export const sendSMSUsingTwillio = async(payload)=>{
    client.messages
    .create({
       body: payload.body,
       from: fromPhone,
       to: payload.to
     })
    .then(message => console.log(message));
}
