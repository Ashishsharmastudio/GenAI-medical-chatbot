import { motion } from 'framer-motion';
import { solutionsData, fadeInUp, staggerContainer } from './constants';

export default function SolutionsSection() {
    return (
        <motion.section
            id="solutions"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    variants={fadeInUp}
                    className="text-3xl font-bold text-center mb-16"
                >
                    Discover the Right <span className="text-blue-600">AI Solutions</span> for Your Practice
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {solutionsData.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all flex items-start space-x-4"
                        >
                            <div className="text-4xl">{item.icon}</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-4">{item.desc}</p>
                                <a href="#" className="text-blue-600 font-medium text-sm hover:underline">Learn more →</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
