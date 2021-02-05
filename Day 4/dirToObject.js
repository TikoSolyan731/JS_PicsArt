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
