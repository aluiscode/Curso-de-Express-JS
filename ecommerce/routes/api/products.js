const express= require('express');
const passport= require('passport');
const ProductsService = require('../../services/products')

const validation = require('../../utils/middleware/validationHandler')

const {productIdSchema,
      productTagSchema,
      createProductSchema,
      updateProductSchema,
    } = require('../../utils/schemas/products');

// Jwt strategy
    require('../../utils/auth/strategies/jwt')

const cacheResponse = require('../../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../../utils/time');

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products', router);

  const productsService = new ProductsService();

  router.get('/', async(req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
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
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
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

  router.put('/:id',
    passport.authenticate('jwt', { session:false }),
    validation({id: productIdSchema}, 'params'),
    validation(updateProductSchema),
    async(req, res, next) => {
    const {id} = req.params;
    const {body: data} = req;
    try {
      const product = await productsService.updateProduct(id, data);
      res.status(200).json({
          data: product,
          message: 'Products updated'
      });
    } catch (error) {
      next(error);
    }
  });

    router.delete('/:id',
    passport.authenticate('jwt', { session:false }),
    async(req, res, next) => {
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
}

module.exports = productsApi;