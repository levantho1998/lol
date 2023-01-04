const mongoose = require('mongoose')
const DB_NAME = 'bookstore'

const connectionString = `mongodb://localhost:27017/${DB_NAME}`

mongoose.connect(connectionString,
    {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.error('Can not to mongoDB')
            console.error(err)
        } else {
            console.log('Connected to MongoDB')
        }
    }
)

