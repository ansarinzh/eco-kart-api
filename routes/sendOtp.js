import Joi from 'joi';
import { getOTP } from '../controller/UserController';
const express = require('express');

const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const OTPSchema = Joi.object({
    phoneNo: Joi.string().label('Phone no.').required(),
});

router.post("/", validator.body(OTPSchema), getOTP)
module.exports = router;
