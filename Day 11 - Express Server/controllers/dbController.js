const fs = require('fs').promises;
const path = require('path');

module.exports = () => {
    return {
        save,
        getAllDocuments,
        getDocumentById,
        getDocumentByField,
        updateDocumentById,
        deleteDocumentById,
        getLastId,
    }

    async function save(collection, document) {
        try {
            await fs.writeFile(
                path.resolve('db', collection, `${document.id}.json`),
                JSON.stringify(document, null, 4),
                'utf-8'
            );
            await incrLastId(collection, document.id - 1);

            return {
                message: 'success',
                data: document,
            };
        } catch(err) {
            return {
                message: 'error',
                reason: err,
            };
        }
    }

    async function getAllDocuments(collection) {
        try {
            const response = [];
            const col = await readCollection(collection);

            for (const file of col) {
                const document = await fs.readFile(path.resolve('db', 'users', file), 'utf-8');
                response.push(JSON.parse(document));
            }

            return {
                message: 'success',
                data: response,
            };


        } catch(err) {
            return {
                message: 'error',
                reason: err,
            };
        };
    }

    async function getDocumentById(collection, id) {
        try {
            const document = await fs.readFile(path.resolve('db', collection, `${id}.json`), 'utf-8');

            return {
                message: 'success',
                data: JSON.parse(document),
            }
        } catch(err) {
            return {
                message: 'error',
                reason: err,
            }
        }
    }

    async function getDocumentByField(collection, field, searchText) {
        const foundDocs = [];
        const col = await readCollection(collection);

        for (const file of col) {
            let document = await fs.readFile(path.resolve('db', collection, file), 'utf-8');
            document = JSON.parse(document);

            if (document[field].includes(searchText))
                foundDocs.push(document);
        }

        return {
            message: 'success',
            data: foundDocs,
        }
    }

    async function updateDocumentById(collection, id, data) {
        try {
            const file = await fs.readFile(path.resolve('db', collection, `${id}.json`), 'utf-8');
            const document = JSON.parse(file);
            
            Object.assign(document, data);
            await fs.writeFile(
                path.resolve('db', collection, `${id}.json`),
                JSON.stringify(document, null, 4),
                'utf-8'
            );

            return {
                message: 'success',
                data: document,
            }
        } catch(err) {
            return {
                message: 'error',
                reason: err,
            }
        }
    }

    async function deleteDocumentById(collection, id) {
        try {
            await fs.unlink(path.resolve('db', collection, `${id}.json`));

            let data = null;
            for (let i = +id + 1; ; i++) {
                const updatedDoc = await updateDocumentById(collection, i, {id: i - 1});
                data = updatedDoc.data;
                if (updatedDoc.message === 'error')
                    break;
                await fs.rename(path.resolve('db', collection, `${i}.json`), path.resolve('db', collection, `${i-1}.json`));
            }

            let lastId = await getLastId(collection);
            lastId = isNaN(lastId) ? 0 : lastId;
            await decrLastId(collection, lastId);

            return {
                message: 'success',
                data,
            }
        } catch(err) {
            return {
                message: 'error',
                reason: err,
            }
        }
    }

    function getFileName(col) {
        return `${col}Id`;
    }
    
    async function getLastId(collection) {
        const id = await fs.readFile(path.resolve('db', getFileName(collection)));
        return parseInt(id.toString());
    }
    
    async function incrLastId(collection, id) {
        await fs.writeFile(path.resolve('db', getFileName(collection)), (id + 1).toString());
    }
    
    async function decrLastId(collection, id) {
        await fs.writeFile(path.resolve('db', getFileName(collection)), (id - 1).toString());
    }
    
    async function readCollection(collection) {
        return await fs.readdir(path.resolve('db', collection));
    }
    
}