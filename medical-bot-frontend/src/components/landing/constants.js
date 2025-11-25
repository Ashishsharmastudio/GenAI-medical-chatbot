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
export const specialties = [
    'Orthopaedics',
    'Physicians',
    'Dental',
    'Dermatology',
    'Cardiology',
    'ENT',
    'Gynaecology',
    'General Surgery',
    'Neurology',
    'Paediatrics'
];

// Stats data
export const statsData = [
    { label: "Reduced chair-side admin for dentists", icon: "🦷", color: "bg-purple-50 text-purple-700" },
    { label: "Faster triage workflows for surgeons", icon: "🧑‍⚕️", color: "bg-orange-50 text-orange-700" },
    { label: "Improved patient satisfaction in orthopaedics", icon: "🦴", color: "bg-green-50 text-green-700" }
];

// Features data
export const featuresData = [
    {
        title: "Instant Analysis",
        desc: "Real-time symptom organization and clinical context extraction across dentistry, surgery and orthopaedics."
    },
    {
        title: "Smart Triage",
        desc: "Intelligently prioritize cases based on urgency and severity using structured decision-support tools designed for clinical workflows."
    },
    {
        title: "Secure Data",
        desc: "Enterprise-grade encryption, HIPAA-aligned safeguards and strict access controls for all patient interactions."
    }
];

// Specialties section data
export const specialtiesData = [
    {
        icon: "🦷",
        title: "Dentists & Dental Clinics",
        desc: "Pre-visit intake, recall reminders and post-procedure education—delivered through structured, AI-guided conversations."
    },
    {
        icon: "🧑‍⚕️",
        title: "Surgeons & OT Teams",
        desc: "Support pre-op assessments, consent workflows and immediate post-surgery follow-ups with clear checklists."
    },
    {
        icon: "🦴",
        title: "Orthopaedic Centres",
        desc: "Triage joint pain, sports injuries and post-op rehab with structured flows your team can trust."
    },
    {
        icon: "🏥",
        title: "Multi-specialty Hospitals",
        desc: "Standardise triage and symptom checks across all departments without slowing anyone down."
    }
];

// Innovation data
export const innovationData = [
    { title: "Advanced NLP", desc: "Understand complex dental, surgical and orthopaedic queries in natural language." },
    { title: "Deep Learning", desc: "Continuous improvement through advanced machine learning models tuned on healthcare workflows." },
    { title: "Global Knowledge", desc: "Access to worldwide medical guidelines, best practices and clinical research." }
];

// Solutions data
export const solutionsData = [
    {
        title: "Dental Clinics & Chains",
        desc: "Triage tooth pain, aligner queries and routine check-ups before the patient even walks in.",
        icon: "🦷"
    },
    {
        title: "Surgical Departments",
        desc: "Pre-op screening, risk flags and post-op monitoring summarised for your surgical teams.",
        icon: "🔪"
    },
    {
        title: "Orthopaedic Centres",
        desc: "Guide patients on joint pain, fractures and rehab plans with structured, easy-to-follow flows.",
        icon: "🦴"
    },
    {
        title: "Hospitals & Health Systems",
        desc: "Unify triage, symptom checks and education across emergency, OPD and IPD in one AI layer.",
        icon: "🏥"
    }
];

// FAQ items
export const faqItems = [
    {
        question: 'Is MedGuide AI free to use?',
        answer: 'Yes. Core features are free for patients. Clinics and hospitals can opt into premium workflows and integrations on top.'
    },
    {
        question: 'Is my data secure?',
        answer: 'We use enterprise-grade encryption, robust access controls and HIPAA-style security architecture. For eligible organizations, BAAs can be arranged.'
    },
    {
        question: 'Is this for dentists, surgeons and orthopaedic doctors too?',
        answer: 'Absolutely. MedGuide AI is used by dental clinics, surgical departments and orthopaedic centres for triage, pre-visit screening and post-op follow-ups.'
    },
    {
        question: 'Does MedGuide AI replace my doctor?',
        answer: 'No. MedGuide AI supports clinicians with structured triage and education, but it does not replace in-person examination, diagnosis or treatment by a licensed professional.'
    },
    {
        question: 'What technology powers MedGuide AI?',
        answer: 'MedGuide AI is powered by Google Gemini AI with LangChain for conversation management, plus advanced NLP and vector search capabilities for accurate medical guidance.'
    },
    {
        question: 'Do you offer enterprise contracts?',
        answer: 'Yes. We offer one-time setup packages for clinics and hospitals with lifetime access. Contact us for enterprise pricing and customization options.'
    }
];

