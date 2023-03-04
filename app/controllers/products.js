const products = require('../models/products')
const path = require('path')
const fs = require('fs')

const index = (req, res) => {
    //  CODE SEARCH MASIH BELUM JADI
    // const { search } = req.query
    // if (search) {
    //     products.createIndexes({ name: "text" })
    //     products.find({ $text: { $search: search } })
    // }
    products.find()
        .then(result => res.send(result))
        .catch(err => res.send(err.message))

}

const view = (req, res) => {
    products.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send(err.message))
}

const store = (req, res) => {
    const { name, price, stock, status } = req.body
    const image = req.file

    let url_image = ''
    if (image) {
        const targetRename = path.join(__dirname, '../../public', image.originalname)
        fs.renameSync(image.path, targetRename)
        url_image = `http://localhost:3000/public/${image.originalname}`
    }

    products.create({ name, price, stock, status, url_image })
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

//NOTE: KALAU REQUEST MELALUI FORM DATA UPDATE GAGAL, TAPI KALAU PAKAI 'RAW JSON' UPDATE BERHASIL (kalau boleh minta tolong feedbacknya mengenai ini)
const update = (req, res) => {
    const { name, price, stock, status } = req.body
    const image = req.file

    let url_image = ''
    if (image) {
        const targetRename = path.join(__dirname, '../../public', image.originalname)
        fs.renameSync(image.path, targetRename)
        url_image = `http://localhost:3000/public/${image.originalname}`
    }

    products.findByIdAndUpdate(req.params.id , { name, price, stock, status, url_image })
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

const destroy = (req, res) => {
    products.deleteOne({ _id: req.params.id })
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