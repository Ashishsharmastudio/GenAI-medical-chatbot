import { motion } from 'framer-motion';
import { pricingTiers, fadeInUp, staggerContainer } from './constants';
import { Check } from './Icons';

export default function PricingSection({ navigate }) {
    return (
        <motion.section
            id="pricing"
            className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <motion.div
                        className="inline-flex items-center px-4 py-1 mb-4 text-sm font-semibold rounded-full bg-green-50 text-green-700 border border-green-100"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="mr-2">💰</span>
                        <span>One-Time Payment • Lifetime Access</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        No subscriptions. No hidden fees. Pay once, use forever. Perfect for practices that value predictable costs.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
                    {pricingTiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className={`relative group ${tier.highlighted
                                    ? 'md:-mt-4 md:mb-4'
                                    : ''
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        ⭐ Most Popular
                                    </span>
                                </div>
                            )}

                            <motion.div
                                className={`relative h-full rounded-3xl p-8 ${tier.highlighted
                                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl border-4 border-blue-400'
                                        : 'bg-white border-2 border-gray-200 hover:border-blue-300 shadow-lg'
                                    } transition-all duration-300`}
                                whileHover={{ y: -8, scale: 1.02 }}
                            >
                                {/* Icon */}
                                <div className={`text-5xl mb-4`}>{tier.icon}</div>

                                {/* Tier name */}
                                <h3 className={`text-2xl font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                    {tier.name}
                                </h3>
                                <p className={`text-sm mb-6 ${tier.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                                    {tier.subtitle}
                                </p>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline">
                                        <span className={`text-5xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                            {tier.price}
                                        </span>
                                    </div>
                                    <p className={`text-sm mt-2 ${tier.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                                        {tier.period}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className={`text-sm mb-6 ${tier.highlighted ? 'text-blue-50' : 'text-gray-600'}`}>
                                    {tier.description}
                                </p>

                                {/* CTA Button */}
                                <motion.button
                                    onClick={() => navigate(tier.name === 'Free' ? '/chat' : '/signup')}
                                    className={`w-full py-3 px-6 rounded-xl font-semibold text-base mb-8 transition-all ${tier.highlighted
                                            ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-xl'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {tier.cta}
                                </motion.button>

                                {/* Features */}
                                <div className="space-y-3">
                                    <p className={`text-xs font-semibold uppercase tracking-wide mb-4 ${tier.highlighted ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                        What's included:
                                    </p>
                                    {tier.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start space-x-3">
                                            <span className={`flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-white' : ''}`}>
                                                <Check />
                                            </span>
                                            <span className={`text-sm ${tier.highlighted ? 'text-blue-50' : 'text-gray-700'}`}>
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-600 text-sm">
                        🔒 All tiers include enterprise-grade security and HIPAA-aligned infrastructure.
                        <a href="#faq" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                            Have questions?
                        </a>
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
}
