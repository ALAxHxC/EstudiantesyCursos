import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: 'Enter a first name'
  },
  lastName: {
    type: String,
    required: 'Enter a last name'
  },
  email: {
    type: String
  },
  company: {
    type: String
  },
  phone: {
    type: Number
  }
}, { timestamps: true });
export const Contact = mongoose.model('Contact', ContactSchema);
//export = { Contact };