const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  surname: {
    type: String,
    required: true,
  },
  fin: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  }, 
  live: {
    type: String,
    required: true,
  }, 
  work: {
    type: String,
    required: true,
  },
  digital: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  avatar: String,
  tokens: [{ type: Object }],
});

userSchema.pre('save', function (next) {
  if (this.isModified('fin')) {
    bcrypt.hash(this.fin, 8, (err, hash) => {
      if (err) return next(err);

      this.fin = hash;
      next();
    });
  }
});

userSchema.methods.comparefin = async function (fin) {
  if (!fin) throw new Error('Password is mission, can not compare!');

  try {
    const result = await bcrypt.compare(fin, this.fin);
    return result;
  } catch (error) {
    console.log('Error while comparing password!', error.message);
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error('Invalid Email');
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log('error inside isThisEmailInUse method', error.message);
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);