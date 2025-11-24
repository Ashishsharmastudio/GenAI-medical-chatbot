import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Landing() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    // SVG Icons for premium look
    const Icons = {
        Check: () => (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        ),
        ArrowRight: () => (
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        ),
        Brain: () => (
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        Speed: () => (
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        Shield: () => (
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        )
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                                M
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                                MedGuide AI
                            </span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                            <a href="#solutions" className="text-gray-600 hover:text-blue-600 transition-colors">Solutions</a>
                            <a href="#stories" className="text-gray-600 hover:text-blue-600 transition-colors">Stories</a>
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

            {/* Top Stats Section */}
            <div className="pt-32 pb-8 flex justify-center gap-6 px-4">
                {[
                    { label: "30% increase in efficiency", icon: "📈", color: "bg-purple-50 text-purple-700" },
                    { label: "10x faster diagnosis", icon: "⚡", color: "bg-orange-50 text-orange-700" },
                    { label: "90% user satisfaction", icon: "😊", color: "bg-green-50 text-green-700" }
                ].map((stat, i) => (
                    <div key={i} className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${stat.color} border border-opacity-20 border-current`}>
                        <span>{stat.icon}</span>
                        <span>{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* Hero Section */}
            <section className="text-center px-4 pb-20">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        From <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Confusion</span>
                        <br />
                        to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">AI Clarity</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Navigate the complex world of medical AI with confidence.
                        Our intelligent assistant provides clear, evidence-based guidance
                        tailored to your specific healthcare needs.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate('/chat')}
                            className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center"
                        >
                            Start Chatting <Icons.ArrowRight />
                        </button>
                        <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all flex items-center justify-center">
                            View Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Get There Faster Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Get There Faster with AI</h2>
                        <p className="text-gray-600">Accelerate your healthcare journey with intelligent tools</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Instant Analysis", desc: "Real-time symptom checking and preliminary diagnosis support.", icon: <Icons.Speed /> },
                            { title: "Smart Triage", desc: "Automatically prioritize cases based on severity and urgency.", icon: <Icons.Brain /> },
                            { title: "Secure Data", desc: "Enterprise-grade encryption for all patient information.", icon: <Icons.Shield /> }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                <a href="#" className="inline-flex items-center mt-4 text-blue-600 font-medium hover:text-blue-700">
                                    Learn more <Icons.ArrowRight />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Work With Us Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16">Why Work With Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-2xl">🛡️</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Trusted by Professionals</h3>
                            <p className="text-gray-600 mb-6">Built in collaboration with leading healthcare providers to ensure accuracy and reliability in every interaction.</p>
                            <ul className="space-y-3">
                                {['Clinically validated', 'HIPAA compliant', '24/7 Availability'].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700">
                                        <Icons.Check /> <span className="ml-2">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-orange-50 p-10 rounded-3xl border border-orange-100">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-2xl">⚡</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Built for Speed</h3>
                            <p className="text-gray-600 mb-6">Optimized for rapid response times, ensuring you get the information you need without delay.</p>
                            <ul className="space-y-3">
                                {['< 1s response time', 'Real-time updates', 'Instant access'].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700">
                                        <Icons.Check /> <span className="ml-2">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Access Best in Class Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-purple-900">Access Best in Class Innovation</h2>
                        <p className="mt-4 text-gray-600">Leverage cutting-edge AI technology for better health outcomes</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Advanced NLP", desc: "Understand complex medical queries with natural language processing." },
                            { title: "Deep Learning", desc: "Continuous improvement through advanced machine learning models." },
                            { title: "Global Knowledge", desc: "Access to worldwide medical databases and research." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 border border-purple-100 rounded-2xl bg-purple-50/50 hover:bg-purple-50 transition-colors">
                                <h3 className="text-lg font-bold text-purple-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bring Future to Life Banner */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Bring the Future of Health to Life</h2>
                        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">Join thousands of healthcare providers and patients who are already experiencing the benefits of AI-driven healthcare.</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => navigate('/signup')} className="px-8 py-3 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-colors">
                                Get Started Now
                            </button>
                            <button className="px-8 py-3 bg-indigo-700 text-white rounded-full font-bold hover:bg-indigo-800 transition-colors">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full translate-x-1/3 translate-y-1/3"></div>
                </div>
            </section>

            {/* Discover Solutions Grid */}
            <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16">
                        Discover the Right <span className="text-blue-600">AI Solutions</span> for Your Business
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "For Hospitals", desc: "Streamline patient intake and triage processes.", icon: "🏥" },
                            { title: "For Clinics", desc: "Reduce administrative burden and focus on care.", icon: "🩺" },
                            { title: "For Patients", desc: "24/7 access to personalized health guidance.", icon: "👤" },
                            { title: "For Research", desc: "Accelerate data analysis and clinical trials.", icon: "🔬" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all flex items-start space-x-4">
                                <div className="text-4xl">{item.icon}</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 mb-4">{item.desc}</p>
                                    <a href="#" className="text-blue-600 font-medium text-sm hover:underline">Learn more →</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section id="stories" className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        Success Stories
                    </div>
                    <h2 className="text-3xl font-bold mb-12">See what others are achieving</h2>
                    <div className="bg-gradient-to-br from-slate-50 to-white p-10 rounded-3xl shadow-xl border border-gray-100 relative">
                        <div className="text-4xl text-blue-200 absolute top-8 left-8">"</div>
                        <p className="text-xl text-gray-700 italic mb-8 relative z-10">
                            "MedGuide AI has completely transformed how we handle initial patient inquiries.
                            The accuracy and speed of the responses have reduced our administrative load by 40%
                            while improving patient satisfaction scores."
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="User" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-gray-900">Dr. Sarah Chen</div>
                                <div className="text-sm text-gray-500">Chief Medical Officer, HealthFirst</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform AI Confusion into Clarity?</h2>
                    <p className="text-gray-600 mb-12">Get in touch with our team to schedule a personalized demo.</p>

                    <form className="bg-white p-8 rounded-3xl shadow-lg text-left space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50" placeholder="Doe" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50" placeholder="john@company.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50" placeholder="Tell us about your needs..."></textarea>
                        </div>
                        <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:-translate-y-1">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-6">
                                <span className="text-2xl">🩺</span>
                                <span className="text-2xl font-bold text-white">MedGuide AI</span>
                            </div>
                            <p className="text-slate-400 max-w-sm">
                                Empowering healthcare providers and patients with intelligent,
                                secure, and accurate medical AI assistance.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Platform</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Solutions</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Company</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-sm">
                        <p>© 2025 MedGuide AI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
