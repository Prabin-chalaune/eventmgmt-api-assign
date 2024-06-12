import express, { Request, Response } from 'express';
import Eventmodel from '../models/Eventmodel';
import Registermodel from '../models/Registermodel';

const router = express.Router();

interface CreateEventRequest extends Request {
  body: {
    title: string;
    description: string;
    date: Date;
    organizerId: string;
  };
}

interface RegisterEventRequest extends Request {
  body: {
    userId: string;
  };
}

router.post('/create-event', async (req: CreateEventRequest, res: Response) => {
  const { title, description, date, organizerId } = req.body;

  try {
    const event = new Eventmodel({
      title,
      description,
      date,
      organizerId
    });

    await event.save();
    res.status(201).json({ message: 'Event created successfully!', eventId: event._id });
  } catch (err: any) {
    res.status(500).json({ error: 'Server error occurred...', details: err.message });
  }
});

router.get('/:eventId', async (req: Request, res: Response) => {
  try {
    const event = await Eventmodel.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found!' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Server error occurred' });
  }
});

router.post('/:eventId/register', async (req: RegisterEventRequest, res: Response) => {
  const { userId } = req.body;

  try {
    const existRegistration = await Registermodel.findOne({ eventId: req.params.eventId, userId });

    if (existRegistration) {
      return res.status(400).json({ error: 'User already registered for this event' });
    }

    const registration = new Registermodel({
      eventId: req.params.eventId,
      userId
    });

    await registration.save();
    res.status(200).json({ message: 'User registered for event successfully!', registrationId: registration._id });
  } catch (err) {
    res.status(500).json({ err: 'Server error occurred...' });
  }
});

export default router;





