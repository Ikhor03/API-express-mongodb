const {MongoClient} = require('mongodb')
// admin?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1
const url = 'mongodb://myUserAdmin:12345@127.0.0.1:27017?authSource=admin'
const client = new MongoClient(url)

const dbName = 'eduwork-native'

const main = async () => {
    await client.connect()
    console.log('Connected Successfully to Server mongodb') 
    
    
    return 'done'
}

main()
.then(console.log)
.catch(console.error)

const db = client.db('eduwork-native')

module.exports = db;