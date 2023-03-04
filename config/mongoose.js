const mongoose = require('mongoose')

mongoose.connect('mongodb://myUserAdmin:12345@127.0.0.1:27017/eduwork-mongoose?authSource=admin')

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database connected to Mongoose'))