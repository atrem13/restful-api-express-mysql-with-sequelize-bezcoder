module.exports = (app) => {
  const tutorials = require('../controller/tutorial.controller.js');

  let router = require('express').Router();
  
  //create new tutorial
  router.post('/', tutorials.create);

  // get all tutorial
  router.get('/', tutorials.findAll);

  // get tutorial published == true
  router.get('/published', tutorials.findAllPublished);

  // get tutorial base on id
  router.get('/:id', tutorials.findOne);

  // update tutorial base on id
  router.put('/:id', tutorials.update);

  // delete tutorial base on id
  router.delete('/:id', tutorials.delete);

  // delete all tutorial
  router.delete('/', tutorials.deleteAll);

  app.use('/api/tutorials', router);

  
};