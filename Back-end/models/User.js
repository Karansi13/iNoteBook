const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now    // don't make it now()
    }, 
  });

  const User = mongoose.model("user", userSchema);
//   User.createIndexes();  // will create extra index, we dont need this
  module.exports = User;