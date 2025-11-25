import { motion } from 'framer-motion';
import { roadmapData, fadeInUp, staggerContainer } from './constants';

const statusConfig = {
    live: {
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: '✅',
        label: 'Live'
    },
    'in-progress': {
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: '🚧',
        label: 'In Progress'
    },
    planned: {
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: '📅',
        label: 'Planned'
    }
};

export default function RoadmapSection() {
    return (
        <motion.section
            id="roadmap"
            className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Background elements */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <motion.div
                        className="inline-flex items-center px-4 py-1 mb-4 text-sm font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="mr-2">🗺️</span>
                        <span>Product Roadmap</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        What We're Building
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See what's available today and what's coming next. We're constantly evolving
                        to serve healthcare providers better.
                    </p>
                </motion.div>

                {/* Roadmap Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500"></div>

                    {/* Roadmap Items */}
                    <div className="space-y-8">
                        {roadmapData.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="relative pl-20"
                            >
                                {/* Status dot */}
                                <div className={`absolute left-5 top-3 w-7 h-7 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${item.status === 'live'
                                        ? 'bg-green-500'
                                        : item.status === 'in-progress'
                                            ? 'bg-blue-500'
                                            : 'bg-purple-500'
                                    }`}>
                                    <span className="text-xs">{statusConfig[item.status].icon}</span>
                                </div>

                                {/* Content */}
                                <motion.div
                                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 hover:border-indigo-200"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[item.status].color}`}>
                                            {statusConfig[item.status].label}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                    <div className="flex items-center text-sm">
                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-gray-500 font-medium">{item.quarter}</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-16 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Have a Feature Request?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        We'd love to hear from you! Let us know what features would help your practice
                        deliver better patient care.
                    </p>
                    <motion.a
                        href="#contact"
                        className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Share Your Ideas
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </motion.section>
    );
}
