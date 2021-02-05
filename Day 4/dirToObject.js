// let pathsToHash = function (paths) {
//   let hash = {};

//   paths.forEach(element => {
//     let path = element.split('/');

//     pathToObj(path, hash);
//   });

//   return JSON.stringify(hash, null, 4);
// };

// function pathToObj(path, obj) {
//   if (path.length == 0) return;

//   let current = path[0];

//   if (!obj.hasOwnProperty(current)) obj[current] = {};

//   if (current.includes('.')) obj[current] = true;

//   return pathToObj(path.slice(1), obj[current]);
// }

// let paths = [
//   'day-1/src/index.js',
//   'day-1/src/style.css',
//   'readme.txt',
//   'photos/dilijan/2020/bro.png',
//   'photos/dilijan/emptyFolder',
// ];

// console.log(pathsToHash(paths));

const fs = require('fs').promises;

const dirToObject = dir => {
  let obj = {};

  return _dirToObj(dir, obj);

  function _dirToObj(dir, obj) {
    return fs
      .readdir(dir)
      .then(dirContent => {
        if (dirContent.length === 0) return {};

        for (const item of dirContent) {
          if (isTxtFile(item)) {
            obj[item] = true;
          } else {
            obj[item] = {};

            _dirToObj(dir + `/${item}`, obj[item]).then(res => {
              obj[item] = res;
            });
          }
        }
      })
      .then(() => obj);
  }

  function isTxtFile(str) {
    return str.endsWith('.txt');
  }
};

//fs.readdir(__dirname + '/folder 1', (err, data) => console.log(data));
dirToObject(__dirname + '/testRoot').then(obj => console.log(obj));
