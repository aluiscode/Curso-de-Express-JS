const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products');

const productsService = new ProductsService();

router.get('/', async(req, res) => {
  const { tags } = req.query;
  const products = await productsService.getProducts({tags})
  res.render('products', { products });
})

module.exports = router;