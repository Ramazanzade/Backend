const { producta } = require("../../models/product");


const productController = {
  add: async (req, res) => {
    const body = req.body;
    let product = new producta({
      name: body.name,
      surname: body.surname,
      age: body.age,
      live: body.live,
      fin: body.fin,
      work: body.work,
      digital:body.digital,
      email:body.email,
      amount:body.amount
    });

    try {
      const savedProduct = await product.save();
      return res.json(savedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
        const products = await producta.find();
        if (products.length > 0) {
            res.send(products);
        } else {
            res.status(404).send({ error: 'No products found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    }
},

  delete: async (req, res) => {
    try {
      const result = await producta.deleteOne({ _id: req.params.id });
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    const result = await producta.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send('Not changed');
    }
  },
  put: async (req, res) => {
    const result = await producta.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(result);
  },
  search: async (req, res) => {
    const result = await producta.find({
      $or: [
        { fin: { $regex: new RegExp(req.params.key) } },
        { name: { $regex: new RegExp(req.params.key) } },
        { surname: { $regex: new RegExp(req.params.key) } },
        { age: { $regex: new RegExp(req.params.key) } },
        { work: { $regex: new RegExp(req.params.key) } },
        { live: { $regex: new RegExp(req.params.key) } }
      ]
    });
    res.send(result);
  }
};

module.exports = { productController }
