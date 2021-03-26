const path = require('path');
const {existsSync} = require('fs');

module.exports = (root) => {
    return async (req, res, next) => {
        const p = path.resolve(`${root}${req.path}`);
        const exists = await existsSync(p);

        if (exists) {
            res.sendFile(p);
        } else {
            return next();
        }
    }
}