const userValidationSchema = require('./schemas/userValidationSchema');

module.exports = () => {
    return {
        validate,
    }

    async function validate(user) {
        return await userValidationSchema.validate(user);
    }
}