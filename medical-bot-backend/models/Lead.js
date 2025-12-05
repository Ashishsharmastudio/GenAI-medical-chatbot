import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    // Contact Information
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },

    // Conversation Data
    conversation: [{
        role: {
            type: String,
            enum: ['user', 'assistant'],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    }],

    // Lead Source & Status
    source: {
        type: String,
        default: 'landing_chatbot',
        enum: ['landing_chatbot', 'contact_form', 'direct', 'other'],
    },
    status: {
        type: String,
        default: 'new',
        enum: ['new', 'contacted', 'qualified', 'demo_scheduled', 'converted', 'lost'],
    },

    // Metadata
    metadata: {
        userAgent: String,
        referrer: String,
        ipAddress: String,
        location: String,
        specialty: String, // Extracted from conversation
        practiceSize: String,
    },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
    lastContactedAt: Date,
    convertedAt: Date,

    // Notes
    notes: [{
        content: String,
        addedBy: String,
        addedAt: {
            type: Date,
            default: Date.now,
        },
    }],
});

// Indexes for efficient querying
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ source: 1, createdAt: -1 });

// Virtual for lead age
leadSchema.virtual('ageInDays').get(function () {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
