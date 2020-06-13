const Joi = require("@hapi/joi");

export const paymentSchema = Joi.object({
    razorpay_order_id: Joi.string().trim().required(),
    razorpay_payment_id: Joi.string().trim().required(),
    razorpay_signature: Joi.string().trim().required()
}).required();