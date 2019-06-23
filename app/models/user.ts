import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const cryptLib = require('cryptlib');
const ps = process.env.SECRET || String("e4b749e81288302501f897996a364797");
const iv = process.env.IVI || "ed82a7c7b7a202dc";

const UserChema = new Schema({
  username: { type: String, unique: true, lowercase: true, required: 'EmailInvalid' },
  password: { type: String, select: false, required: 'PasswordInvalid' }
}, { timestamps: true });

UserChema.pre('save', function (next) {
  let person: any = this;
  if (!person.isModified('password')) {
    return next();
  }
  person.password = cryptLib.encrypt('This is the text to be encrypted', ps, iv);
  next();

});
UserChema.pre('findOne', function (next: Function) {
  //console.log(this);
  let query = this;
  let queryOption = this.getQuery();

  if (queryOption.password == null) next();
  queryOption.password = cryptLib.encrypt('This is the text to be encrypted', ps, iv);
  query.setQuery(queryOption)
  next();
});


export const User = mongoose.model('User', UserChema);



