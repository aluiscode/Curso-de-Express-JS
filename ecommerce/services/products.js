const productMocks = require('../utils/mock/products');
const MongoLib = require('../lib/mongo');

class ProductsService{
  constructor(){
    this.collection = 'products';
    this.mongoDB = new MongoLib;
  };

  async getProducts({tags}){
    const query = tags && {tags: {$in: tags }};
    const products =  await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  getProduct({id}){
    return Promise.resolve(productMocks[0]);
  }

  createProduct({ product }){
    return Promise.resolve(productMocks[0]);
  }

  updateProduct({id}){
    return Promise.resolve(productMocks[0])
  }

  deleteProduct({id}){
    return Promise.resolve(productMocks[0])
  }
}

module.exports = ProductsService;