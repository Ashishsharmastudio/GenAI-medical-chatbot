import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from './constants';
import { Check } from './Icons';

export default function WhyWorkWithUs() {
    return (
        <motion.section
            className="py-20 px-4 sm:px-6 lg:px-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center mb-16">
                    Why Work With Us
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        variants={fadeInUp}
                        className="bg-blue-50 p-10 rounded-3xl border border-blue-100"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-2xl">🛡️</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Trusted by Professionals</h3>
                        <p className="text-gray-600 mb-6">
                            Built in collaboration with leading dentists, surgeons and orthopaedic specialists
                            to ensure accuracy and reliability in every interaction.
                        </p>
                        <ul className="space-y-3">
                            {['Clinically validated', 'HIPAA-style safeguards', '24/7 availability'].map((item, i) => (
                                <li key={i} className="flex items-center text-gray-700">
                                    <Check /> <span className="ml-2">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        variants={fadeInUp}
                        className="bg-orange-50 p-10 rounded-3xl border border-orange-100"
                    >
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-2xl">⚡</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Built for Speed</h3>
                        <p className="text-gray-600 mb-6">
                            Optimised for rapid response times, so your front desk, nursing staff and doctors never wait on the AI.
                        </p>
                        <ul className="space-y-3">
                            {['< 1s response time', 'Real-time updates', 'Instant access across devices'].map((item, i) => (
                                <li key={i} className="flex items-center text-gray-700">
                                    <Check /> <span className="ml-2">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
