export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <span className="text-2xl">🩺</span>
                            <span className="text-2xl font-bold text-white">MedGuide AI</span>
                        </div>
                        <p className="text-slate-400 max-w-sm">
                            Empowering dentists, surgeons, orthopaedic specialists and patients with intelligent,
                            secure, and accurate medical AI assistance.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4">
                            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#solutions" className="hover:text-white transition-colors">Solutions</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#faq" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center text-sm">
                    <p>© 2025 MedGuide AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
