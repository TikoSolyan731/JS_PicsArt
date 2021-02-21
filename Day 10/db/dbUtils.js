const fs = require('fs').promises;
const path = require('path');

function getFileName(col) {
    return `${col}Id`;
}

const getLastId = async (collection) => {
    const id = await fs.readFile(path.resolve(__dirname, getFileName(collection)));
    return parseInt(id.toString());
}

const incrLastId = async (collection, id) => {
    await fs.writeFile(path.resolve(__dirname, getFileName(collection)), (id + 1).toString());
}

const decrLastId = async (collection, id) => {
    await fs.writeFile(path.resolve(__dirname, getFileName(collection)), (id - 1).toString());
}

const readCollection = async(collection) => {
    return await fs.readdir(path.resolve(__dirname, collection));
}

module.exports = {
    getLastId,
    incrLastId,
    decrLastId,
    readCollection,
}