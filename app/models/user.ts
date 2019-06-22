import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const UserChema = new Schema({
  name: { type: String, required: 'FirstNameInvalid' },
  last: String,
  email: { type: String, unique: true, lowercase: true, required: 'EmailInvalid' },
  password: { type: String, select: false, required: 'PasswordInvalid' }
}, { timestamps: true });

UserChema.pre('save', function (next) {
  let person: any = this;
  if (!person.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function (err: any, salt: any) {
    bcrypt.hash(person.password, salt, function (err: any, hash: any) {
      person.password = hash;
      next();
    });
  });
});

// 5. Confirm a person's password against the stored password
UserChema.methods.comparePassword = function (password: string, done: any) {
  bcrypt.compare(password, this.password, function (err: any, isMatch: any) {
    done(err, isMatch);
  });
};


export const User = mongoose.model('User', UserChema);



