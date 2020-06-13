const Joi = require("@hapi/joi");

export const orderSchema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().valid("INR")
}).required();