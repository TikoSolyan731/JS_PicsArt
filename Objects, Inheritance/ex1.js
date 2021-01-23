let pathsToHash = function(paths) {
    let hash = {};

    paths.forEach(element => {
        let path = element.split('/');

        pathToObj(path, hash);
    });
    
    return JSON.stringify(hash, null, 4);
}

function pathToObj(path, obj) {
    if (path.length == 0)
        return;

    let current = path[0];

    if (!obj.hasOwnProperty(current))
        obj[current] = {};

    if (current.includes('.'))
        obj[current] = true;

    return pathToObj(path.slice(1), obj[current]);
}


let paths = [
    'day-1/src/index.js',
    'day-1/src/style.css',
    'readme.txt',
    'photos/dilijan/2020/bro.png',
    'photos/dilijan/emptyFolder'
];

console.log(pathsToHash(paths));