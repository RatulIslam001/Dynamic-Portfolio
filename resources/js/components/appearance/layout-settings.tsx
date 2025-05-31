import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Layout, Check } from 'lucide-react';
import { useLayoutSettingsContext } from '@/contexts/layout-settings-context';

export default function LayoutSettings() {
    const {
        settings,
        updateContainerSettings,
        updateGridSettings,
        updateSpacingSettings,
        updateAdvancedSettings,
        resetSettings,
    } = useLayoutSettingsContext();

    return (
        <motion.div
            key="layout"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-base font-medium text-gray-900">Layout Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">Configure your portfolio's layout and structure</p>
                </div>
            </div>

            {/* Container Settings */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">Container Settings</h4>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={resetSettings}
                    >
                        <Layout className="w-4 h-4" />
                        Reset Layout
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Max Width
                        </label>
                        <select 
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                            value={settings.container.maxWidth}
                            onChange={(e) => updateContainerSettings({ maxWidth: e.target.value as any })}
                        >
                            <option value="1024">Small (1024px)</option>
                            <option value="1280">Medium (1280px)</option>
                            <option value="1536">Large (1536px)</option>
                            <option value="1920">Extra Large (1920px)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Side Padding
                        </label>
                        <select 
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                            value={settings.container.sidePadding}
                            onChange={(e) => updateContainerSettings({ sidePadding: e.target.value as any })}
                        >
                            <option value="16">Small (16px)</option>
                            <option value="24">Medium (24px)</option>
                            <option value="32">Large (32px)</option>
                            <option value="48">Extra Large (48px)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid System */}
            <div className="space-y-6">
                <h4 className="text-sm font-medium text-gray-900">Grid System</h4>
                
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Column Count
                        </label>
                        <select 
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                            value={settings.grid.columnCount}
                            onChange={(e) => updateGridSettings({ columnCount: e.target.value as any })}
                        >
                            <option value="6">6 Columns</option>
                            <option value="12">12 Columns</option>
                            <option value="16">16 Columns</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Column Gap
                        </label>
                        <select 
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                            value={settings.grid.columnGap}
                            onChange={(e) => updateGridSettings({ columnGap: e.target.value as any })}
                        >
                            <option value="16">Small (16px)</option>
                            <option value="24">Medium (24px)</option>
                            <option value="32">Large (32px)</option>
                        </select>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-sm font-medium text-gray-900">Default Column Spans</h5>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-500 hover:text-gray-900"
                            onClick={() => updateGridSettings({
                                columnSpans: {
                                    desktop: '4',
                                    tablet: '6',
                                    mobile: '12'
                                }
                            })}
                        >
                            Reset
                        </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {['desktop', 'tablet', 'mobile'].map((device) => (
                            <div key={device} className="space-y-2">
                                <label className="text-sm text-gray-600">{device.charAt(0).toUpperCase() + device.slice(1)}</label>
                                <select 
                                    className="w-full px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md"
                                    value={settings.grid.columnSpans[device as keyof typeof settings.grid.columnSpans]}
                                    onChange={(e) => updateGridSettings({
                                        columnSpans: {
                                            ...settings.grid.columnSpans,
                                            [device]: e.target.value as any
                                        }
                                    })}
                                >
                                    {[1,2,3,4,6,12].map((span) => (
                                        <option key={span} value={span}>{span} Columns</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Spacing */}
            <div className="space-y-6">
                <h4 className="text-sm font-medium text-gray-900">Section Spacing</h4>
                
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Section Gap
                        </label>
                        <select 
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                            value={settings.spacing.sectionGap}
                            onChange={(e) => updateSpacingSettings({ sectionGap: e.target.value as any })}
                        >
                            <option value="32">Small (32px)</option>
                            <option value="64">Medium (64px)</option>
                            <option value="96">Large (96px)</option>
                            <option value="128">Extra Large (128px)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Content Spacing
                        </label>
                        <select 
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                            value={settings.spacing.contentSpacing}
                            onChange={(e) => updateSpacingSettings({ contentSpacing: e.target.value as any })}
                        >
                            <option value="16">Small (16px)</option>
                            <option value="24">Medium (24px)</option>
                            <option value="32">Large (32px)</option>
                            <option value="48">Extra Large (48px)</option>
                        </select>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-sm font-medium text-gray-900">Section Padding</h5>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600">Top/Bottom</label>
                            <select 
                                className="w-full px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md"
                                value={settings.spacing.sectionPadding.vertical}
                                onChange={(e) => updateSpacingSettings({
                                    sectionPadding: {
                                        ...settings.spacing.sectionPadding,
                                        vertical: e.target.value as any
                                    }
                                })}
                            >
                                <option value="32">32px</option>
                                <option value="48">48px</option>
                                <option value="64">64px</option>
                                <option value="96">96px</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600">Left/Right</label>
                            <select 
                                className="w-full px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md"
                                value={settings.spacing.sectionPadding.horizontal}
                                onChange={(e) => updateSpacingSettings({
                                    sectionPadding: {
                                        ...settings.spacing.sectionPadding,
                                        horizontal: e.target.value as any
                                    }
                                })}
                            >
                                <option value="16">16px</option>
                                <option value="24">24px</option>
                                <option value="32">32px</option>
                                <option value="48">48px</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900">Advanced Settings</h4>
                
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                            <label className="text-sm font-medium text-gray-900">Auto-adjust Spacing</label>
                            <p className="text-xs text-gray-500 mt-0.5">Automatically adjust spacing based on content density</p>
                        </div>
                        <Switch 
                            checked={settings.advanced.autoAdjustSpacing}
                            onCheckedChange={(checked) => updateAdvancedSettings({ autoAdjustSpacing: checked })}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                            <label className="text-sm font-medium text-gray-900">Fluid Typography</label>
                            <p className="text-xs text-gray-500 mt-0.5">Scale typography based on viewport width</p>
                        </div>
                        <Switch 
                            checked={settings.advanced.fluidTypography}
                            onCheckedChange={(checked) => updateAdvancedSettings({ fluidTypography: checked })}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                            <label className="text-sm font-medium text-gray-900">Nested Grid Support</label>
                            <p className="text-xs text-gray-500 mt-0.5">Enable support for nested grid layouts</p>
                        </div>
                        <Switch 
                            checked={settings.advanced.nestedGridSupport}
                            onCheckedChange={(checked) => updateAdvancedSettings({ nestedGridSupport: checked })}
                        />
                    </div>
                </div>
            </div>

            {/* Save Changes Button */}
            <div className="sticky bottom-6 pt-6 flex justify-end">
                <Button 
                    className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
                >
                    <Check className="w-4 h-4" />
                    Apply Layout Changes
                </Button>
            </div>
        </motion.div>
    );
} 