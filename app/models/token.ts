import mongoose, { Model } from 'mongoose';
const Schema = mongoose.Schema;
const Model = new Schema({
  user: Schema.Types.Mixed,
  client: Schema.Types.Mixed,
  accessTokenExpiresAt: { type: Date },
  refreshTokenExpiresAt: { type: Date },
  refreshToken: { type: String },
  accessToken: { type: String }
}, { timestamps: true });

export const Token = mongoose.model('token', Model);


Model.pre('save', function (next: Function) {
  let data: any = this;
  Token.remove({
    'user.id': data.user.id,
    'client.id': data.client.id
  }).then(data => {
    console.log('elimino', data)
    next()
  }).catch(error => { next() })
})

