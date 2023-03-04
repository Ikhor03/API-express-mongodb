const router = require('express').Router()
const controllerProducts = require('../controllers/products')
const multer = require('multer')
const upload = multer({ dest: 'public' })

router.get('/products', controllerProducts.index)
router.get('/products/:id', controllerProducts.view)
router.post('/products', upload.single('url_image'), controllerProducts.store)
router.delete('/products/:id', controllerProducts.destroy)
router.put('/products/:id', controllerProducts.update)

module.exports = router