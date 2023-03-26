import express from 'express';
import { mapWorkAndUser } from '../controllers/nimone.control.js';

const router = express.Router();

router.post('/', mapWorkAndUser)

router.get('', (req, res, next) => {
   res.send('nimone')
})

export default router