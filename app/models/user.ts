import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const cryptLib = require('cryptlib');
const ps = process.env.SECRET || String("e4b749e81288302501f897996a364797");
const iv = process.env.IVI || "ed82a7c7b7a202dc";

const UserChema = new Schema({
  username: { type: String, require: true, index: true, unique: true, sparse: true },
  password: { type: String }
}, { timestamps: true });

UserChema.pre('save', function (next) {
  let person: any = this;
  person.password = cryptLib.encrypt(person.password, ps, iv);
  next();

});
UserChema.pre('update', function (next) {
  const update = this.getUpdate()
  if (!update.password) {
    return next();
  }
  this.getUpdate().password = cryptLib.encrypt(update.password, ps, iv);

})
UserChema.pre('updateOne', function (next) {
  const update = this.getUpdate()
  if (!update.password) {
    return next();
  }
  this.getUpdate().password = cryptLib.encrypt(update.password, ps, iv);
  next();
})
UserChema.pre('findOne', function (next: Function) {
  //console.log(this);
  let query = this;
  let queryOption = this.getQuery();

  if (queryOption.password == null) next();
  queryOption.password = cryptLib.encrypt(queryOption.password, ps, iv);
  query.setQuery(queryOption)
  next();
});


export const User = mongoose.model('User', UserChema);



