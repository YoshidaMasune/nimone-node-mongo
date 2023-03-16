import express from 'express';

import { createNimone, getNimone } from '../controllers/nimone.comtroll.js';
const router = express.Router();

/* CREATE NIMONE  */
router.post('/', createNimone);

/* GET NIMONE */
router.get('/', getNimone)

/* UPDATE NIMONE */
router.put('/')

/* DELEATE NIMONE */
router.delete('/')

export default router;