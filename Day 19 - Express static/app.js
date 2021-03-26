const express = require('express');

const customStatic = require('./customStatic');

const app = express();

app.use(customStatic('./public'));

app.listen(3000, () => {
    console.log(`Listening on port 3000`);
})