require('./config/mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const routerProducts = require('./app/routes/products')
const routerProductsV2 = require('./app/routes/productsV2')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(path.join(__dirname, 'public')))
// v1 => mongoose || v2 => mongodb (native)
app.use('/api/v1', routerProducts)
app.use('/api/v2', routerProductsV2)

//error handling
app.use((req, res) => {
    res.json({
        status: 'failed',
        response: "Something broke! Resource " + req.originalUrl + " cannot found"
    })
})



app.listen(process.env.PORT ||  5000, () => console.log('server up and running in port 5000'))

module.exports = app