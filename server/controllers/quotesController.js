const Quotes = require('../models/quotesModel');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

module.exports = {
  add : function(req,res){
    Quotes.create(req.body)
    .then(data=>{
      res.status(201).json(data);
      console.log(sukses);
    })
    .catch(err=>{
      res.status(500).json({
        err
      });
    });
  },

  listAll : function(req,res){
    Quotes.find({})
    .then(data=>{
      res.status(200).json(data);
    })
    .catch(err=>{
      res.status(500).json({
        err
      });
    });
  },

  remove : function(req,res){
    Quotes.deleteOne({
      _id : new mongodb.ObjectId(req.params.id)
    })
    .then(data=>{
      res.status(201).json(
        {
          "success": true,
          "message": `Quote with id ${req.params.id} deleted`
        }
      );
    })
    .catch(err=>{
      res.status(500).json({
        err
      });
    });
  }
};

