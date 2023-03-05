const { ObjectId } = require('mongodb')
const db = require('../../config/mongodb')
const path = require('path')
const fs = require('fs')

const collection = db.collection('products')

const index = (req, res) => {
    collection.find().toArray()
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const view = (req, res) => {
    const { id } = req.params
    collection.findOne({ _id: new ObjectId(id) })
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const store = (req, res) => {
    const { name, price, stock, status } = req.body
    const image = req.file

    console.log(nama)

    let url_image = ''
    if (image) {
        targetRename = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, targetRename)
        url_image = `http://localhost:5000/public/${image.originalname}`
    }

    collection.insertOne({ name, price, stock, status, url_image })
        .then(result => res.send(result))
        .catch(error => res.send(error))

}

const destroy = (req, res) => {
    collection.deleteOne({_id : new ObjectId(req.params.id) })
    .then(result => res.send(result))
    .catch(err => res.send(err))
}

//NOTE: KALAU REQUEST MELALUI FORM DATA UPDATE GAGAL, TAPI KALAU PAKAI 'RAW JSON' UPDATE BERHASIL (kalau boleh minta tolong feedbacknya mengenai ini)
const update = (req, res) => {
    const { name, price, stock, status } = req.body
    const image = req.file


    let url_image = ''
    if (image) {
        targetRename = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, targetRename)
        url_image = `http://localhost:5000/public/${image.originalname}`
    }

    collection.updateOne({_id : new ObjectId(req.params.id) }, {$set: {name, price, stock, status, url_image}})
    .then(result => res.send(result))
    .catch(err => res.send(err))
}

module.exports = {
    index,
    view,
    store,
    destroy,
    update
}