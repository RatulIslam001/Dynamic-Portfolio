import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Check, Palette, Moon, Sun, Monitor } from 'lucide-react';

interface ThemeSettingsProps {
    initialColors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
    onColorsChange: (colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    }) => void;
}

export default function ThemeSettings({ initialColors, onColorsChange }: ThemeSettingsProps) {
    const [selectedTheme, setSelectedTheme] = useState('professional-blue');
    const [darkMode, setDarkMode] = useState('auto');
    const [activeView, setActiveView] = useState('presets');
    const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);
    const colorPickerRef = useRef<HTMLDivElement>(null);
    
    const [customColors, setCustomColors] = useState(initialColors);

    const themes = [
        {
            id: 'professional-blue',
            name: 'Professional Blue',
            gradient: 'from-[#4C8EFF] via-[#35A7FF] to-[#22C9BE]',
            description: 'Clean and professional look with a modern touch',
            accent: 'bg-blue-500',
            colors: {
                primary: '#4C8EFF',
                secondary: '#35A7FF',
                accent: '#22C9BE',
                background: '#ffffff',
                text: '#1f2937'
            }
        },
        {
            id: 'creative-purple',
            name: 'Creative Purple',
            gradient: 'from-[#A855F7] via-[#D946EF] to-[#EC4899]',
            description: 'Bold and creative design for artistic portfolios',
            accent: 'bg-purple-500',
            colors: {
                primary: '#A855F7',
                secondary: '#D946EF',
                accent: '#EC4899',
                background: '#ffffff',
                text: '#1f2937'
            }
        },
        {
            id: 'natural-green',
            name: 'Natural Green',
            gradient: 'from-[#10B981] via-[#22C55E] to-[#34D399]',
            description: 'Organic and fresh feel for eco-friendly brands',
            accent: 'bg-emerald-500',
            colors: {
                primary: '#10B981',
                secondary: '#22C55E',
                accent: '#34D399',
                background: '#ffffff',
                text: '#1f2937'
            }
        },
        {
            id: 'bold-red',
            name: 'Bold Red',
            gradient: 'from-[#EF4444] via-[#F56565] to-[#F97316]',
            description: 'Strong and impactful design for powerful statements',
            accent: 'bg-red-500',
            colors: {
                primary: '#EF4444',
                secondary: '#F56565',
                accent: '#F97316',
                background: '#ffffff',
                text: '#1f2937'
            }
        },
        {
            id: 'monochrome',
            name: 'Monochrome',
            gradient: 'from-[#4B5563] via-[#374151] to-[#1F2937]',
            description: 'Timeless black and white professional aesthetic',
            accent: 'bg-gray-700',
            colors: {
                primary: '#4B5563',
                secondary: '#374151',
                accent: '#1F2937',
                background: '#ffffff',
                text: '#1f2937'
            }
        },
        {
            id: 'dark-mode',
            name: 'Dark Mode',
            gradient: 'from-[#111827] via-[#1F2937] to-[#374151]',
            description: 'Sleek dark theme for modern portfolios',
            accent: 'bg-gray-900',
            colors: {
                primary: '#111827',
                secondary: '#1F2937',
                accent: '#374151',
                background: '#030712',
                text: '#ffffff'
            }
        }
    ];

    const colorSections = [
        {
            id: 'primary',
            title: 'Primary Color',
            description: 'Used for buttons, links, and primary actions',
            value: customColors.primary
        },
        {
            id: 'secondary',
            title: 'Secondary Color',
            description: 'Used for accents and secondary elements',
            value: customColors.secondary
        },
        {
            id: 'accent',
            title: 'Accent Color',
            description: 'Used for highlights and special elements',
            value: customColors.accent
        },
        {
            id: 'background',
            title: 'Background Color',
            description: 'Main background color of your portfolio',
            value: customColors.background
        },
        {
            id: 'text',
            title: 'Text Color',
            description: 'Primary text color throughout your portfolio',
            value: customColors.text
        }
    ];

    const handleColorChange = (colorId: string, value: string) => {
        const newColors = {
            ...customColors,
            [colorId]: value
        };
        setCustomColors(newColors);
        onColorsChange(newColors);
    };

    const handleThemeSelect = (themeId: string) => {
        setSelectedTheme(themeId);
        const theme = themes.find(t => t.id === themeId);
        if (theme) {
            setCustomColors(theme.colors);
            onColorsChange(theme.colors);
        }
    };

    return (
        <motion.div
            key="theme"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <div className="inline-flex p-0.5 rounded-lg bg-gray-100/80">
                <button 
                    onClick={() => setActiveView('presets')}
                    className={cn(
                        "relative px-5 py-2 text-sm font-medium rounded-md transition-all duration-200",
                        activeView === 'presets' 
                            ? "bg-white text-gray-900 shadow-sm" 
                            : "text-gray-600 hover:text-gray-900"
                    )}
                >
                    Theme Presets
                </button>
                <button 
                    onClick={() => setActiveView('custom')}
                    className={cn(
                        "relative px-5 py-2 text-sm font-medium rounded-md transition-all duration-200",
                        activeView === 'custom' 
                            ? "bg-white text-gray-900 shadow-sm" 
                            : "text-gray-600 hover:text-gray-900"
                    )}
                >
                    Custom Colors
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeView === 'presets' ? (
                    <motion.div
                        key="presets"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-3 gap-4 mt-6"
                    >
                        {themes.map((theme, index) => (
                            <motion.div
                                key={theme.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "group relative p-3 rounded-lg border cursor-pointer transition-all duration-300",
                                    selectedTheme === theme.id
                                        ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/10"
                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                                )}
                                onClick={() => handleThemeSelect(theme.id)}
                            >
                                <div className={cn(
                                    "h-24 rounded-md bg-gradient-to-r shadow-sm transition-all duration-300",
                                    "group-hover:shadow-md group-hover:scale-[1.02]",
                                    theme.gradient
                                )}>
                                    <div className="h-full w-full flex items-center justify-center">
                                        {selectedTheme === theme.id && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                                            >
                                                <Check className="w-4 h-4 text-white" />
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h3 className="font-medium text-sm text-gray-900">
                                        {theme.name}
                                    </h3>
                                    <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
                                        {theme.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="custom"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8"
                    >
                        <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                            {colorSections.map((section) => (
                                <div key={section.id} className="group">
                                    <div className="mb-2">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {section.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {section.description}
                                        </p>
                                    </div>
                                    <div className="relative">
                                        <div 
                                            className={cn(
                                                "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-[4px]",
                                                section.id === 'background' ? "ring-1 ring-gray-200 bg-[#ffffff]" : "",
                                                "transition-transform duration-200 group-hover:scale-110"
                                            )}
                                            style={{ backgroundColor: section.value }}
                                        />
                                        <input
                                            type="text"
                                            value={section.value.toUpperCase()}
                                            onChange={(e) => handleColorChange(section.id, e.target.value)}
                                            className={cn(
                                                "w-full pl-9 pr-24 py-2.5 text-sm bg-gray-50/50",
                                                "border border-gray-200 rounded-lg",
                                                "focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500",
                                                "placeholder:text-gray-400 transition-all duration-200",
                                                "hover:border-gray-300",
                                                section.id === 'background' ? "bg-white" : ""
                                            )}
                                            placeholder="#000000"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <div 
                                                className={cn(
                                                    "w-6 h-6 rounded-md shadow-sm",
                                                    section.id === 'background' ? "ring-1 ring-gray-200 bg-[#ffffff]" : "",
                                                    "transition-transform duration-200 group-hover:scale-110"
                                                )}
                                                style={{ backgroundColor: section.value }}
                                            />
                                            <label 
                                                className="relative group cursor-pointer"
                                                title={`Pick ${section.title}`}
                                                onClick={() => setActiveColorPicker(section.id)}
                                            >
                                                <input
                                                    type="color"
                                                    value={section.value}
                                                    onChange={(e) => handleColorChange(section.id, e.target.value)}
                                                    className={cn(
                                                        "absolute opacity-0 w-0 h-0",
                                                        activeColorPicker === section.id ? "pointer-events-auto" : "pointer-events-none"
                                                    )}
                                                    ref={colorPickerRef as any}
                                                />
                                                <div className={cn(
                                                    "w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center",
                                                    "transition-all duration-200",
                                                    "hover:bg-gray-200 group-hover:scale-110"
                                                )}>
                                                    <Palette className="w-3.5 h-3.5 text-gray-500" />
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-base font-medium text-gray-900 flex items-center gap-2">
                            <Moon className="w-4 h-4" />
                            Dark Mode
                        </h3>
                        <p className="text-[13px] text-gray-500 mt-1">
                            Enable dark mode toggle for your portfolio
                        </p>
                    </div>
                    <Switch
                        checked={darkMode !== 'disabled'}
                        onCheckedChange={(checked: boolean) => 
                            setDarkMode(checked ? 'auto' : 'disabled')
                        }
                    />
                </div>

                <AnimatePresence>
                    {darkMode !== 'disabled' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <RadioGroup
                                value={darkMode}
                                onValueChange={setDarkMode}
                                className="space-y-3 mt-6"
                            >
                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <RadioGroupItem value="light" id="light" />
                                    <Label htmlFor="light" className="ml-2 text-[13px] text-gray-600 flex items-center gap-2">
                                        <Sun className="w-4 h-4" />
                                        Light Mode Default
                                    </Label>
                                </div>
                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <RadioGroupItem value="dark" id="dark" />
                                    <Label htmlFor="dark" className="ml-2 text-[13px] text-gray-600 flex items-center gap-2">
                                        <Moon className="w-4 h-4" />
                                        Dark Mode Default
                                    </Label>
                                </div>
                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <RadioGroupItem value="auto" id="auto" />
                                    <Label htmlFor="auto" className="ml-2 text-[13px] text-gray-600 flex items-center gap-2">
                                        <Monitor className="w-4 h-4" />
                                        Auto (System Preference)
                                    </Label>
                                </div>
                            </RadioGroup>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
} 