import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import SEO from '../components/SEO';
import Navigation from '../components/landing/Navigation';
import StatsSection from '../components/landing/StatsSection';
import HeroSection from '../components/landing/HeroSection';
import ProblemSolutionSection from '../components/landing/ProblemSolutionSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import SpecialtiesSection from '../components/landing/SpecialtiesSection';
import WhyWorkWithUs from '../components/landing/WhyWorkWithUs';
import TechnologySection from '../components/landing/TechnologySection';
import InnovationSection from '../components/landing/InnovationSection';
import PricingSection from '../components/landing/PricingSection';
import SecuritySection from '../components/landing/SecuritySection';
import RoadmapSection from '../components/landing/RoadmapSection';
import CTABanner from '../components/landing/CTABanner';
import SolutionsSection from '../components/landing/SolutionsSection';
import SuccessStories from '../components/landing/SuccessStories';
import FAQSection from '../components/landing/FAQSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';
import { specialties, structuredData } from '../components/landing/constants';

export default function Landing() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    // Rotating specialties state
    const [currentSpecialtyIndex, setCurrentSpecialtyIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentSpecialtyIndex((prevIndex) => (prevIndex + 1) % specialties.length);
                setFade(true);
            }, 500); // Half second for fade out
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <SEO
                title="AI Clinical Workflow Assistant & Symptom Analysis for Dentists, Surgeons & Orthopaedics"
                description="MedGuide AI delivers structured symptom analysis, triage assistance and patient guidance for dental, surgical and orthopaedic practices—powered by advanced healthcare AI."
                keywords="medical ai, symptom checker, health assistant, dentist ai, surgeon ai, orthopaedic ai, telemedicine"
                canonical="https://medguide-ai.com/"
            />
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>

            <Navigation navigate={navigate} />
            <StatsSection />
            <HeroSection
                navigate={navigate}
                specialties={specialties}
                currentSpecialtyIndex={currentSpecialtyIndex}
                fade={fade}
            />
            <ProblemSolutionSection />
            <FeaturesSection />
            <SpecialtiesSection />
            <WhyWorkWithUs />
            <TechnologySection />
            <InnovationSection />
            <PricingSection navigate={navigate} />
            <SecuritySection />
            <RoadmapSection />
            <CTABanner navigate={navigate} />
            <SolutionsSection />
            <SuccessStories />
            <FAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
            <ContactForm />
            <Footer />
        </div>
    );
}
