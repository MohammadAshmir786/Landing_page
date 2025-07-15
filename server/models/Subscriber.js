import { Schema, model } from 'mongoose';
const SubscriberSchema = new Schema({
  email: String,
});
export default model('Subscriber', SubscriberSchema);