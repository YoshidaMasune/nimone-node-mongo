import express from 'express';

import { createWork, getWork } from '../controllers/work.control.js';
import { fillWorkRequest } from '../middlewares/nimone.middle.js';

const router = express.Router();

/* CREATE NIMONE  */

router.post('/', fillWorkRequest, createWork);

/* GET NIMONE */
// get by params
router.get('/:workId', getWork)

// get all docs
router.get('/', getWork);

/* UPDATE NIMONE */
router.put('/')

/* DELEATE NIMONE */
router.delete('/')

export default router;