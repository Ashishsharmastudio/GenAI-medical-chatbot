// /medical-bot-backend/routes/landing.js
import express from 'express';
import {
    landingChat,
    captureLead,
    getAllLeads,
    updateLeadStatus,
} from '../controllers/landingController.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/chat', landingChat);
router.post('/lead', captureLead);

// Admin routes (TODO: add authentication middleware)
router.get('/leads', getAllLeads);
router.patch('/leads/:leadId', updateLeadStatus);

export default router;
