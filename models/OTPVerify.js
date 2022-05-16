const mongoose = require('mongoose');

const OTPVerification = new mongoose.Schema({
    phoneNo: {
        type: String,
        required: true,
    },
    otp:{
        type: Number,
        required: true
    }
});
const OtpVerify = mongoose.model("OTPVerify", OTPVerification);
export default OtpVerify;