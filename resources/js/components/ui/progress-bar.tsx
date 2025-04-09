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
        <div ref={progressRef} className="opacity-0" style={{ 
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out'
        }}>
            <div className="flex justify-between mb-2">
                <span className="font-medium dark:text-white">{label}</span>
                <span className="text-[#20B2AA]">
                    <CountUp
                        end={percentage}
                        suffix="%"
                        duration={2}
                        start={isVisible ? 0 : undefined}
                        delay={0.5}
                    />
                </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-[#20B2AA] rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                        width: isVisible ? `${percentage}%` : '0%'
                    }}
                />
            </div>
        </div>
    );
} 