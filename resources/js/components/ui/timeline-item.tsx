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
            className="relative pl-8 pb-8 border-l border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out'
            }}
        >
            <div className="absolute left-0 top-0 w-3 h-3 bg-[#20B2AA] rounded-full -translate-x-1.5"></div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#20B2AA] text-sm mb-3">
                {period}
            </div>
            <h4 className="text-xl font-semibold mb-1 dark:text-white">{title}</h4>
            <p className="text-[#20B2AA] font-medium mb-2">{organization}</p>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
    );
} 