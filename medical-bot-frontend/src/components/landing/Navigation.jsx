import { motion } from 'framer-motion';

export default function Navigation({ navigate }) {
    return (
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold relative overflow-hidden group">
                            <span className="text-lg">⚕️</span>
                            <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                            MedGuide AI
                        </span>
                    </button>
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#problem" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Problem</a>
                        <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Features</a>
                        <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Pricing</a>
                        <a href="#technology" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Technology</a>
                        <a href="#security" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Security</a>
                        <a href="#roadmap" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Roadmap</a>
                        <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">FAQ</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-gray-900 font-medium">
                            Log in
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
