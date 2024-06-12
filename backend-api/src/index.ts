import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Userroute from './routes/Userroute';
import Eventroute from './routes/Eventroute';

const app =express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user',Userroute);
app.use('/api/events',Eventroute);

require('dotenv').config();

const Mongourl=process.env.MONGO_URL as string;
const port=process.env.PORT as string | number;

mongoose.connect(Mongourl)
  .then(() => console.log('uhh! MongoDB database connected'))
  .catch((err: any) => console.log(err));



app.listen(port,()=>console.log(`Server running on port ${port} `));
