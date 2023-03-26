const router = require('express').Router();
const { productController } = require('../contrulers/productControler');
const { producta } = require("../../models/product");

router.post('/product', productController.add)
router.get('/products', productController.getAll)
router.get('/product/:id', productController.update)
router.delete('/product/:id', productController.delete)
router.put('/product/:id', productController.put);
app.get('/productsd', async (req, res) => {
    try {
      const { name, fin, email } = req.query;
      const products = await producta.find({ name, fin, email });
      res.json(products);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;