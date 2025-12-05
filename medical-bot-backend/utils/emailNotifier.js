// /medical-bot-backend/utils/emailNotifier.js
import nodemailer from 'nodemailer';

/**
 * Send email notification to admin when a new lead is captured
 */
export async function sendLeadNotification(lead) {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'ashishsharmastudio@gmail.com';
        const emailEnabled = process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true';

        if (!emailEnabled) {
            console.log('📧 Email notifications disabled. Set ENABLE_EMAIL_NOTIFICATIONS=true in .env');
            return;
        }

        // Create transporter - configure based on your email provider
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
            },
        });

        // Extract conversation summary
        const conversationSummary = lead.conversation
            ?.slice(-3)
            .map(m => `${m.role === 'user' ? '👤 User' : '🤖 Bot'}: ${m.content}`)
            .join('\n\n') || 'No conversation history';

        const emailBody = `
🎉 NEW LEAD CAPTURED!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Contact Information:
   Name: ${lead.name || 'Not provided'}
   Email: ${lead.email}
   Phone: ${lead.phone || 'Not provided'}

🏥 Specialty: ${lead.metadata?.specialty || 'Unknown'}

💬 Recent Conversation:
${conversationSummary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Captured: ${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
🆔 Lead ID: ${lead._id}

👉 View in Admin: http://localhost:8080/api/landing/leads

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Action Required:
1. Follow up within 24 hours
2. Send personalized demo offer
3. Update status in CRM

--
MedGuide AI - Lead Notification System
    `.trim();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: adminEmail,
            subject: `🔔 New MedGuide AI Lead: ${lead.name || lead.email} (${lead.metadata?.specialty || 'Unknown'})`,
            text: emailBody,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Lead notification sent to ${adminEmail}:`, info.messageId);

        return info;
    } catch (error) {
        console.error('❌ Error sending lead notification:', error.message);
        // Don't throw - we don't want to fail lead capture if email fails
        return null;
    }
}

/**
 * Send welcome email to the lead
 */
export async function sendWelcomeEmail(lead) {
    try {
        const emailEnabled = process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true';

        if (!emailEnabled) {
            return;
        }

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const emailBody = `
Hi ${lead.name || 'there'},

Thank you for your interest in MedGuide AI! 🎉

We've received your demo request and our team will reach out to you within 24 hours to schedule a personalized demonstration of how MedGuide can transform your ${lead.metadata?.specialty || 'medical'} practice.

In the meantime, feel free to:
📅 Book directly: https://calendly.com/medguide-ai
📧 Reply to this email with any questions
📞 Call us: +91-9140585097

What to expect in your demo:
✓ Live walkthrough of MedGuide AI
✓ Custom setup for your specialty
✓ ROI calculator for your practice
✓ Q&A with our product experts

Looking forward to showing you how we can save you 40% of consultation time!

Best regards,
Ashish Sharma
MedGuide AI Team
ashishsharmastudio@gmail.com
+91-9140585097
    `.trim();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: lead.email,
            subject: '🎉 Welcome to MedGuide AI - Your Demo is Confirmed!',
            text: emailBody,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Welcome email sent to ${lead.email}:`, info.messageId);

        return info;
    } catch (error) {
        console.error('❌ Error sending welcome email:', error.message);
        return null;
    }
}
