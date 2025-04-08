import { useEffect, useRef, useState } from 'react';

interface TimelineItemProps {
    period: string;
    title: string;
    organization: string;
    description: string;
}

export function TimelineItem({ period, title, organization, description }: TimelineItemProps) {
    const itemRef = useRef<HTMLDivElement>(null);
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

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    return (
        <div 
            ref={itemRef}
            className="relative pl-8 pb-12 last:pb-0"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out'
            }}
        >
            {/* Timeline dot and line */}
            <div className="absolute left-0 top-0 h-full">
                <div className="w-3 h-3 bg-[#20B2AA] rounded-full ring-4 ring-[#E6F7F6] relative z-10" />
                <div className="absolute top-4 bottom-0 left-1.5 w-[1px] bg-[#E6F7F6] -translate-x-1/2" />
            </div>

            {/* Content */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="text-[#20B2AA] text-sm font-medium mb-4">{period}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <div className="text-gray-500 mb-4">{organization}</div>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
} 