import mongoose, { Document, Schema, Model } from 'mongoose';

interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  organizerId: mongoose.Schema.Types.ObjectId;
}

const eventSchema: Schema<IEvent> = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usermodel',
    required: true
  }
});

const Eventmodel: Model<IEvent> = mongoose.model<IEvent>('Eventmodel', eventSchema);
export default Eventmodel;

