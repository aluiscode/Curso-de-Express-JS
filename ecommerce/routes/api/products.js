const express= require('express');
const router= express.Router();
const productMocks = require('../../utils/mock/products')

router.get('/', function(req,res){
  const query = req.query;
  res.status(200).json({
      data: productMocks,
      message: 'Products listed'
  });
});

router.get('/:id', function(req,res){
  const { id } = req.params;
  res.status(200).json({
      data: productMocks[0],
      message: 'Products retrived'
  });
});

router.post('/', function(req,res){
  res.status(201).json({
      data: productMocks[0],
      message: 'Products listed'
  });
});

router.put('/:id', function(req,res){
  const {id} = req.params;
  res.status(200).json({
      data: productMocks,
      message: 'Products updated'
  });
});

router.delete('/:id', function(req,res){
  const {id} = req.params;
  res.status(200).json({
      data: productMocks[0],
      message: 'Products Deleted'
  });
});

module.exports = router;