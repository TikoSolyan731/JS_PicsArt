const fs = require('fs').promises;

const dirToObject = dir => {
  let obj = {};
  let folders = [];

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
            folders.push(obj[item]);
          }
        }

        for (const folder of folders) {
          _dirToObj(dir + `/${folder}`, folder)
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