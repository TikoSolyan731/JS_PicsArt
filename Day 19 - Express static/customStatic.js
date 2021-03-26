const path = require('path');
const Promise = require('bluebird');
const glob = Promise.promisify(require('glob'));

module.exports = (root) => {
    return async (req, res, next) => {
        const files = await glob(`${root}/**/*`);

        if (!files.includes(`${root}${req.path}`)) {
            return next();
        }

        res.sendFile(path.resolve(`${root}${req.path}`));
    }
}