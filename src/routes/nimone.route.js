import express from 'express';

import { createNimone, getNimone } from '../controllers/nimone.comtroll.js';
import { fillNimoneRequest } from '../middlewares/nimone.middle.js';

const router = express.Router();

/* CREATE NIMONE  */

router.post('/', fillNimoneRequest, createNimone);

/* GET NIMONE */
router.get('/', getNimone)

/* UPDATE NIMONE */
router.put('/')

/* DELEATE NIMONE */
router.delete('/')

export default router;