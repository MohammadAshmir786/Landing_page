import { Schema, model } from 'mongoose';
const ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
});
export default model('Contact', ContactSchema);