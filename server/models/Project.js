import { Schema, model } from 'mongoose';
const ProjectSchema = new Schema({
  name: String,
  description: String,
  image: String,
});
export default model('Project', ProjectSchema);