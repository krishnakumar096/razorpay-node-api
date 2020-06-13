const Joi = require("@hapi/joi");

export const refundSchema = Joi.object({
    amount: Joi.number().required()
}).required();