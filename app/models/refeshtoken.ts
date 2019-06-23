import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Model = new Schema({
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
}, { timestamps: true });


export const RefreshToken = mongoose.model('refreshToken', Model);



