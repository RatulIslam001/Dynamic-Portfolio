import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
    Palette, 
    Type, 
    Layout as LayoutIcon, 
    Smartphone,
    Eye,
    Sparkles
} from 'lucide-react';

// Import components
import ThemeSettings from '@/components/appearance/theme-settings';
import ThemePreview from '@/components/appearance/theme-preview';
import TypographySettings from '@/components/appearance/typography-settings';
import TypographyPreview from '@/components/appearance/typography-preview';
import LayoutSettings from '@/components/appearance/layout-settings';
import LayoutPreview from '@/components/appearance/layout-preview';
import ResponsiveSettings from '@/components/appearance/responsive-settings';
import { LayoutSettingsProvider } from '@/contexts/layout-settings-context';
import { ResponsiveSettingsProvider } from '@/contexts/responsive-settings-context';

export default function Appearance() {
    const [activeTab, setActiveTab] = useState('theme');
    const [themeColors, setThemeColors] = useState({
        primary: '#3b82f6',
        secondary: '#10b981',
        accent: '#f97316',
        background: '#ffffff',
        text: '#1f2937'
    });

    const [typographySettings, setTypographySettings] = useState({
        headingFont: 'Inter',
        bodyFont: 'Inter',
        baseFontSize: 16,
        headingScale: 'standard',
        lineHeight: 'normal',
        headingWeight: '600',
        headingCase: 'normal',
        bodyWeight: '400',
        paragraphSpacing: 'normal',
        linkStyle: 'underline',
        linkHoverEffect: 'darken'
    });

    const tabs = [
        { id: 'theme', label: 'Theme & Colors', icon: Palette },
        { id: 'typography', label: 'Typography', icon: Type },
        { id: 'layout', label: 'Layout', icon: LayoutIcon },
        { id: 'responsive', label: 'Responsive', icon: Smartphone }
    ];

    return (
        <AdminLayout>
            <Head title="Appearance" />
            
            <div className="min-h-screen bg-gray-50/50">
                <div className="max-w-[1600px] mx-auto p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Appearance</h1>
                            <p className="text-[15px] text-gray-500">Customize how your portfolio looks and feels</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button 
                                variant="outline"
                                size="sm"
                                className="text-[13px] font-medium px-4 flex items-center gap-2"
                            >
                                <Eye className="w-4 h-4" />
                                Preview Changes
                            </Button>
                            <Button 
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-[13px] font-medium px-4 flex items-center gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                Apply Changes
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        {/* Left Column - Settings */}
                        <div className="flex-1">
                            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-950/5 overflow-hidden">
                                {/* Navigation Tabs */}
                                <div className="flex border-b border-gray-100">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={cn(
                                                    "flex-1 px-6 py-4 text-sm font-medium flex items-center justify-center gap-2 relative transition-all duration-200",
                                                    activeTab === tab.id
                                                        ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                                                        : "text-gray-500 hover:text-gray-900"
                                                )}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="p-6">
                                    {activeTab === 'theme' && (
                                        <ThemeSettings 
                                            onColorsChange={setThemeColors}
                                            initialColors={themeColors}
                                        />
                                    )}
                                    {activeTab === 'typography' && (
                                        <TypographySettings 
                                            onSettingsChange={setTypographySettings}
                                            initialSettings={typographySettings}
                                        />
                                    )}
                                    {activeTab === 'layout' && (
                                        <LayoutSettingsProvider>
                                            <LayoutSettings />
                                        </LayoutSettingsProvider>
                                    )}
                                    {activeTab === 'responsive' && (
                                        <ResponsiveSettingsProvider>
                                            <ResponsiveSettings />
                                        </ResponsiveSettingsProvider>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Preview */}
                        {activeTab === 'theme' && <ThemePreview colors={themeColors} />}
                        {activeTab === 'typography' && <TypographyPreview settings={typographySettings} />}
                        {activeTab === 'layout' && (
                            <LayoutSettingsProvider>
                                <LayoutPreview />
                            </LayoutSettingsProvider>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 