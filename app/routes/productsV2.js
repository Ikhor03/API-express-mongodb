const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads' })
const controller = require('../controllers/productsV2')


router.get('/products', controller.index)
router.get('/products/:id', controller.view)
router.post('/products', upload.single('url_image'), controller.store)
router.put('/products/:id', controller.update)
router.delete('/products/:id', upload.single('url_image'), controller.destroy)

module.exports = router