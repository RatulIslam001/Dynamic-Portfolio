import { motion } from 'framer-motion';
import { Layout } from 'lucide-react';
import { useLayoutSettingsContext } from '@/contexts/layout-settings-context';
import { cn } from '@/lib/utils';

export default function LayoutPreview() {
    const { settings } = useLayoutSettingsContext();

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-[420px]"
        >
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-950/5 p-8 relative overflow-hidden">
                <div className="relative">
                    <div className="flex items-center justify-between mb-8">
                        <motion.h3 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-base font-medium text-gray-900 flex items-center gap-2.5"
                        >
                            <div className="p-1.5 bg-blue-50 rounded-md">
                                <Layout className="w-4 h-4 text-blue-500" />
                            </div>
                            Layout Preview
                        </motion.h3>
                    </div>

                    {/* Layout Preview Content */}
                    <div className="space-y-6">
                        {/* Container Preview */}
                        <div className="relative group">
                            <div className="absolute -left-3 -right-3 -top-3 -bottom-3 bg-gradient-to-br from-gray-50 to-transparent rounded-lg border border-gray-100/80" />
                            <div className="relative p-4 border border-dashed border-gray-200 rounded-lg">
                                <div 
                                    className={cn(
                                        "h-32 bg-gray-50 rounded-md flex items-center justify-center relative",
                                        settings.container.maxWidth === '1024' && 'w-3/4',
                                        settings.container.maxWidth === '1280' && 'w-4/5',
                                        settings.container.maxWidth === '1536' && 'w-11/12',
                                        settings.container.maxWidth === '1920' && 'w-full'
                                    )}
                                >
                                    <div 
                                        className={cn(
                                            "absolute inset-x-0 h-full bg-blue-50/50 border-x border-blue-100",
                                            settings.container.sidePadding === '16' && 'mx-2',
                                            settings.container.sidePadding === '24' && 'mx-3',
                                            settings.container.sidePadding === '32' && 'mx-4',
                                            settings.container.sidePadding === '48' && 'mx-6'
                                        )}
                                    />
                                    <div className="text-sm text-gray-500 z-10">Container Preview</div>
                                </div>
                            </div>
                        </div>

                        {/* Grid Preview */}
                        <div className="relative group">
                            <div className="absolute -left-3 -right-3 -top-3 -bottom-3 bg-gradient-to-br from-gray-50 to-transparent rounded-lg border border-gray-100/80" />
                            <div className="relative p-4 border border-dashed border-gray-200 rounded-lg">
                                <div 
                                    className={cn(
                                        "grid gap-2",
                                        settings.grid.columnCount === '6' && 'grid-cols-6',
                                        settings.grid.columnCount === '12' && 'grid-cols-12',
                                        settings.grid.columnCount === '16' && 'grid-cols-16',
                                        settings.grid.columnGap === '16' && 'gap-2',
                                        settings.grid.columnGap === '24' && 'gap-3',
                                        settings.grid.columnGap === '32' && 'gap-4'
                                    )}
                                >
                                    {Array.from({ length: Number(settings.grid.columnCount) }).map((_, i) => (
                                        <div key={i} className="h-8 bg-gray-50 rounded-md" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Spacing Preview */}
                        <div className="relative group">
                            <div className="absolute -left-3 -right-3 -top-3 -bottom-3 bg-gradient-to-br from-gray-50 to-transparent rounded-lg border border-gray-100/80" />
                            <div className="relative p-4 border border-dashed border-gray-200 rounded-lg">
                                <div 
                                    className={cn(
                                        "space-y-2",
                                        settings.spacing.contentSpacing === '16' && 'space-y-2',
                                        settings.spacing.contentSpacing === '24' && 'space-y-3',
                                        settings.spacing.contentSpacing === '32' && 'space-y-4',
                                        settings.spacing.contentSpacing === '48' && 'space-y-6'
                                    )}
                                >
                                    <div className="h-6 bg-gray-50 rounded-md w-3/4" />
                                    <div className="h-6 bg-gray-50 rounded-md" />
                                    <div className="h-6 bg-gray-50 rounded-md w-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Info */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 pt-6 border-t border-gray-100"
                    >
                        <p className="text-xs text-gray-500">
                            This preview shows how your layout settings will affect your portfolio's structure.
                            {settings.advanced.autoAdjustSpacing && " Auto-adjust spacing is enabled."}
                            {settings.advanced.fluidTypography && " Fluid typography is enabled."}
                            {settings.advanced.nestedGridSupport && " Nested grid support is enabled."}
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
} 