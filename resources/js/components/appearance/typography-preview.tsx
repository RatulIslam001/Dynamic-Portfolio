import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypographyPreviewProps {
    settings: {
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

export default function TypographyPreview({ settings }: TypographyPreviewProps) {
    const getHeadingSize = (level: number) => {
        const scale = {
            standard: 1.2,
            compact: 1.1,
            relaxed: 1.3
        }[settings.headingScale] || 1.2;

        return `${settings.baseFontSize * Math.pow(scale, 4 - level)}px`;
    };

    const getLineHeight = () => {
        return {
            normal: '1.5',
            compact: '1.3',
            relaxed: '1.7'
        }[settings.lineHeight] || '1.5';
    };

    const getTextTransform = () => {
        const transforms: Record<string, "none" | "uppercase" | "capitalize"> = {
            normal: "none",
            uppercase: "uppercase",
            capitalize: "capitalize"
        };
        return transforms[settings.headingCase] || "none";
    };

    const getParagraphSpacing = () => {
        return {
            normal: '1.5',
            relaxed: '2',
            compact: '1.2'
        }[settings.paragraphSpacing] || '1.5';
    };

    const getLinkStyle = () => {
        return {
            underline: 'underline',
            none: 'none',
            dotted: 'underline dotted'
        }[settings.linkStyle] || 'underline';
    };

    const getLinkHoverEffect = () => {
        const effects: Record<string, string> = {
            darken: 'hover:text-blue-600',
            lighten: 'hover:text-blue-400',
            underline: 'hover:underline'
        };
        return effects[settings.linkHoverEffect as keyof typeof effects] || effects.darken;
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-[420px] sticky top-8"
        >
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-950/5 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-base font-medium text-gray-900">Typography Preview</h3>
                    <div className="px-2 py-1 bg-blue-50 rounded-md">
                        <span className="text-xs font-medium text-blue-600">Live Preview</span>
                    </div>
                </div>

                {/* Preview Content */}
                <div className="p-6 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">
                    <div className="space-y-8">
                        {/* Headings */}
                        <div className="space-y-6">
                            {[1, 2, 3].map((level) => (
                                <div key={level} className="relative group">
                                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500/10 rounded group-hover:bg-blue-500/20 transition-colors" />
                                    <div className="relative">
                                        <h1
                                            style={{
                                                fontFamily: settings.headingFont,
                                                fontSize: getHeadingSize(level),
                                                fontWeight: settings.headingWeight,
                                                textTransform: getTextTransform(),
                                                lineHeight: getLineHeight(),
                                            }}
                                            className={cn(
                                                "text-gray-900 transition-colors",
                                                "selection:bg-blue-500/10"
                                            )}
                                        >
                                            Heading {level}
                                        </h1>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                                                    {getHeadingSize(level)}
                                                </span>
                                                <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                                                    {settings.headingWeight}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Body Text */}
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute -left-2 top-0 w-1 h-full bg-emerald-500/10 rounded group-hover:bg-emerald-500/20 transition-colors" />
                                <div className="relative">
                                    <p
                                        style={{
                                            fontFamily: settings.bodyFont,
                                            fontSize: `${settings.baseFontSize}px`,
                                            lineHeight: getParagraphSpacing(),
                                            fontWeight: settings.bodyWeight
                                        }}
                                        className="text-gray-700"
                                    >
                                        This is how your body text will appear on your portfolio. Good typography improves readability and user experience.
                                    </p>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -left-2 top-0 w-1 h-full bg-blue-500/10 rounded group-hover:bg-blue-500/20 transition-colors" />
                                <p 
                                    style={{
                                        fontFamily: settings.bodyFont,
                                        fontSize: `${settings.baseFontSize}px`,
                                        lineHeight: getParagraphSpacing(),
                                        fontWeight: settings.bodyWeight
                                    }}
                                    className="text-gray-700"
                                >
                                    Links will appear{' '}
                                    <a 
                                        href="#" 
                                        className={cn(
                                            "text-blue-500",
                                            getLinkHoverEffect(),
                                            {
                                                'underline': settings.linkStyle === 'underline',
                                                'no-underline': settings.linkStyle === 'none',
                                                'underline-dotted': settings.linkStyle === 'dotted'
                                            },
                                            "transition-colors",
                                            "selection:bg-blue-500/10"
                                        )}
                                    >
                                        like this
                                    </a>{' '}
                                    and help users navigate your content.
                                </p>
                            </div>

                            <div className="relative group">
                                <div className="absolute -left-2 top-0 w-1 h-full bg-gray-200 rounded group-hover:bg-gray-300 transition-colors" />
                                <div className="relative">
                                    <p
                                        style={{
                                            fontFamily: settings.bodyFont,
                                            fontSize: `${settings.baseFontSize * 0.875}px`,
                                            lineHeight: getLineHeight(),
                                        }}
                                        className={cn(
                                            "text-gray-500",
                                            "selection:bg-gray-500/10"
                                        )}
                                    >
                                        This is smaller text often used for captions or secondary information.
                                    </p>
                                    <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                                            {Math.round(settings.baseFontSize * 0.875)}px
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Info */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-blue-500/20" />
                            <span className="text-xs text-gray-600">Headings</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                            <span className="text-xs text-gray-600">Body</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                            <span className="text-xs text-gray-600">Secondary</span>
                        </div>
                        <div className="ml-auto text-xs text-gray-400">
                            Hover elements to see details
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
} 