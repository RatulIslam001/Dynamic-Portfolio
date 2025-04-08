import { useEffect, useRef, useState } from 'react';

interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
    company: string;
}

export function TestimonialCard({ quote, name, role, company }: TestimonialCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div 
            ref={cardRef}
            className="bg-white rounded-3xl p-8 shadow-sm"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out'
            }}
        >
            {/* Quote Mark */}
            <div className="w-12 h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center mb-6">
                <span className="text-[#20B2AA] text-4xl leading-none" style={{ marginTop: '-0.2em' }}>"</span>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-gray-600 mb-8 italic">
                {quote}
            </blockquote>

            {/* Client Info */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    {/* Avatar placeholder - replace with actual image if available */}
                </div>
                <div>
                    <div className="font-semibold text-gray-900">{name}</div>
                    <div className="text-gray-500 text-sm">{role}, {company}</div>
                </div>
            </div>
        </div>
    );
} 