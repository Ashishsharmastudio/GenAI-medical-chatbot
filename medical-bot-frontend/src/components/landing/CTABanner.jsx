import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeInUp } from './constants';
import BookingModal from './BookingModal';

export default function CTABanner({ navigate }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-center text-white shadow-2xl sm:p-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Background orbs */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-purple-500/30 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to See MedGuide AI in Your World?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-sm text-indigo-100 sm:text-base">
              Whether you&apos;re running a dental clinic, surgical or
              orthopaedic service line, a hospital, or a CME / MedEd program,
              we&apos;ll show you how MedGuide AI plugs into your existing
              intake, triage and education workflows.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="rounded-full bg-white px-8 py-3 text-sm font-bold text-indigo-700 transition-colors hover:bg-indigo-50"
              >
                Get Started Now
              </button>
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="rounded-full bg-indigo-800 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-900"
              >
                Book a Consultation
              </button>
            </div>

            <p className="mt-4 text-xs text-indigo-100 sm:text-sm">
              Short, focused sessions. We tailor the demo to your reality—clinic
              workflows, hospital pathways or CME / conference use cases.
            </p>
          </div>
        </motion.div>
      </section>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
