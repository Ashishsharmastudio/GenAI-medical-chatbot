// Constants and static data for Landing Page

// Animation variants
export const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
};

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

// Specialties for rotating text
// Specialties for rotating text
export const specialties = [
    'Aligner Leads',
    'Cosmetic Inquiries',
    'Post-Op Care',
    'Emergency Triage',
    'Treatment Info'
];

// Stats data
export const statsData = [
    { label: "3X more aligner leads from website traffic", icon: "🦷", color: "bg-blue-50 text-blue-700" },
    { label: "60% reduction in front desk phone calls", icon: "📞", color: "bg-green-50 text-green-700" },
    { label: "24/7 patient education on cosmetic procedures", icon: "⏰", color: "bg-purple-50 text-purple-700" }
];

// Features data
// Features data
export const featuresData = [
    {
        title: "After-Hours Lead Capture",
        desc: "Never miss an Invisalign inquiry again. Our AI widget captures name, email, and chief concern 24/7—even when your practice is closed.",
        icon: "🌙"
    },
    {
        title: "Aligner Qualification",
        desc: "AI asks pre-screening questions to flag good aligner candidates, sending qualified leads directly to your case acceptance coordinator.",
        icon: "🎯"
    },
    {
        title: "Post-Procedure Q&A",
        desc: "Patients ask 'Is bleeding normal after extraction?' AI responds instantly with your approved post-op protocols—reducing panic calls.",
        icon: "🩺"
    },
    {
        title: "Cosmetic Education",
        desc: "Whitening, veneers, bonding explained in simple terms. Sets realistic expectations and pre-qualifies patients before the consultation.",
        icon: "✨"
    }
];

// Specialties section data (Dental Use Cases)
export const specialtiesData = [
    {
        icon: "🦷",
        title: "Aligner & Orthodontics",
        desc: "Qualify Invisalign candidates, answer aligner care questions, capture leads from after-hours web traffic."
    },
    {
        icon: "✨",
        title: "Cosmetic Dentistry",
        desc: "Educate on whitening, veneers, bonding. Set expectations on results, timeline, and cost before consultation."
    },
    {
        icon: "🚨",
        title: "Emergency Triage",
        desc: "Flag urgent cases (knocked-out tooth, facial swelling) and route to emergency line. Handle non-urgent queries instantly."
    },
    {
        icon: "🩹",
        title: "Post-Procedure Care",
        desc: "Answer routine post-op questions (bleeding, swelling, pain management) with your approved protocols—24/7."
    }
];

// Innovation data
export const innovationData = [
    { title: "Dental-Tuned NLP", desc: "Understands queries like 'Invisalign pain', 'dry socket', and 'veneer chipping' naturally." },
    { title: "Practice Protocols", desc: "Customizable to your specific post-op instructions and appointment scheduling rules." },
    { title: "Lead Qualification", desc: "Identifies high-value cosmetic cases vs routine check-ups automatically." }
];

// Solutions data
export const solutionsData = [
    {
        title: "Single Practices",
        desc: "Convert more website visitors into booked appointments without extra staff.",
        icon: "🦷"
    },
    {
        title: "Multi-Location Groups",
        desc: "Standardize patient intake and education across all your office locations.",
        icon: "🏢"
    },
    {
        title: "Cosmetic Centers",
        desc: "Pre-qualify high-value veneer and makeover candidates 24/7.",
        icon: "✨"
    },
    {
        title: "Orthodontists",
        desc: "Capture aligner leads and answer routine bracket/tray questions automatically.",
        icon: "😁"
    }
];

// FAQ items
export const faqItems = [
    {
        question: 'How does it help with Invisalign cases?',
        answer: 'Widget qualifies candidates 24/7, captures contact info, and sends chat history to your coordinator.'
    },
    {
        question: 'Does it integrate with Dentrix/Eaglesoft?',
        answer: 'Direct integrations are on our roadmap (Q2 2025). Currently, we provide email alerts and CSV exports for leads.'
    },
    {
        question: 'Is it HIPAA compliant?',
        answer: 'Yes, we use enterprise-grade encryption and access controls. BAA provided for Growth and Enterprise plans.'
    },
    {
        question: 'Can it handle emergency calls?',
        answer: 'Yes. It detects keywords like "knocked out tooth" or "swelling" and prompts patients to call your emergency line immediately.'
    },
    {
        question: 'How long does setup take?',
        answer: 'About 48 hours. We provide pre-built templates for aligners, cosmetic queries, and post-op care that you can customize.'
    },
    {
        question: 'Do patients need an app?',
        answer: 'No. The chat widget lives directly on your existing practice website and works on any mobile device.'
    }
];

