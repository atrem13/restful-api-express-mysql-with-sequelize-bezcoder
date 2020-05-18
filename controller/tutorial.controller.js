const db = require('../models/index.js');
const Tutorial = db.tutorial;
const Op = db.Sequelize.Op;

// create new tutorial
exports.create = (req, res) => {
  // validate input
  if(!req.body){
    res.status(400).send({
      message:'input data required'
    });
    return;
  }

  // save data to database
  const new_tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  }; 

  Tutorial.create(new_tutorial)
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message:err.message || 'error when create new tutorial'
      });
    });


};

// get all tutorial (with condition)
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? {title: {[Op.like]: `%${title}%`} } : null;

  Tutorial.findAll({where: condition})
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message:err.message||'error when read data'
      });
    });


};

// get tutorial base on id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message:err.message || `failed to get tutorial with id ${id}`
      });
    });

};

// update tutorial base on id

exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {where: { id:id }})
  .then((num) => {
    if(num == 1){
      res.send({
        message:'tutorial updated'
      });
    }else{
      res.send({
        message:`failed to update tutorial with id ${id}`
      });
    }
  }).catch((err) => {
    res.status(500).send({
      message:err.message||'error when update data'
    });
  });

};

// delete tutorial base on id
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({ where: {id:id} })
    .then((num) => {
      if(num == 1){
        res.send({
          message:'tutorial deleted'
        });
      }else{
        res.send({
          message: `failed to delete tutorial with id ${id}`
        });
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message || `error when delete data`
      });
    });

};


// delete all tutorial
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then((nums) => {
      res.send({ 
        message: `${nums} Tutorials were deleted successfully!` 
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// get all tutorial if published == true
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    });
};