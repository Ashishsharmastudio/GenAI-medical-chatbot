import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from './constants';

export default function SuccessStories() {
    return (
        <motion.section
            id="stories"
            className="py-20 bg-white"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    variants={fadeInUp}
                    className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
                >
                    Success Stories
                </motion.div>
                <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12">
                    See what others are achieving
                </motion.h2>
                <motion.div
                    variants={fadeInUp}
                    className="bg-gradient-to-br from-slate-50 to-white p-10 rounded-3xl shadow-xl border border-gray-100 relative"
                >
                    <div className="text-4xl text-blue-200 absolute top-8 left-8">"</div>
                    <p className="text-xl text-gray-700 italic mb-8 relative z-10">
                        "MedGuide AI has completely transformed how we handle initial patient inquiries across
                        dentistry, surgery and orthopaedics. Clinics report reduced administrative load and improved patient experience."
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="User" />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-gray-900">Dr. Sarah Chen</div>
                            <div className="text-sm text-gray-500">Chief Medical Officer, HealthFirst</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