// Pricing tiers (One-time payment model)
export const pricingTiers = [
    {
        name: "Free",
        subtitle: "For Patients",
        price: "$0",
        period: "Forever",
        description: "Perfect for individuals seeking medical guidance",
        features: [
            "AI-powered symptom analysis",
            "Basic triage recommendations",
            "Conversation history",
            "Multi-specialty support",
            "24/7 availability"
        ],
        cta: "Start Free Chat",
        highlighted: false,
        icon: "🩺"
    },
    {
        name: "Professional",
        subtitle: "For Clinics",
        price: "$2,499",
        period: "One-time setup",
        description: "Complete solution for dental, surgical & orthopaedic practices",
        features: [
            "Everything in Free",
            "Custom clinic branding",
            "Patient intake automation",
            "Structured triage workflows",
            "Audit-ready conversation logs",
            "Priority email support",
            "Source-aware AI responses",
            "Up to 5 practitioners"
        ],
        cta: "Get Started",
        highlighted: true,
        icon: "🏥"
    },
    {
        name: "Enterprise",
        subtitle: "For Hospitals",
        price: "Custom",
        period: "One-time setup",
        description: "Tailored for multi-specialty hospitals & health systems",
        features: [
            "Everything in Professional",
            "Admin dashboard (coming soon)",
            "EHR integrations (roadmap)",
            "Multi-location support",
            "Custom knowledge base",
            "BAA & compliance support",
            "Dedicated account manager",
            "Unlimited practitioners",
            "API access"
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
        description: "Advanced natural language processing",
        icon: "🤖",
        category: "AI Engine"
    },
    {
        name: "LangChain",
        description: "Conversation memory & context",
        icon: "🔗",
        category: "AI Framework"
    },
    {
        name: "MongoDB",
        description: "Secure data storage",
        icon: "🍃",
        category: "Database"
    },
    {
        name: "React + Vite",
        description: "Modern, fast frontend",
        icon: "⚛️",
        category: "Frontend"
    },
    {
        name: "AES-256 Encryption",
        description: "Enterprise-grade security",
        icon: "🔒",
        category: "Security"
    },
    {
        name: "HIPAA-Aligned",
        description: "Healthcare compliance",
        icon: "✅",
        category: "Compliance"
    }
];

// Roadmap items
export const roadmapData = [
    {
        status: "live",
        title: "AI Symptom Analysis",
        description: "Structured patient intake and intelligent triage across dental, surgical and orthopaedic specialties",
        quarter: "Now Available"
    },
    {
        status: "live",
        title: "Conversation History",
        description: "Audit-ready trails with searchable patient interactions and compliant logging",
        quarter: "Now Available"
    },
    {
        status: "in-progress",
        title: "Chat-Native Booking",
        description: "Turn conversations into confirmed appointments directly from the chat interface",
        quarter: "Q1 2025"
    },
    {
        status: "in-progress",
        title: "Admin Dashboard",
        description: "Real-time monitoring of queries, triage queues, bookings and assistant performance",
        quarter: "Q1 2025"
    },
    {
        status: "planned",
        title: "EHR Integrations",
        description: "Seamless integration with major electronic health record systems",
        quarter: "Q2 2025"
    },
    {
        status: "planned",
        title: "Voice Interface",
        description: "Voice input and output for hands-free patient interactions",
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
            "applicationCategory": "MedicalApplication",
            "operatingSystem": "Web",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "description": "AI-powered medical assistant for dentists, surgeons, orthopaedic clinics, hospitals and patients, providing instant health guidance and symptom checking."
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Is MedGuide AI free to use?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, our core features are completely free for patients."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is my data secure?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Absolutely. We use enterprise-grade encryption and are HIPAA compliant."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Who is MedGuide AI for?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "MedGuide AI is built for dentists, surgeons, orthopaedic doctors, hospitals, clinics and patients who need fast, structured and safe medical guidance."
                    }
                }
            ]
        }
    ]
};

