import mongoose, { Document, Schema, Model } from 'mongoose';

interface IEventRegister extends Document {
  eventId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
}

const eventregisterSchema: Schema<IEventRegister> = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Eventmodel',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usermodel',
    required: true
  }
});

const Registermodel: Model<IEventRegister> = mongoose.model<IEventRegister>('Registermodel', eventregisterSchema);
export default Registermodel;

