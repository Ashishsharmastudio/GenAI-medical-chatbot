import { motion } from 'framer-motion';
import { innovationData, fadeInUp, staggerContainer } from './constants';

export default function InnovationSection() {
    return (
        <motion.section
            className="py-20 bg-white"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-purple-900">Access Best in Class Innovation</h2>
                    <p className="mt-4 text-gray-600">Leverage cutting-edge AI technology for better health outcomes.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {innovationData.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="p-6 border border-purple-100 rounded-2xl bg-purple-50/50 hover:bg-purple-50 transition-colors"
                        >
                            <h3 className="text-lg font-bold text-purple-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
