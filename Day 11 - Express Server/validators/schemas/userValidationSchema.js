const Joi = require('joi');

module.exports = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(6)
        .max(20)
        .required(),

    password: Joi.string()
        .alphanum()
        .min(8)
        .required(),

    email: Joi.string()
        .email()
        .required()
});