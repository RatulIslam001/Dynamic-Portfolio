import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Type, Scale, AlignCenter, Text, ChevronDown } from 'lucide-react';

interface TypographySettingsProps {
    onSettingsChange: (settings: {
        headingFont: string;
        bodyFont: string;
        baseFontSize: number;
        headingScale: string;
        lineHeight: string;
        headingWeight: string;
        headingCase: string;
        bodyWeight: string;
        paragraphSpacing: string;
        linkStyle: string;
        linkHoverEffect: string;
    }) => void;
    initialSettings: {
        headingFont: string;
        bodyFont: string;
        baseFontSize: number;
        headingScale: string;
        lineHeight: string;
        headingWeight: string;
        headingCase: string;
        bodyWeight: string;
        paragraphSpacing: string;
        linkStyle: string;
        linkHoverEffect: string;
    };
}

const fontOptions = [
    { value: 'Inter', label: 'Inter', category: 'Sans Serif' },
    { value: 'Roboto', label: 'Roboto', category: 'Sans Serif' },
    { value: 'Open Sans', label: 'Open Sans', category: 'Sans Serif' },
    { value: 'Poppins', label: 'Poppins', category: 'Sans Serif' },
    { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
    { value: 'Montserrat', label: 'Montserrat', category: 'Sans Serif' },
    { value: 'Merriweather', label: 'Merriweather', category: 'Serif' },
    { value: 'Lora', label: 'Lora', category: 'Serif' }
];

export default function TypographySettings({ onSettingsChange, initialSettings }: TypographySettingsProps) {
    const [settings, setSettings] = useState(initialSettings);
    const [activeTab, setActiveTab] = useState('headings');

    const handleSettingChange = (key: string, value: string | number) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        onSettingsChange(newSettings);
    };

    return (
        <motion.div
            key="typography"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            {/* Font Selection Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                        <Type className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-base font-medium text-gray-900">Font Selection</h3>
                        <p className="text-sm text-gray-500">Choose fonts for your headings and body text</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            Heading Font
                            <span className="px-1.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded">Primary</span>
                        </label>
                        <div className="relative">
                            <select 
                                className={cn(
                                    "w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none",
                                    "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                    "hover:border-gray-300 transition-colors cursor-pointer"
                                )}
                                value={settings.headingFont}
                                onChange={(e) => handleSettingChange('headingFont', e.target.value)}
                                style={{ fontFamily: settings.headingFont }}
                            >
                                {fontOptions.map(font => (
                                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                                        {font.label} - {font.category}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            Body Font
                            <span className="px-1.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-600 rounded">Secondary</span>
                        </label>
                        <div className="relative">
                            <select 
                                className={cn(
                                    "w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none",
                                    "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                    "hover:border-gray-300 transition-colors cursor-pointer"
                                )}
                                value={settings.bodyFont}
                                onChange={(e) => handleSettingChange('bodyFont', e.target.value)}
                                style={{ fontFamily: settings.bodyFont }}
                            >
                                {fontOptions.map(font => (
                                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                                        {font.label} - {font.category}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Font Sizes Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50">
                        <Scale className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-base font-medium text-gray-900">Font Sizes</h3>
                        <p className="text-sm text-gray-500">Adjust the size and scale of your typography</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Base Font Size
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-emerald-600">{settings.baseFontSize}px</span>
                                <span className="text-xs text-gray-500">Recommended: 16px</span>
                            </div>
                        </div>
                        <div className="relative pt-3">
                            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-1">
                                <span className="text-[10px] font-medium text-gray-400">12px</span>
                                <span className="text-[10px] font-medium text-gray-400">20px</span>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full h-0.5 bg-gray-100 rounded"></div>
                                </div>
                                <input
                                    type="range"
                                    min="12"
                                    max="20"
                                    value={settings.baseFontSize}
                                    onChange={(e) => handleSettingChange('baseFontSize', parseInt(e.target.value))}
                                    className={cn(
                                        "w-full h-2 rounded-full appearance-none cursor-pointer",
                                        "bg-emerald-500",
                                        "focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
                                        "range-lg"
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Heading Scale
                            </label>
                            <div className="relative">
                                <select 
                                    className={cn(
                                        "w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none",
                                        "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                        "hover:border-gray-300 transition-colors cursor-pointer"
                                    )}
                                    value={settings.headingScale}
                                    onChange={(e) => handleSettingChange('headingScale', e.target.value)}
                                >
                                    <option value="standard">Standard (1.2)</option>
                                    <option value="compact">Compact (1.1)</option>
                                    <option value="relaxed">Relaxed (1.3)</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <p className="text-xs text-gray-500">Controls the size ratio between heading levels</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Line Height
                            </label>
                            <div className="relative">
                                <select 
                                    className={cn(
                                        "w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none",
                                        "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                        "hover:border-gray-300 transition-colors cursor-pointer"
                                    )}
                                    value={settings.lineHeight}
                                    onChange={(e) => handleSettingChange('lineHeight', e.target.value)}
                                >
                                    <option value="normal">Normal (1.5)</option>
                                    <option value="compact">Compact (1.3)</option>
                                    <option value="relaxed">Relaxed (1.7)</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <p className="text-xs text-gray-500">Controls the spacing between lines of text</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Text Styling Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50">
                        <Text className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                        <h3 className="text-base font-medium text-gray-900">Text Styling</h3>
                        <p className="text-sm text-gray-500">Customize the appearance of different text elements</p>
                    </div>
                </div>

                <div className="p-1 inline-flex rounded-lg bg-gray-100/80">
                    {['headings', 'body', 'links'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "relative px-5 py-2 text-sm font-medium rounded-md transition-all duration-200",
                                activeTab === tab 
                                    ? "bg-white text-gray-900 shadow-sm" 
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white rounded-md shadow-sm -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {activeTab === 'headings' && (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Heading Weight
                            </label>
                            <div className="relative">
                                <select 
                                    className={cn(
                                        "w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none",
                                        "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                        "hover:border-gray-300 transition-colors cursor-pointer"
                                    )}
                                    value={settings.headingWeight}
                                    onChange={(e) => handleSettingChange('headingWeight', e.target.value)}
                                >
                                    <option value="600">Semibold (600)</option>
                                    <option value="700">Bold (700)</option>
                                    <option value="500">Medium (500)</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Heading Case
                            </label>
                            <div className="relative">
                                <select 
                                    className={cn(
                                        "w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none",
                                        "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                        "hover:border-gray-300 transition-colors cursor-pointer"
                                    )}
                                    value={settings.headingCase}
                                    onChange={(e) => handleSettingChange('headingCase', e.target.value)}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="uppercase">Uppercase</option>
                                    <option value="capitalize">Capitalize</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'body' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Body Text Weight
                                </label>
                                <div className="relative">
                                    <select 
                                        className={cn(
                                            "w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none",
                                            "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                            "hover:border-gray-300 transition-colors cursor-pointer"
                                        )}
                                        value={settings.bodyWeight || '400'}
                                        onChange={(e) => handleSettingChange('bodyWeight', e.target.value)}
                                    >
                                        <option value="400">Regular (400)</option>
                                        <option value="500">Medium (500)</option>
                                        <option value="300">Light (300)</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Paragraph Spacing
                                </label>
                                <div className="relative">
                                    <select 
                                        className={cn(
                                            "w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none",
                                            "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                            "hover:border-gray-300 transition-colors cursor-pointer"
                                        )}
                                        value={settings.paragraphSpacing || 'normal'}
                                        onChange={(e) => handleSettingChange('paragraphSpacing', e.target.value)}
                                    >
                                        <option value="normal">Normal (1.5)</option>
                                        <option value="relaxed">Relaxed (2)</option>
                                        <option value="compact">Compact (1.2)</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'links' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Link Style
                                </label>
                                <div className="relative">
                                    <select 
                                        className={cn(
                                            "w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none",
                                            "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                            "hover:border-gray-300 transition-colors cursor-pointer"
                                        )}
                                        value={settings.linkStyle || 'underline'}
                                        onChange={(e) => handleSettingChange('linkStyle', e.target.value)}
                                    >
                                        <option value="underline">Underline</option>
                                        <option value="none">No Underline</option>
                                        <option value="dotted">Dotted</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Link Hover Effect
                                </label>
                                <div className="relative">
                                    <select 
                                        className={cn(
                                            "w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none",
                                            "text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                            "hover:border-gray-300 transition-colors cursor-pointer"
                                        )}
                                        value={settings.linkHoverEffect || 'darken'}
                                        onChange={(e) => handleSettingChange('linkHoverEffect', e.target.value)}
                                    >
                                        <option value="darken">Darken</option>
                                        <option value="lighten">Lighten</option>
                                        <option value="underline">Underline</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </motion.div>
    );
} 