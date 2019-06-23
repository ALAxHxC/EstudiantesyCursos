import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Model = new Schema({
  name: { type: String, required: 'FirstNameInvalid' },
  clientId: { type: String, required: 'ClientIdInvalidad' },
  clientSecret: { type: String, required: 'SecretInvalid' }
}, { timestamps: true });


export const Client = mongoose.model('Client', Model);



