import { motion } from 'framer-motion';
import { statsData, fadeInUp, staggerContainer } from './constants';

export default function StatsSection() {
    return (
        <motion.div
            className="pt-32 pb-8 flex flex-wrap justify-center gap-4 sm:gap-6 px-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            {statsData.map((stat, i) => (
                <motion.div
                    key={i}
                    variants={fadeInUp}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${stat.color} border border-opacity-20 border-current shadow-sm`}
                >
                    <span>{stat.icon}</span>
                    <span>{stat.label}</span>
                </motion.div>
            ))}
        </motion.div>
    );
}
