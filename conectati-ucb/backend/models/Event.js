import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  topic: String,
  partner: String,
  capacity: Number,
  registeredUsers: [String],
});

export default mongoose.model('Event', eventSchema);