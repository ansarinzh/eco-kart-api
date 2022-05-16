import Joi from 'joi';
const express = require('express');
import { verifyOTP} from '../controller/UserController'

const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const OTPSchema = Joi.object({
    phoneNo: Joi.string().label('Phone no.').required(),
    otp: Joi.number().required().label("OTP")
});

router.post("/", validator.body(OTPSchema), verifyOTP)

module.exports = router;