import { useState, useEffect, useRef } from 'react';

// API base URL - must match backend
const API_BASE = import.meta.env.DEV
    ? "http://localhost:8080"
    : (import.meta.env.VITE_API_BASE || "http://localhost:8080");

export default function LandingChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showLeadCapture, setShowLeadCapture] = useState(false);
    const [leadInfo, setLeadInfo] = useState({ name: '', email: '', phone: '' });
    const [conversationStage, setConversationStage] = useState('greeting'); // greeting, qualifying, captured
    const messagesEndRef = useRef(null);

    const suggestedQuestions = [
        "Book a demo",
        "How does it work?",
        "See pricing",
        "What specialties?"
    ];

    // Initial greeting when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                role: 'assistant',
                content: "Hi! 👋 Looking to streamline your practice with AI? I can help you discover how MedGuide transforms patient care for dentists, surgeons, and orthopaedic specialists."
            }]);
        }
    }, [isOpen, messages.length]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Load conversation from localStorage
    useEffect(() => {
        const savedConvo = localStorage.getItem('medguide_landing_chat');
        if (savedConvo) {
            try {
                const parsed = JSON.parse(savedConvo);
                setMessages(parsed.messages || []);
                setConversationStage(parsed.stage || 'greeting');
                setShowLeadCapture(parsed.showLeadCapture || false);
            } catch (e) {
                console.error('Error loading chat:', e);
            }
        }
    }, []);

    // Save conversation to localStorage
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('medguide_landing_chat', JSON.stringify({
                messages,
                stage: conversationStage,
                showLeadCapture
            }));
        }
    }, [messages, conversationStage, showLeadCapture]);

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = { role: 'user', content: text };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        // Simple rule-based responses for lead qualification
        const response = generateResponse(text, messages.length);

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);

            // Show lead capture after 2-3 exchanges (4-6 messages)
            if (messages.length >= 4 && !showLeadCapture && conversationStage !== 'captured') {
                setTimeout(() => setShowLeadCapture(true), 1000);
            }
        }, 800);
    };

    const generateResponse = (userText, messageCount) => {
        const text = userText.toLowerCase();

        // Booking/Demo intent
        if (text.includes('book') || text.includes('demo') || text.includes('consultation') || text.includes('schedule')) {
            return "Perfect! I'd love to schedule a personalized demo for you. Our AI assistant can analyze symptoms, provide evidence-based guidance, and save you hours each week. May I get your contact details to set this up?";
        }

        // Pricing intent
        if (text.includes('price') || text.includes('cost') || text.includes('pricing')) {
            return "Great question! We offer flexible plans starting with a free trial. Our Pro plan includes unlimited consultations, specialty-specific AI models, and priority support. Would you like to see a detailed pricing breakdown or book a demo to discuss your specific needs?";
        }

        // How it works
        if (text.includes('how') || text.includes('work')) {
            return "MedGuide AI integrates seamlessly into your practice workflow:\n\n✓ Patients describe symptoms\n✓ AI analyzes and provides structured assessment\n✓ You review AI-assisted diagnosis and treatment plans\n✓ Save 40% time on consultations\n\nServing dentists, surgeons, and orthopaedic specialists. What's your specialty?";
        }

        // Specialty question
        if (text.includes('specialty') || text.includes('specialties')) {
            return "We specialize in three key areas:\n\n🦷 **Dental** - Root canals, extractions, orthodontics\n🔪 **Surgery** - Pre/post-op care, wound management\n🦴 **Orthopaedics** - Joint pain, fractures, sports injuries\n\nWhich area matches your practice?";
        }

        // Specialty mentions
        if (text.includes('dentist') || text.includes('dental') || text.includes('teeth')) {
            return "Excellent! For dental practices, MedGuide helps with:\n\n• Patient symptom triage (cavity vs emergency)\n• Post-procedure care guidance\n• Treatment plan explanations\n\nDentists using our platform report 45% faster consultations. How many patients do you typically see per week?";
        }

        if (text.includes('surgeon') || text.includes('surgery')) {
            return "Fantastic! For surgical practices, MedGuide provides:\n\n• Pre-operative patient education\n• Post-op monitoring and guidance\n• Complication detection support\n\nSurgeons save 3+ hours weekly. Tell me about your surgical specialty?";
        }

        if (text.includes('ortho') || text.includes('bone') || text.includes('joint')) {
            return "Perfect fit! For orthopaedic practices:\n\n• Sports injury assessment\n• Fracture care protocols\n• Rehabilitation tracking\n\nOrthopaedic specialists see 50% fewer follow-up questions. What type of cases do you handle most?";
        }

        // Numbers/volume mentioned
        if (/\d+/.test(text)) {
            return "That's a substantial patient volume! With that many consultations, you could save significant time. Our AI handles routine questions while you focus on complex cases. Ready to see it in action with a personalized demo?";
        }

        // Default qualifying response
        const defaultResponses = [
            "That's great to hear! MedGuide AI is trusted by over 500 medical practices. We reduce consultation time by 40% while improving patient satisfaction. What aspect interests you most - time savings, patient care, or both?",
            "I appreciate you sharing that! Our platform is specifically designed for busy practitioners like you. We've helped practices cut administrative overhead and improve diagnosis accuracy. What challenges are you currently facing in your practice?",
            "Interesting! Let me tell you what sets us apart: evidence-based AI, HIPAA-compliant security, and seamless EMR integration. Would you like to see how it works for your specialty?"
        ];

        return defaultResponses[Math.min(messageCount, defaultResponses.length - 1)];
    };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();

        if (!leadInfo.email) {
            alert('Please enter your email');
            return;
        }

        setIsLoading(true);

        try {
            // Send lead data to backend
            const response = await fetch(`${API_BASE}/api/landing/lead`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...leadInfo,
                    conversation: messages,
                    source: 'landing_chatbot',
                    timestamp: new Date().toISOString()
                })
            });

            if (response.ok) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `Thank you, ${leadInfo.name || 'there'}! 🎉\n\nI've sent your information to our team. You'll receive an email shortly to schedule your personalized demo.\n\nIn the meantime, feel free to explore our website or book directly: https://calendly.com/medguide-ai`
                }]);
                setShowLeadCapture(false);
                setConversationStage('captured');
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Lead submission error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I apologize, there was an issue. Please email us directly at contact@medguide-ai.com or call (555) 123-4567."
            }]);
            setShowLeadCapture(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                    aria-label="Open chat"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>

                    {/* Notification Badge */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
                        1
                    </span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col animate-slideUp">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.84-1.66C4.62 14.6 1 11.23 1 7.4c0-3.04 2.4-5.49 5.37-5.5h.13c1.7 0 3.33.83 4.3 2.22l.2.29.2-.29c.97-1.39 2.6-2.22 4.3-2.22h.13c2.97.01 5.37 2.46 5.37 5.5 0 3.83-3.62 7.2-9.16 12.29L12 21.35z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold">MedGuide AI</div>
                                <div className="text-xs text-white/80">Typically replies instantly</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            aria-label="Close chat"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                                    }`}>
                                    <div className="text-sm whitespace-pre-line">{msg.content}</div>
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Lead Capture Form */}
                        {showLeadCapture && conversationStage !== 'captured' && (
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border-2 border-blue-200">
                                <div className="text-sm font-semibold text-gray-800 mb-3">📧 Let's connect!</div>
                                <form onSubmit={handleLeadSubmit} className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={leadInfo.name}
                                        onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email *"
                                        required
                                        value={leadInfo.email}
                                        onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone (optional)"
                                        value={leadInfo.phone}
                                        onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 text-sm"
                                    >
                                        {isLoading ? 'Submitting...' : 'Book My Demo →'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Suggested Questions (only show at start) */}
                        {messages.length <= 1 && (
                            <div className="space-y-2">
                                <div className="text-xs text-gray-500 text-center">Quick questions:</div>
                                <div className="grid grid-cols-2 gap-2">
                                    {suggestedQuestions.map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSendMessage(q)}
                                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs hover:border-blue-500 hover:bg-blue-50 transition-all"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }} className="flex space-x-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message..."
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm disabled:bg-gray-100"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputText.trim()}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
