import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import nimoneRouter from './routes/nimone.route.js'
import monkRouter from './routes/monk.route.js'

import bodyParser from 'body-parser';
import { fillNimoneRequest } from './middlewares/nimone.middle.js';

/* CONFIGURATION */
dotenv.config();
const {MONGO_URI, PORT} = process.env;
const app = express();

/* USEMIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

// app.use('/nimone', fillNimoneRequest)

/* USEROUTES */
app.use('/work', nimoneRouter);
app.use('/monk', monkRouter)

/* CONNECT MONGOOSE */

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));