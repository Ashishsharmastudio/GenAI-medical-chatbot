import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeInUp } from './constants';
import BookingModal from './BookingModal';

export default function CTABanner({ navigate }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <>
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Bring the Future of Health to Life</h2>
                        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Join dentists, surgeons, orthopaedic specialists and hospitals already experiencing the benefits of AI-driven healthcare.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-8 py-3 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-colors"
                            >
                                Get Started Now
                            </button>
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="px-8 py-3 bg-indigo-700 text-white rounded-full font-bold hover:bg-indigo-800 transition-colors"
                            >
                                Book Consultation
                            </button>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full translate-x-1/3 translate-y-1/3"></div>
                </motion.div>
            </section>

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
}
