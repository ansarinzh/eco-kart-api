import { sendSMSUsingTwillio } from '../helpers/twillio';
import Verify from '../models/OTPVerify';

export const getOTP = async (req, res) => {
    try {
        let otp = Math.floor(100000 + Math.random() * 900000);
        req.body.otp = 123456;
        // await insertOTP(req.body);
        await Verify.create(req.body)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            });
        let sms = {
            body: `Your verification code is ${otp}. Please do not share with anyone.`,
            to: req.body.phoneNo,
        };
        // await sendSMSUsingTwillio(sms);
        res.status(200).json({
            success: true,
            message: 'OTP Sent successfully',
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        // const data = await checkOTP(req.body);
        const validate = await Verify.findOne({ phoneNo: req.body.phoneNo })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err.message);
            });
        if (validate.otp === req.body.otp) {
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'OTP verified successfully',
                    data: validate,
                });
        } else {
            return res
                .status(400)
                .json({ statusCode: 400, message: 'Invalid OTP' });
        }
        // res.status(200).json({
        //     statusCode: 200,
        //     success: true,
        //     message: 'Phone No. verified successfully',
        // });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
