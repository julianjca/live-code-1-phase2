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
        const isPasswordValid = bcrypt.compareSync(req.body.password, data.password);
        if(isPasswordValid){
          jwt.sign({
            email : data.email,
            id : data._id
          }, process.env.JWT_SECRET,function(err, token) {
            res.status(201).json({
              "token" : token
            });
          });
        }
        else{
          res.status(500).json({
            msg : "email/password is wrong"
          });
        }
      }
      else{
        res.status(500).json({
          msg : "email/password is wrong"
        });
      }
    })
    .catch(err=>{
      res.status(500).json({
        err
      });
    });
  },

  auth : function(req,res){
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(!err){
        res.status(200).json({
          id : decoded.id
        });
      }
      else{
        res.status(403).json({
          msg : 'Unauthorized'
        });
      }
    });
  }
};

