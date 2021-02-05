const fs = require('fs');

const promisify = fnWithCallback => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fnWithCallback(...args, (err, data) => {
        if (err) reject(err);

        resolve(data);
      });
    });
  };
};

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);

readFileAsync(__dirname + '/promisify.js')
  .then(data => console.log(data.toString()))
  .catch(err => console.log(err));

readdirAsync(__dirname)
  .then(data => console.log(data))
  .catch(err => console.log(err));
