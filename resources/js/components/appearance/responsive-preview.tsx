import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useResponsiveSettings } from '@/contexts/responsive-settings-context';

interface ResponsivePreviewProps {
    activeDevice: 'mobile' | 'tablet' | 'desktop';
    activePage?: string;
}

const navigationItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Projects', href: '/projects' },
    { title: 'Contact', href: '/contact' },
];

export default function ResponsivePreview({ activeDevice, activePage = '/' }: ResponsivePreviewProps) {
    const { settings } = useResponsiveSettings();

    const getDeviceFrame = () => {
        switch (activeDevice) {
            case 'mobile':
                return {
                    width: 'w-[160px]',
                    height: 'h-[320px]',
                    padding: 'px-2 py-2',
                    scale: 'scale-100',
                    container: 'max-w-[160px]'
                };
            case 'tablet':
                return {
                    width: 'w-[360px]',
                    height: 'h-[240px]',
                    padding: 'p-3',
                    scale: 'scale-100',
                    container: 'max-w-[360px]'
                };
            case 'desktop':
                return {
                    width: 'w-[520px]',
                    height: 'h-[260px]',
                    padding: 'p-3',
                    scale: 'scale-100',
                    container: 'max-w-[520px]'
                };
        }
    };

    const frame = getDeviceFrame();

    return (
        <div className="w-full border border-gray-200 rounded-lg bg-white">
            <div className="w-full min-h-[350px] flex items-center justify-center p-6">
                <div className="relative">
                    {/* Background Decoration */}
                    <div className="absolute -inset-3 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl blur-xl opacity-70" />
                    
                    {/* Device Frame */}
                    <motion.div
                        key={activeDevice}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "relative flex items-center justify-center",
                            frame.container
                        )}
                    >
                        <div className={cn(
                            "relative bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_0_1px_rgba(0,0,0,0.05),0_2px_8px_-2px_rgba(0,0,0,0.1)] border border-gray-200/80 transition-all duration-300",
                            frame.width,
                            frame.height,
                            frame.scale
                        )}>
                            {activeDevice === 'mobile' ? (
                                // Mobile Layout
                                <div className="h-full flex flex-col">
                                    {/* Status Bar */}
                                    <div className="px-2 py-1.5 border-b border-gray-100/80 flex items-center justify-between bg-gray-50/80">
                                        <div className="w-4 h-4 rounded-md bg-gray-200/80" />
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-200/80" />
                                            <div className="w-2 h-2 rounded-full bg-gray-200/80" />
                                            <div className="w-2 h-2 rounded-full bg-gray-200/80" />
                                        </div>
                                    </div>

                                    {/* Mobile Navigation */}
                                    <div className="px-3 py-2.5 border-b border-gray-100/80 shadow-[0_1px_2px_rgba(0,0,0,0.05)] bg-white/95 backdrop-blur-sm">
                                        <div className="flex flex-wrap gap-2">
                                            {navigationItems.map((item) => (
                                                <div
                                                    key={item.href}
                                                    className={cn(
                                                        "text-[8px] px-2 py-1.5 rounded-md transition-all duration-200 font-medium",
                                                        activePage === item.href
                                                            ? "bg-gray-900 text-white shadow-sm ring-2 ring-gray-900/5"
                                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm"
                                                    )}
                                                >
                                                    {item.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-3 space-y-3">
                                        {/* Header */}
                                        <div className="w-3/4 h-2 bg-gray-100 rounded-sm" />
                                        
                                        {/* Main Image */}
                                        <div className="w-full aspect-video bg-gray-100 rounded-sm" />
                                        
                                        {/* Text Lines */}
                                        <div className="space-y-2">
                                            <div className="h-1.5 bg-gray-100 rounded-sm w-full" />
                                            <div className="h-1.5 bg-gray-100 rounded-sm w-4/5" />
                                            <div className="h-1.5 bg-gray-100 rounded-sm w-2/3" />
                                        </div>

                                        {/* Grid */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="aspect-square bg-gray-100 rounded-sm" />
                                            <div className="aspect-square bg-gray-100 rounded-sm" />
                                        </div>
                                    </div>
                                </div>
                            ) : activeDevice === 'tablet' ? (
                                // Tablet Layout
                                <div className="h-full flex flex-col">
                                    {/* Header */}
                                    <div className="px-3 py-2 border-b border-gray-100/80 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                                        <div className="w-5 h-5 rounded-sm bg-gray-100" />
                                        {/* Tablet Navigation */}
                                        <div className="px-4 py-3 border-b border-gray-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.08)] bg-white/95 backdrop-blur-sm">
                                            <div className="flex items-center justify-between">
                                                <div className="w-5 h-5 rounded-md bg-gray-200/80 shadow-sm" />
                                                <div className="flex items-center gap-4">
                                                    {navigationItems.map((item) => (
                                                        <div
                                                            key={item.href}
                                                            className={cn(
                                                                "text-[10px] px-2.5 py-1.5 rounded-md transition-all duration-200 font-medium",
                                                                activePage === item.href
                                                                    ? "bg-gray-900 text-white shadow-sm ring-2 ring-gray-900/5"
                                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm"
                                                            )}
                                                        >
                                                            {item.title}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-4">
                                        {/* Title */}
                                        <div className="mb-4 w-40 h-2.5 bg-gray-100 rounded-sm" />
                                        
                                        {/* Two Column Grid */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {[1, 2].map((col) => (
                                                <div key={col} className="space-y-3">
                                                    <div className="aspect-[4/3] bg-gray-100 rounded-sm" />
                                                    <div className="space-y-1.5">
                                                        <div className="h-2 bg-gray-100 rounded-sm w-full" />
                                                        <div className="h-2 bg-gray-100 rounded-sm w-3/4" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Desktop Layout
                                <div className="h-full flex flex-col">
                                    {/* Desktop Navigation */}
                                    <div className="px-5 py-3 border-b border-gray-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-sm">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div className="w-6 h-6 rounded-md bg-gray-200/80 shadow-sm" />
                                                <div className="flex items-center gap-5">
                                                    {navigationItems.map((item) => (
                                                        <div
                                                            key={item.href}
                                                            className={cn(
                                                                "relative text-[11px] px-3 py-1.5 rounded-md transition-all duration-200 font-medium",
                                                                activePage === item.href
                                                                    ? "text-gray-900 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-2/3 before:h-0.5 before:bg-gray-900 before:rounded-full"
                                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
                                                            )}
                                                        >
                                                            {item.title}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-6 h-6 rounded-full bg-gray-200/80 shadow-sm ring-2 ring-gray-900/5" />
                                                <div className="w-6 h-6 rounded-md bg-gray-200/80 shadow-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-4">
                                        {/* Three Column Grid */}
                                        <div className="grid grid-cols-3 gap-4">
                                            {[1, 2, 3].map((col) => (
                                                <div key={col} className="space-y-3">
                                                    <div className="aspect-[4/3] bg-gray-100 rounded-sm" />
                                                    <div className="space-y-1.5">
                                                        <div className="h-2 bg-gray-100 rounded-sm w-full" />
                                                        <div className="h-2 bg-gray-100 rounded-sm w-4/5" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 