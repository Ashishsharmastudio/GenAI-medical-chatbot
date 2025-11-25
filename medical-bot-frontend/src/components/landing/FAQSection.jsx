import { motion } from 'framer-motion';
import { faqItems, fadeInUp, staggerContainer } from './constants';

export default function FAQSection({ openFaq, setOpenFaq }) {
    return (
        <motion.section
            id="faq"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-4xl mx-auto">
                <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center mb-4">
                    Frequently Asked Questions
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    className="text-gray-600 text-center mb-10 max-w-2xl mx-auto"
                >
                    Straight answers for dentists, surgeons, orthopaedic specialists and hospital teams evaluating MedGuide AI.
                </motion.p>
                <div className="space-y-4">
                    {faqItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50"
                        >
                            <button
                                type="button"
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                className="w-full flex items-center justify-between px-6 py-4 text-left"
                            >
                                <span className="font-semibold text-gray-900">{item.question}</span>
                                <span className="ml-4 text-xl text-gray-500">
                                    {openFaq === idx ? '−' : '+'}
                                </span>
                            </button>
                            {openFaq === idx && (
                                <div className="px-6 pb-4 text-gray-600 text-sm bg-gray-50 border-t border-gray-200">
                                    {item.answer}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
