// /medical-bot-backend/controllers/landingController.js
import Lead from '../models/Lead.js';
import { sendLeadNotification, sendWelcomeEmail } from '../utils/emailNotifier.js';

/**
 * Handle chat messages from landing page chatbot (anonymous, no auth required)
 */
export async function landingChat(req, res, next) {
    try {
        const { message, conversationHistory } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // In production, you would call your AI service here
        // For now, return a simple acknowledgment
        // The client-side handles the conversational logic

        res.json({
            success: true,
            response: 'Message received', // Not used client-side currently
        });
    } catch (err) {
        console.error('Landing chat error:', err);
        next(err);
    }
}

/**
 * Capture lead information from landing page chatbot
 */
export async function captureLead(req, res, next) {
    try {
        const { email, name, phone, conversation, metadata } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Extract specialty and other info from conversation
        const conversationText = conversation
            ?.map(m => m.content)
            .join(' ')
            .toLowerCase() || '';

        let specialty = null;
        if (conversationText.includes('dentist') || conversationText.includes('dental')) {
            specialty = 'Dental';
        } else if (conversationText.includes('surgeon') || conversationText.includes('surgery')) {
            specialty = 'Surgery';
        } else if (conversationText.includes('ortho') || conversationText.includes('bone')) {
            specialty = 'Orthopaedic';
        }

        // Check if lead already exists
        let lead = await Lead.findOne({ email: email.toLowerCase().trim() });

        if (lead) {
            // Update existing lead
            lead.name = name || lead.name;
            lead.phone = phone || lead.phone;
            lead.conversation = conversation || lead.conversation;
            lead.metadata = {
                ...lead.metadata,
                ...metadata,
                specialty: specialty || lead.metadata?.specialty,
            };
            await lead.save();
        } else {
            // Create new lead
            lead = new Lead({
                email: email.toLowerCase().trim(),
                name,
                phone,
                conversation: conversation || [],
                source: 'landing_chatbot',
                status: 'new',
                metadata: {
                    ...metadata,
                    specialty,
                    userAgent: req.headers['user-agent'],
                    ipAddress: req.ip || req.connection.remoteAddress,
                },
            });
            await lead.save();
        }

        // Send email notifications (non-blocking - don't fail if email fails)
        sendLeadNotification(lead).catch(err =>
            console.error('Email notification failed:', err.message)
        );
        sendWelcomeEmail(lead).catch(err =>
            console.error('Welcome email failed:', err.message)
        );

        console.log(`✅ Lead captured: ${lead.email} (${specialty || 'unknown specialty'})`);

        res.json({
            success: true,
            message: 'Lead captured successfully',
            leadId: lead._id,
        });
    } catch (err) {
        console.error('Lead capture error:', err);
        next(err);
    }
}

/**
 * Get all leads (admin only - add auth middleware later)
 */
export async function getAllLeads(req, res, next) {
    try {
        const { status, source, limit = 50, skip = 0 } = req.query;

        const filter = {};
        if (status) filter.status = status;
        if (source) filter.source = source;

        const leads = await Lead.find(filter)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        const total = await Lead.countDocuments(filter);

        res.json({
            success: true,
            leads,
            total,
            limit: parseInt(limit),
            skip: parseInt(skip),
        });
    } catch (err) {
        console.error('Get leads error:', err);
        next(err);
    }
}

/**
 * Update lead status (admin only - add auth middleware later)
 */
export async function updateLeadStatus(req, res, next) {
    try {
        const { leadId } = req.params;
        const { status, notes } = req.body;

        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        if (status) {
            lead.status = status;
            if (status === 'contacted') {
                lead.lastContactedAt = new Date();
            } else if (status === 'converted') {
                lead.convertedAt = new Date();
            }
        }

        if (notes) {
            lead.notes.push({
                content: notes,
                addedBy: 'admin', // TODO: use actual user from auth
                addedAt: new Date(),
            });
        }

        await lead.save();

        res.json({
            success: true,
            lead,
        });
    } catch (err) {
        console.error('Update lead status error:', err);
        next(err);
    }
}
