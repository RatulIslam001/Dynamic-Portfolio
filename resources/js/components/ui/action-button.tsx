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
    fullWidth?: boolean;
}

export function ActionButton({ 
    children, 
    variant = 'primary', 
    className,
    onClick,
    href,
    icon = true,
    fullWidth = false
}: ActionButtonProps) {
    const getButtonStyles = () => {
        if (variant === 'primary') {
            return "bg-[#20B2AA] hover:bg-[#1a9994] text-white px-8 py-3 text-base shadow-md hover:shadow-lg shadow-[#20B2AA]/10 hover:shadow-[#20B2AA]/20 font-medium";
        } else if (variant === 'minimal') {
            return "bg-white dark:bg-gray-800 text-[#20B2AA] dark:text-[#20B2AA] hover:text-[#1a9994] dark:hover:text-[#1a9994] px-7 py-2.5 text-[15px] font-medium rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-700 hover:border-[#20B2AA]/30 dark:hover:border-[#20B2AA]/30";
        } else { // outline
            return "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-[#20B2AA] hover:text-[#20B2AA] px-8 py-3 text-base font-medium shadow-sm hover:shadow-md rounded-md";
        }
    };

    const buttonContent = (
        <motion.div
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={cn("relative", fullWidth && "w-full")}
        >
            <Button
                onClick={onClick}
                className={cn(
                    "relative overflow-hidden group transition-all duration-300",
                    getButtonStyles(),
                    fullWidth && "w-full justify-center",
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
                
                {/* Add subtle hover effect overlay */}
                <span className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </Button>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} className={cn("inline-block", fullWidth && "w-full")}>
                {buttonContent}
            </a>
        );
    }

    return buttonContent;
} 