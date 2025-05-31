import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThemePreviewProps {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
}

export default function ThemePreview({ colors }: ThemePreviewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-[420px]"
        >
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-950/5 p-6">
                <h3 className="text-base font-medium text-gray-900 mb-6">Live Preview</h3>

                {/* Preview Content */}
                <div 
                    className="p-6 rounded-lg border border-gray-200"
                    style={{ backgroundColor: colors.background }}
                >
                    {/* Text Preview */}
                    <div className="space-y-4 mb-6">
                        <div 
                            className="h-3 w-3/4 rounded"
                            style={{ backgroundColor: colors.text }}
                        />
                        <div 
                            className="h-2 w-full rounded"
                            style={{ backgroundColor: `${colors.text}40` }}
                        />
                        <div 
                            className="h-2 w-5/6 rounded"
                            style={{ backgroundColor: `${colors.text}40` }}
                        />
                    </div>

                    {/* Button Preview */}
                    <div className="space-y-3">
                        <button
                            className="w-full px-4 py-2 rounded-lg text-white text-sm font-medium transition-transform hover:scale-[1.02]"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Primary Button
                        </button>
                        <button
                            className="w-full px-4 py-2 rounded-lg text-white text-sm font-medium transition-transform hover:scale-[1.02]"
                            style={{ backgroundColor: colors.secondary }}
                        >
                            Secondary
                        </button>
                        <div
                            className="w-full h-16 rounded-lg transition-transform hover:scale-[1.02]"
                            style={{ backgroundColor: colors.accent }}
                        />
                    </div>
                </div>

                {/* Color Palette */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Color Palette</h4>
                    <div className="grid grid-cols-5 gap-2">
                        {Object.entries(colors).map(([key, color]) => (
                            <div key={key} className="space-y-1.5">
                                <div 
                                    className="h-8 rounded-md ring-1 ring-gray-200"
                                    style={{ backgroundColor: color }}
                                />
                                <p className="text-[10px] text-gray-500 text-center capitalize">
                                    {key}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
} 