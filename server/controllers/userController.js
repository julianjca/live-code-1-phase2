const User = require('../models/userModel');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  register : function(req,res){
    User.create({
      name : req.body.name,
      password : req.body.password,
      email : req.body.email
    })
    .then(data =>{
      res.status(201).json({
        "success": true,
        "message": `Account ${data.name} registered`
      });
    })
    .catch(err=>{
      res.status(500).json({
        err
      });
    });
  },

  login : function(req,res){
    User.findOne({
      email : req.body.email
    })
    .then(data=>{
      if(data){
        jwt.sign({
          foo: 'bar'
        }, process.env.JWT_SECRET,function(err, token) {
          res.status(201).json({
            "token" : token
          });
        });
      }
    })
    .catch(err=>{
      res.status(500).json({
        err
      });
    });
  },
};

