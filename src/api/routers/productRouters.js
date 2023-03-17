const router = require('express').Router();
const { productController } = require('../contrulers/productControler');

router.post('/product', productController.add)
router.get('/products', productController.getAll)
router.get('/product/:id', productController.update)
router.delete('/product/:id', productController.delete)
router.put('/product/:id', productController.put);

module.exports = router;