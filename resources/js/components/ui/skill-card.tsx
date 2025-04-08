import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

interface SkillCardProps {
    skill: string;
    percentage: number;
}

export function SkillCard({ skill, percentage }: SkillCardProps) {
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
            className="bg-white rounded-3xl p-8 shadow-sm transform transition-all duration-500"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
        >
            <div className="text-[#20B2AA] text-4xl font-bold mb-4">
                <CountUp
                    end={percentage}
                    suffix="%"
                    duration={2}
                    start={isVisible ? 0 : undefined}
                />
            </div>
            <div className="text-gray-900 font-medium">{skill}</div>
        </div>
    );
} 