// Pricing tiers (One-time payment model)
// Pricing tiers (SaaS model)
export const pricingTiers = [
    {
        name: "Starter",
        subtitle: "Single Location",
        price: "$197",
        period: "/month",
        description: "Perfect for solo dental practices building their digital presence.",
        features: [
            "500 conversations/month",
            "Branded chatbot widget",
            "3 Custom Q&A flows (Aligners, etc)",
            "Email lead notifications",
            "Basic support"
        ],
        cta: "Start Free Trial",
        highlighted: false,
        icon: "�"
    },
    {
        name: "Growth",
        subtitle: "2-5 Locations",
        price: "$497",
        period: "/month",
        description: "For growing groups wanting to dominate local aligner/cosmetic markets.",
        features: [
            "Unlimited conversations",
            "Multi-location routing",
            "Custom treatment guides",
            "Priority support",
            "BAA for HIPAA compliance",
            "Calendar integration (Zapier)"
        ],
        cta: "Get Started",
        highlighted: true,
        icon: "🚀"
    },
    {
        name: "DSO / Enterprise",
        subtitle: "6+ Locations",
        price: "Custom",
        period: "Volume pricing",
        description: "White-label solution for DSOs and large dental networks.",
        features: [
            "Everything in Growth",
            "PMS Integration (Dentrix/Eaglesoft)",
            "Dedicated success manager",
            "Custom AI training",
            "API Access",
            "White-label options"
        ],
        cta: "Contact Sales",
        highlighted: false,
        icon: "🏢"
    }
];

// Technology partners/stack
export const technologyData = [
    {
        name: "Google Gemini AI",
        description: "Dental-tuned AI that understands clinical terminology for aligners and implants.",
        icon: "🤖"
    },
    {
        name: "Lead Capture",
        description: "Instant notification system via Email (and SMS coming soon).",
        icon: "⚡"
    },
    {
        name: "HIPAA Compliant",
        description: "Secure, encrypted infrastructure safe for patient data.",
        icon: "🔒"
    },
    {
        name: "Mobile First",
        description: "Works perfectly on patient smartphones without app downloads.",
        icon: "📱"
    },
    {
        name: "Website Widget",
        description: "Embeds on WordPress, Wix, Squarespace, and custom sites.",
        icon: "💻"
    },
    {
        name: "Encryption",
        description: "AES-256 military-grade protection for all chat history.",
        icon: "🛡️"
    }
];

// Roadmap items
export const roadmapData = [
    {
        status: "live",
        title: "24/7 Lead Capture",
        description: "Live chat widget that captures and qualifies patient leads automatedly.",
        quarter: "Now Available"
    },
    {
        status: "live",
        title: "Aligner Screening",
        description: "Pre-built flow to qualify Invisalign/ClearCorrect candidates.",
        quarter: "Now Available"
    },
    {
        status: "in-progress",
        title: "Calendar Sync",
        description: "Direct booking into Calendly, Acuity, and Google Calendar.",
        quarter: "Q1 2025"
    },
    {
        status: "planned",
        title: "PMS Integration",
        description: "Deep integration with Dentrix, Eaglesoft, and Open Dental.",
        quarter: "Q2 2025"
    },
    {
        status: "planned",
        title: "SMS Campaigns",
        description: "Automated follow-up texts for unbooked leads.",
        quarter: "Q3 2025"
    }
];

// Security & compliance features
export const securityFeatures = [
    {
        title: "HIPAA-Aligned Architecture",
        description: "Built from the ground up with healthcare compliance in mind. Our infrastructure follows HIPAA security and privacy guidelines.",
        icon: "🏥"
    },
    {
        title: "AES-256 Encryption",
        description: "All patient data is encrypted at rest and in transit using military-grade AES-256 encryption standards.",
        icon: "🔐"
    },
    {
        title: "Audit-Ready Logging",
        description: "Every conversation is logged with timestamps, user IDs, and AI responses for complete audit trails and compliance reviews.",
        icon: "📋"
    },
    {
        title: "Business Associate Agreements",
        description: "For eligible healthcare organizations, we provide BAAs to ensure HIPAA compliance and shared responsibility.",
        icon: "📝"
    },
    {
        title: "Role-Based Access Control",
        description: "Granular permissions ensure that only authorized personnel can access patient data and system configurations.",
        icon: "👥"
    },
    {
        title: "Regular Security Audits",
        description: "Continuous monitoring and quarterly security assessments to identify and mitigate potential vulnerabilities.",
        icon: "🔍"
    }
];

// Structured Data for SEO
export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "SoftwareApplication",
            "name": "MedGuide AI",
            "applicationCategory": "DentalApplication",
            "operatingSystem": "Web",
            "offers": {
                "@type": "Offer",
                "price": "197",
                "priceCurrency": "USD"
            },
            "description": "AI-powered patient intake and lead capture for dental practices. Qualifies Invisalign candidates and answers post-op questions 24/7."
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How does MedGuide AI help dental practices?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "It captures after-hours leads, qualifies aligner candidates, and answers routine patient questions automatically."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is it HIPAA compliant?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, we use enterprise-grade encryption and providing BAAs for dental practices."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Does it integrate with PMS?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Integrations with Dentrix, Eaglesoft, and Open Dental are coming in Q2 2025."
                    }
                }
            ]
        }
    ]
};

