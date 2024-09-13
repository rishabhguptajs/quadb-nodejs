import express from 'express'
import dataController from '../controllers/dataController.js';

const router = express.Router()

router.get('/', dataController.fetchCryptoData)

export default router;