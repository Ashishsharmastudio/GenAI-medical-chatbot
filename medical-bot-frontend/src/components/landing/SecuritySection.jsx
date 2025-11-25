import { motion } from 'framer-motion';
import { securityFeatures, fadeInUp, staggerContainer } from './constants';

export default function SecuritySection() {
    return (
        <motion.section
            id="security"
            className="py-20 bg-gray-900 text-white relative overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <motion.div
                        className="inline-flex items-center px-4 py-1 mb-4 text-sm font-semibold rounded-full bg-green-500/20 text-green-300 border border-green-500/30"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="mr-2">🔒</span>
                        <span>Security & Compliance</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Built for Healthcare Security
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Your patients trust you with their health. We take that responsibility seriously
                        with enterprise-grade security and HIPAA-aligned architecture.
                    </p>
                </motion.div>

                {/* Security Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {securityFeatures.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                            whileHover={{ y: -5 }}
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-16 text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
                >
                    <h3 className="text-2xl font-bold mb-4">Need a Business Associate Agreement (BAA)?</h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        For eligible healthcare organizations, we provide BAAs to ensure HIPAA compliance
                        and establish shared responsibility for protected health information.
                    </p>
                    <motion.a
                        href="#contact"
                        className="inline-flex items-center px-8 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Request BAA Information
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </motion.section>
    );
}
