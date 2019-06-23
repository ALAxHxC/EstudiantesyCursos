import mongoose from 'mongoose';
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



