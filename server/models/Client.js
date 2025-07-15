import { Schema, model } from 'mongoose';
const ClientSchema = new Schema({
  name: String,
  description: String,
  designation: String,
  image: String,
});
export default model('Client', ClientSchema);
