const express= require('express');
const router= express.Router();
const ProductsService = require('../../services/products')

const validation = require('../../utils/middleware/validationHandler')

const {productIdSchema,
      productTagSchema,
      createProductSchema,
      updateProductSchema,
    } = require('../../utils/schemas/products');
const validationHandler = require('../../utils/middleware/validationHandler');
const { required } = require('@hapi/joi');

const productsService = new ProductsService();

router.get('/', async(req, res, next) => {
  const { tags } = req.query;
  try {
    // throw new Error('This is an error from API')
    const products = await productsService.getProducts({tags});
    res.status(200).json({
        data: products,
        message: 'Products listed'
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async(req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productsService.getProduct({id});
    res.status(200).json({
        data: product,
        message: 'Products retrived'
    });
  } catch (error) {
    next(error)
  }
});

router.post('/', validation(createProductSchema), async(req, res, next) => {
  const {body: data} = req;
  try {
    const createdProduct = await productsService.createProduct(data);
    res.status(201).json({
        data: createdProduct,
        message: 'Products listed'
    });
  } catch (error) {
    next(error)
  }
});

router.put('/:id', validation({id: productIdSchema}, 'params'),validation(updateProductSchema),async(req, res, next) => {
  const {id} = req.params;
  const {body: data} = req;
  try {
    const product = await productsService.updateProduct({id, data});
    res.status(200).json({
        data: product,
        message: 'Products updated'
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async(req, res, next) => {
  const {id} = req.params;
  try {
    const product = await productsService.deleteProduct({id});
    res.status(200).json({
        data: product,
        message: 'Products Deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;