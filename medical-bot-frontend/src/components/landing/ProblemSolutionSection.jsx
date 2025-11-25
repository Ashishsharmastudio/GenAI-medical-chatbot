import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
        }
    },
};

export default function ProblemSolutionSection() {
    return (
        <motion.section
            id="problem"
            className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <motion.div
                        className="inline-flex items-center px-4 py-1 mb-4 text-sm font-semibold rounded-full bg-red-50 text-red-700 border border-red-100"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span className="mr-2">⚠️</span>
                        <span>Current Healthcare Challenges</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        The Problem for Modern Clinics
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Dentists, surgeons and orthopaedic teams aren't short of expertise.
                        They're short of <span className="font-semibold text-gray-900">time</span> — drowning in unstructured messages, manual triage
                        and scattered booking systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* The Problem */}
                    <motion.div
                        variants={fadeInLeft}
                        className="relative group"
                    >
                        <motion.div
                            className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-100 rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300"
                            whileHover={{ y: -5 }}
                        >
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                                😰
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-4">
                                What Practitioners Are Dealing With
                            </h3>

                            <motion.ul
                                className="space-y-4"
                                variants={staggerContainer}
                            >
                                {[
                                    {
                                        icon: "📱",
                                        title: "Unstructured intake:",
                                        desc: "symptoms arrive as WhatsApp messages, phone calls and vague \"I have pain\" notes, with no standard questions or structured history."
                                    },
                                    {
                                        icon: "🤔",
                                        title: "Manual triage:",
                                        desc: "front desk and nursing staff guess urgency and specialty, and high-risk cases can be buried under routine queries."
                                    },
                                    {
                                        icon: "🔄",
                                        title: "Repetitive follow-ups:",
                                        desc: "doctors spend evenings answering the same post-op & treatment questions instead of focusing on complex decisions."
                                    },
                                    {
                                        icon: "📅",
                                        title: "Scattered bookings:",
                                        desc: "appointments are split across phone diaries, WhatsApp threads and reception logs — conversations don't automatically turn into confirmed slots."
                                    },
                                    {
                                        icon: "📊",
                                        title: "No single source of truth:",
                                        desc: "owners and admins lack a central dashboard to see patient queries, triage load, and how many conversations actually convert into bookings."
                                    }
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        variants={fadeInUp}
                                        className="flex items-start space-x-3 bg-white/60 p-4 rounded-xl backdrop-blur-sm border border-red-100 hover:border-red-200 transition-all"
                                        whileHover={{ x: 5 }}
                                    >
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <div className="text-sm text-gray-700">
                                            <span className="font-semibold text-gray-900">{item.title}</span>{' '}
                                            {item.desc}
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </motion.div>

                    {/* The Solution */}
                    <motion.div
                        variants={fadeInRight}
                        className="relative group"
                    >
                        <motion.div
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300"
                            whileHover={{ y: -5 }}
                        >
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                                ✨
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-4">
                                How MedGuide AI Helps
                            </h3>

                            <motion.p
                                className="text-sm text-gray-700 mb-6 bg-white/60 p-4 rounded-xl border border-blue-100"
                                variants={scaleIn}
                            >
                                MedGuide AI sits where the chaos starts — <span className="font-semibold text-blue-700">in the conversation</span> — and turns it into
                                structured, trackable workflows your team can rely on.
                            </motion.p>

                            <motion.ul
                                className="space-y-4 mb-6"
                                variants={staggerContainer}
                            >
                                {[
                                    {
                                        icon: "✅",
                                        title: "Structured intake & triage:",
                                        desc: "the assistant asks consistent, specialty-aware questions and organises symptoms into a clear, clinician-ready summary."
                                    },
                                    {
                                        icon: "📋",
                                        title: "Audit-ready history:",
                                        desc: "every question and answer is stored per user, giving you a reviewable, compliant trail of what was communicated."
                                    },
                                    {
                                        icon: "📚",
                                        title: "Source-aware guidance:",
                                        desc: "responses can be constrained to approved documents and guidelines, so teams know exactly which knowledge base the AI is using."
                                    },
                                    {
                                        icon: "🗓️",
                                        title: "Chat-native booking (add-on):",
                                        desc: "turn conversations into confirmed appointments by letting the chatbot capture details and write directly into your booking flow."
                                    },
                                    {
                                        icon: "📈",
                                        title: "Admin dashboard (add-on):",
                                        desc: "give clinic owners and ops teams a single pane of glass to monitor queries, triage queues, bookings and assistant performance in real time."
                                    }
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        variants={fadeInUp}
                                        className="flex items-start space-x-3 bg-white/60 p-4 rounded-xl backdrop-blur-sm border border-blue-100 hover:border-blue-200 transition-all"
                                        whileHover={{ x: 5 }}
                                    >
                                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                                        <div className="text-sm text-gray-700">
                                            <span className="font-semibold text-gray-900">{item.title}</span>{' '}
                                            {item.desc}
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div
                                className="flex flex-wrap gap-3"
                                variants={scaleIn}
                            >
                                <motion.span
                                    className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-white text-blue-700 border-2 border-blue-200 shadow-sm"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                    Today: triage & structured chat
                                </motion.span>
                                <motion.span
                                    className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="mr-2">🚀</span>
                                    Roadmap: booking & admin dashboard
                                </motion.span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
