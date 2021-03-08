const mongoose = require('mongoose')

module.exports = {
    startConnection,
}

async function startConnection(uri) {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    } catch(err) {
        console.log(err)
    }
}
