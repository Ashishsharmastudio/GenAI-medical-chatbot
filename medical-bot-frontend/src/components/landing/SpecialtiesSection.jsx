import { motion } from 'framer-motion';
import { specialtiesData, fadeInUp, staggerContainer } from './constants';

export default function SpecialtiesSection() {
    return (
        <motion.section
            id="specialties"
            className="py-20 bg-white"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">
                        One AI Layer for Every Specialty
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        From the dental chair to the OT to the orthopaedic ward, MedGuide AI adapts to how your
                        department already works — not the other way around.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {specialtiesData.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col"
                        >
                            <div className="text-3xl mb-4">{item.icon}</div>
                            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm flex-1">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
