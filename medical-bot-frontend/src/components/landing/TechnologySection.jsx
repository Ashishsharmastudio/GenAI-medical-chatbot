import { motion } from 'framer-motion';
import { technologyData, fadeInUp, staggerContainer } from './constants';

export default function TechnologySection() {
    return (
        <motion.section
            id="technology"
            className="py-20 bg-white relative overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <motion.div
                        className="inline-flex items-center px-4 py-1 mb-4 text-sm font-semibold rounded-full bg-purple-50 text-purple-700 border border-purple-100"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="mr-2">⚡</span>
                        <span>Powered by Leading Technology</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Built on Enterprise-Grade Stack
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        MedGuide AI leverages cutting-edge technologies from industry leaders
                        to deliver fast, secure, and intelligent healthcare solutions.
                    </p>
                </motion.div>

                {/* Technology Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {technologyData.map((tech, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="group relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-purple-200 transition-all duration-300"
                            whileHover={{ y: -5 }}
                        >
                            {/* Category badge */}
                            <div className="absolute top-4 right-4">
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                                    {tech.category}
                                </span>
                            </div>

                            {/* Icon */}
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                {tech.icon}
                            </div>

                            {/* Name */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {tech.name}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm">
                                {tech.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Powered by Section */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-16 text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 border border-purple-100"
                >
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
                        <span className="text-gray-600 font-medium">Powered by:</span>
                        <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                            <span className="text-2xl">🤖</span>
                            <span className="font-bold text-gray-900">Google Gemini AI</span>
                        </div>
                        <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                            <span className="text-2xl">🔗</span>
                            <span className="font-bold text-gray-900">LangChain</span>
                        </div>
                        <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                            <span className="text-2xl">🍃</span>
                            <span className="font-bold text-gray-900">MongoDB</span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                        Trusted by thousands of healthcare providers worldwide, our technology partners ensure
                        reliability, scalability, and cutting-edge AI capabilities.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
}
