const Joi = require('joi');

const userSchema = Joi.object({
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

module.exports = async (user) => {
    return await userSchema.validate(user);
}