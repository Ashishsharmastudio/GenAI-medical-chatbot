import { motion } from 'framer-motion';
import { featuresData, fadeInUp, staggerContainer } from './constants';
import { ArrowRight } from './Icons';

export default function FeaturesSection() {
    return (
        <motion.section
            id="features"
            className="py-20 bg-gray-50"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Get There Faster with AI</h2>
                    <p className="text-gray-600">
                        Accelerate your dental workflows with intelligent tools.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuresData.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-2xl">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            <a href="#" className="inline-flex items-center mt-4 text-blue-600 font-medium hover:text-blue-700">
                                Learn more <ArrowRight />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
