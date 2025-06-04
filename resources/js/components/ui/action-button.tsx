import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';

interface ActionButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'minimal';
    className?: string;
    onClick?: () => void;
    href?: string;
    icon?: boolean;
}

export function ActionButton({ 
    children, 
    variant = 'primary', 
    className,
    onClick,
    href,
    icon = true
}: ActionButtonProps) {
    const buttonContent = (
        <motion.div
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
        >
            <Button
                onClick={onClick}
                className={cn(
                    "relative overflow-hidden group",
                    variant === 'primary' 
                        ? "bg-[#20B2AA] hover:bg-[#1a9994] text-white px-8 py-3 text-base shadow-lg shadow-[#20B2AA]/20 hover:shadow-xl hover:shadow-[#20B2AA]/30" 
                        : variant === 'minimal'
                        ? "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-7 py-2.5 text-[15px] font-medium rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300"
                        : "border-2 border-gray-200 hover:border-[#20B2AA] hover:text-[#20B2AA] px-8 py-3 text-base hover:shadow-lg hover:shadow-[#20B2AA]/10 dark:border-gray-700 dark:hover:border-[#20B2AA]",
                    className
                )}
            >
                <span className="relative z-10 inline-flex items-center gap-2 transition-all duration-300">
                    {children}
                    {icon && variant !== 'minimal' && (
                        <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: [0, 5, 0] }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.div>
                    )}
                </span>
            </Button>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} className="inline-block">
                {buttonContent}
            </a>
        );
    }

    return buttonContent;
} 