import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'

import workRouter from './routes/work.route.js'
import monkRouter from './routes/monk.route.js'
import nimoneRouter from './routes/nimone.route.js'

import bodyParser from 'body-parser';

/* CONFIGURATION */
dotenv.config();
const {MONGO_URI, PORT} = process.env;
const app = express();

/* USEMIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

/* USEROUTES */
app.use('/work', workRouter);
app.use('/monk', monkRouter);
app.use('/nimone', nimoneRouter)

/* CONNECT MONGOOSE */

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));