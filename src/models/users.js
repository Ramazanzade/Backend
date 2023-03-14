const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose;
const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fin: {
      type: String,
      required: true,
    },
  });

userSchema.pre('save', async function (next) {
    if (this.isModified('fin')) {
      const hash = await bcrypt.hash(this.fin, 7);
      this.fin = hash;
    }
    next();
  });

  userSchema.methods.compareFin = async function (fin) {
    if (!fin) {
      throw new Error('Fin is missing, cannot compare!');
    }
    return await bcrypt.compare(fin, this.fin);
  };
  
  userSchema.statics.isEmailInUse = async function (email) {
    console.log(email);
    if (!email) {
      throw new Error('Invalid email');
    }
    try {
      const user = await this.findOne({ email });
      return !!user;
    } catch (error) {
      console.error('Error checking email:', error.message);
      return false;
    }
  };

const Users = model('Users', userSchema);

module.exports = { Users};
