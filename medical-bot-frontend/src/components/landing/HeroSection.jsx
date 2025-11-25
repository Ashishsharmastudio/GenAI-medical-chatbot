import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from './constants';
import { ArrowRight } from './Icons';

export default function HeroSection({ navigate, specialties, currentSpecialtyIndex, fade }) {
    return (
        <motion.section
            className="text-center px-4 pb-20"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    variants={fadeInUp}
                    className="inline-flex items-center px-4 py-1 mb-6 text-sm font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                >
                    <span className="mr-2 text-base">✨</span>
                    <span>Built for dentists, surgeons & orthopaedic teams</span>
                </motion.div>

                <motion.h1
                    variants={fadeInUp}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                >
                    AI Clinical Workflow Assistant for{' '}
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 inline-block min-w-[280px] md:min-w-[400px] transition-opacity duration-500"
                        style={{ opacity: fade ? 1 : 0 }}
                    >
                        {specialties[currentSpecialtyIndex]}
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Clinical Clarity in Seconds</span>
                </motion.h1>

                <motion.p
                    variants={fadeInUp}
                    className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    MedGuide AI provides structured, evidence-informed symptom analysis and clinical workflow assistance for dental, surgical and orthopaedic practices. Designed for teams that need fast, reliable intake, triage support and patient education—without replacing clinical judgment.
                </motion.p>

                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <button
                        onClick={() => navigate('/chat')}
                        className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Start Chatting <ArrowRight />
                    </button>
                    <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all flex items-center justify-center">
                        View Demo
                    </button>
                </motion.div>
            </div>
        </motion.section>
    );
}
