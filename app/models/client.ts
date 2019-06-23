import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Model = new Schema({
  name: { type: String },
  clientId: { type: String, required: 'ClientIdInvalidad' },
  clientSecret: { type: String, required: 'SecretInvalid' },
  grants: [String],
  redirectUris: [String]
}, { timestamps: true });


export const Client = mongoose.model('Client', Model);



