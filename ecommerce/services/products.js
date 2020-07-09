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

  async getProduct({id}){
    const product = await this.mongoDB.get(this.collection, id)
    return product || {};
  }

  async createProduct(product){
    const createdProductId = await this.mongoDB.create(this.collection, product);
    return createdProductId;
  }

  async updateProduct({id, product}){
    const updatedProductId = await this.mongoDB.update(this.collection, id, product)
    return updatedProductId;
  }

  async deleteProduct({id}){
    const deletedProductId = await this.mongoDB.delete(this.collection, id)
    return deletedProductId;
  }
}

module.exports = ProductsService;