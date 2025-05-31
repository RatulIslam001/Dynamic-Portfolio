import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { 
    Smartphone, 
    Tablet, 
    Monitor,
    Menu,
    LayoutGrid,
    Eye,
    Type,
    ChevronDown
} from 'lucide-react';
import { useResponsiveSettings } from '@/contexts/responsive-settings-context';
import ResponsivePreview from './responsive-preview';

interface DeviceTab {
    id: 'mobile' | 'tablet' | 'desktop';
    label: string;
    icon: any;
}

export default function ResponsiveSettings() {
    const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
    const [activePage, setActivePage] = useState('/');
    const { 
        settings,
        updateBreakpoints,
        updateNavigationStyle,
        updateLayoutStyle,
        updateElementVisibility,
        updateFontSizeAdjustment
    } = useResponsiveSettings();

    const deviceTabs: DeviceTab[] = [
        { id: 'mobile', label: 'Mobile', icon: Smartphone },
        { id: 'tablet', label: 'Tablet', icon: Tablet },
        { id: 'desktop', label: 'Desktop', icon: Monitor }
    ];

    const pages = [
        { title: 'Home', href: '/' },
        { title: 'About', href: '/about' },
        { title: 'Projects', href: '/projects' },
        { title: 'Contact', href: '/contact' }
    ];

    return (
        <motion.div
            key="responsive"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            {/* Device Tabs */}
            <div className="flex items-center justify-between w-full p-1 bg-gray-50 rounded-lg">
                {deviceTabs.map((device) => {
                    const Icon = device.icon;
                    return (
                        <button
                            key={device.id}
                            onClick={() => setActiveDevice(device.id)}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-all",
                                activeDevice === device.id 
                                    ? "text-gray-900" 
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {device.label}
                        </button>
                    );
                })}
            </div>

            {/* Page Selection */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">Active Page</h4>
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setActivePage('/')}
                        className="text-gray-500 hover:text-gray-900"
                    >
                        Reset
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {pages.map((page) => (
                        <button
                            key={page.href}
                            onClick={() => setActivePage(page.href)}
                            className={cn(
                                "px-3 py-1.5 text-sm rounded-md transition-colors",
                                activePage === page.href
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            )}
                        >
                            {page.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Settings */}
            <div className="space-y-6">
                {/* Navigation and Layout Section */}
                <div className="space-y-6">
                    {/* Navigation Style */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">Navigation Style</h3>
                        <div className="relative mt-2">
                            <select 
                                value={settings.navigationStyle}
                                onChange={(e) => updateNavigationStyle(e.target.value as any)}
                                className={cn(
                                    "w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg appearance-none",
                                    "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                    "hover:border-gray-300 transition-colors cursor-pointer"
                                )}
                            >
                                <option value="hamburger">Hamburger Menu</option>
                                <option value="bottom">Bottom Navigation</option>
                                <option value="minimal">Minimal Menu</option>
                            </select>
                            <Menu className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <p className="mt-1.5 text-xs text-gray-500">How navigation appears on mobile devices</p>
                    </div>

                    {/* Layout Style */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">Layout Style</h3>
                        <div className="relative mt-2">
                            <select 
                                value={settings.layoutStyle}
                                onChange={(e) => updateLayoutStyle(e.target.value as any)}
                                className={cn(
                                    "w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg appearance-none",
                                    "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                    "hover:border-gray-300 transition-colors cursor-pointer"
                                )}
                            >
                                <option value="stacked">Stacked (Single Column)</option>
                                <option value="grid">Grid Layout</option>
                                <option value="masonry">Masonry Grid</option>
                            </select>
                            <LayoutGrid className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Element Visibility and Font Size Section */}
                <div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Element Visibility</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Show Hero Image</span>
                                <Switch 
                                    checked={settings.elementVisibility.showHeroImage}
                                    onCheckedChange={(checked) => updateElementVisibility({ showHeroImage: checked })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Show Sidebar</span>
                                <Switch 
                                    checked={settings.elementVisibility.showSidebar}
                                    onCheckedChange={(checked) => updateElementVisibility({ showSidebar: checked })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Enable Animations</span>
                                <Switch 
                                    checked={settings.elementVisibility.enableAnimations}
                                    onCheckedChange={(checked) => updateElementVisibility({ enableAnimations: checked })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900">Font Size Adjustment</h3>
                        <div className="relative mt-2">
                            <select 
                                value={settings.fontSizeAdjustment}
                                onChange={(e) => updateFontSizeAdjustment(e.target.value as any)}
                                className={cn(
                                    "w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg appearance-none",
                                    "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                    "hover:border-gray-300 transition-colors cursor-pointer"
                                )}
                            >
                                <option value="no-change">No Change</option>
                                <option value="scale-down">Scale Down (-10%)</option>
                                <option value="scale-up">Scale Up (+10%)</option>
                            </select>
                            <Type className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview */}
            <div className="mt-6">
                <ResponsivePreview 
                    activeDevice={activeDevice}
                    activePage={activePage}
                />
            </div>

            {/* Breakpoints Section */}
            <div className="pt-6 border-t border-gray-200">
                <h2 className="text-base font-medium text-gray-900 mb-6">Breakpoints</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Mobile Breakpoint</label>
                        <div className="relative">
                            <select 
                                value={settings.breakpoints.mobile}
                                onChange={(e) => updateBreakpoints({ mobile: e.target.value })}
                                className={cn(
                                    "w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg appearance-none",
                                    "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                    "hover:border-gray-300 transition-colors cursor-pointer"
                                )}
                            >
                                <option value="640px">640px</option>
                                <option value="576px">576px</option>
                                <option value="480px">480px</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <p className="text-xs text-gray-500">Maximum width for mobile devices</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Tablet Breakpoint</label>
                        <div className="relative">
                            <select 
                                value={settings.breakpoints.tablet}
                                onChange={(e) => updateBreakpoints({ tablet: e.target.value })}
                                className={cn(
                                    "w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg appearance-none",
                                    "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                    "hover:border-gray-300 transition-colors cursor-pointer"
                                )}
                            >
                                <option value="1024px">1024px</option>
                                <option value="960px">960px</option>
                                <option value="768px">768px</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <p className="text-xs text-gray-500">Maximum width for tablet devices</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Desktop Breakpoint</label>
                        <div className="relative">
                            <select 
                                value={settings.breakpoints.desktop}
                                onChange={(e) => updateBreakpoints({ desktop: e.target.value })}
                                className={cn(
                                    "w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg appearance-none",
                                    "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                    "hover:border-gray-300 transition-colors cursor-pointer"
                                )}
                            >
                                <option value="1280px">1280px</option>
                                <option value="1440px">1440px</option>
                                <option value="1536px">1536px</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <p className="text-xs text-gray-500">Minimum width for desktop devices</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
} 