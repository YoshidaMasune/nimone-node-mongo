import express from 'express';
import { monkControl } from '../controllers/monk.control.js';

const router = express.Router();

router.get('/', monkControl);

export default router;