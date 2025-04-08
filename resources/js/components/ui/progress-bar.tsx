import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

interface ProgressBarProps {
    label: string;
    percentage: number;
}

export function ProgressBar({ label, percentage }: ProgressBarProps) {
    const progressRef = useRef<HTMLDivElement>(null);
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

        if (progressRef.current) {
            observer.observe(progressRef.current);
        }

        return () => {
            if (progressRef.current) {
                observer.unobserve(progressRef.current);
            }
        };
    }, []);

    return (
        <div ref={progressRef}>
            <div className="flex justify-between mb-2">
                <span className="font-medium">{label}</span>
                <span className="text-[#20B2AA]">
                    <CountUp
                        end={percentage}
                        suffix="%"
                        duration={2}
                        start={isVisible ? 0 : undefined}
                    />
                </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-[#20B2AA] to-[#3B82F6] rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                        width: isVisible ? `${percentage}%` : '0%',
                        opacity: isVisible ? 1 : 0
                    }}
                />
            </div>
        </div>
    );
} 