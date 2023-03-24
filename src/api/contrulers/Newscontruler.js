const { news } = require("../../models/news");


const Newscontruler = {
  add: async (req, res) => {
    const body = req.body;
    let product = new news({
     title: body.title,
      date: body.date,
      text: body.text,
      title1: body.title1,
      date1: body.date1,
      text1: body.text1, 
      title2: body.title2,
      date2: body.date2,
      text2: body.text2,
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
        const products = await news.find();
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
      const result = await news.deleteOne({ _id: req.params.id });
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    const result = await news.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send('Not changed');
    }
  },
  put: async (req, res) => {
    const result = await news.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(result);
  },
};

module.exports = { Newscontruler }
