const fs = require('fs').promises;
const path = require('path');
const userValidation = require('../validation/userValidation');
const {getLastId, incrLastId, decrLastId, readCollection} = require('../db/dbUtils');

const User = () => {
    return {
        create: async function({username, password, email}) {
            const {error} = await userValidation({username, password, email});
            if (error) {
                return {
                    message: 'error',
                    reason: error,
                }
            }

            let lastId = await getLastId('users');
            lastId = isNaN(lastId) ? 0 : lastId;

            const user = {id: lastId + 1, username, password, email};

            try {
                await fs.writeFile(path.resolve('db', 'users', `${user.id}.json`), JSON.stringify(user), 'utf-8');

                incrLastId('users', lastId);
                return {
                    message: 'success',
                    data: user,
                }
            } catch(err) {
                return {
                    message: 'error',
                    reason: err,
                }
            }
        },

        getAll: async function() {
            try {
                const response = [];
                const usersCol = await readCollection('users');

                for (const file of usersCol) {
                    const user = await fs.readFile(path.resolve('db', 'users', file), 'utf-8');
                    response.push(JSON.parse(user));
                }

                return {
                    message: 'success',
                    data: response,
                };


            } catch(err) {
                return {
                    message: 'error',
                    reason: `Could not get all users: ${err}`,
                };
            };
        },

        getById: async function(id) {
            try {
                const user = await fs.readFile(path.resolve('db', 'users', `${id}.json`), 'utf-8');

                return {
                    message: 'success',
                    data: JSON.parse(user),
                }
            } catch(err) {
                return {
                    message: 'error',
                    reason: `No user with id ${id}`,
                }
            }
        },

        search: async function (text) {
            const foundUsers = [];
            const usersCol = await readCollection('users');

            for (const userFile of usersCol) {
                let user = await fs.readFile(path.resolve('db', 'users', userFile), 'utf-8');
                user = JSON.parse(user);

                if (user.username.includes(text))
                    foundUsers.push(user);
            }

            if (foundUsers.length == 0)
                return {
                    message: 'error',
                    reason: `No user with ${text} in his username`,
                }

            return {
                message: 'success',
                data: foundUsers,
            }
        },

        updateById: async function(id, data) {
            try {
                const file = await fs.readFile(path.resolve('db', 'users', `${id}.json`), 'utf-8');
                const user = JSON.parse(file);
                console.log(user);
                console.log(data);
                
                Object.assign(user, data);
                console.log(user);
                await fs.writeFile(path.resolve('db', 'users', `${id}.json`), JSON.stringify(user), 'utf-8');

                return {
                    message: 'success',
                    data: user,
                }
            } catch(err) {
                console.log(err);
                return {
                    message: 'error',
                    reason: `No user with id ${id}`,
                }
            }
        },

        deleteById: async function(id) {
            try {
                await fs.unlink(path.resolve('db', 'users', `${id}.json`));

                for (let i = +id + 1; ; i++) {
                    const {message} = await this.updateById(i, {id: i - 1});
                    if (message === 'error')
                        break;
                    fs.rename(path.resolve('db', 'users', `${i}.json`), path.resolve('db', 'users', `${i-1}.json`));
                }
    
                let lastId = await getLastId('users');
                lastId = isNaN(lastId) ? 0 : lastId;
                decrLastId('users', lastId);

                return {
                    message: 'success',
                    data: null,
                }
            } catch(err) {
                return {
                    message: 'error',
                    reason: `No user with id ${id}`,
                }
            }
        }
    }
}

module.exports = User;