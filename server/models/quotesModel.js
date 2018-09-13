const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quotesSchema = new Schema({
  likes : [],
  status:{
        type: String
  },
  user:{
      type : mongoose.Schema.Types.ObjectId
  }
},{
    timestamps: true
});

const Quotes = mongoose.model('Quotes', quotesSchema);
module.exports = Quotes;