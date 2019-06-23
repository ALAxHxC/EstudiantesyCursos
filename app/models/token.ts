import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Model = new Schema({
  user: Schema.Types.Mixed,
  client: Schema.Types.Mixed,
  accessTokenExpiresAt: { type: Date },
  refreshTokenExpiresAt: { type: Date },
  refreshToken: { type: String },
  accessToken: { type: String, unique: true }
}, { timestamps: true });


Model.pre('save', function (next: Function) {
  let data: any = this;
  Token.remove({
    accessToken: data.accessToken
  }).then(data => {
    next()
  }).catch(error => {
    next()
  })
})
export const Token = mongoose.model('token', Model);



