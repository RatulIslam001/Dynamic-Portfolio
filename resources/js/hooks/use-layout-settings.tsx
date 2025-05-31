import { useState } from 'react';

export type LayoutSettings = {
    container: {
        maxWidth: '1024' | '1280' | '1536' | '1920';
        sidePadding: '16' | '24' | '32' | '48';
    };
    grid: {
        columnCount: '6' | '12' | '16';
        columnGap: '16' | '24' | '32';
        columnSpans: {
            desktop: '1' | '2' | '3' | '4' | '6' | '12';
            tablet: '1' | '2' | '3' | '4' | '6' | '12';
            mobile: '1' | '2' | '3' | '4' | '6' | '12';
        };
    };
    spacing: {
        sectionGap: '32' | '64' | '96' | '128';
        contentSpacing: '16' | '24' | '32' | '48';
        sectionPadding: {
            vertical: '32' | '48' | '64' | '96';
            horizontal: '16' | '24' | '32' | '48';
        };
    };
    advanced: {
        autoAdjustSpacing: boolean;
        fluidTypography: boolean;
        nestedGridSupport: boolean;
    };
};

const defaultSettings: LayoutSettings = {
    container: {
        maxWidth: '1280',
        sidePadding: '24',
    },
    grid: {
        columnCount: '12',
        columnGap: '24',
        columnSpans: {
            desktop: '4',
            tablet: '6',
            mobile: '12',
        },
    },
    spacing: {
        sectionGap: '64',
        contentSpacing: '24',
        sectionPadding: {
            vertical: '64',
            horizontal: '24',
        },
    },
    advanced: {
        autoAdjustSpacing: false,
        fluidTypography: false,
        nestedGridSupport: false,
    },
};

export function useLayoutSettings() {
    const [settings, setSettings] = useState<LayoutSettings>(defaultSettings);

    const updateSettings = (newSettings: Partial<LayoutSettings>) => {
        setSettings((prev) => ({
            ...prev,
            ...newSettings,
        }));
    };

    const updateContainerSettings = (container: Partial<LayoutSettings['container']>) => {
        setSettings((prev) => ({
            ...prev,
            container: {
                ...prev.container,
                ...container,
            },
        }));
    };

    const updateGridSettings = (grid: Partial<LayoutSettings['grid']>) => {
        setSettings((prev) => ({
            ...prev,
            grid: {
                ...prev.grid,
                ...grid,
            },
        }));
    };

    const updateSpacingSettings = (spacing: Partial<LayoutSettings['spacing']>) => {
        setSettings((prev) => ({
            ...prev,
            spacing: {
                ...prev.spacing,
                ...spacing,
            },
        }));
    };

    const updateAdvancedSettings = (advanced: Partial<LayoutSettings['advanced']>) => {
        setSettings((prev) => ({
            ...prev,
            advanced: {
                ...prev.advanced,
                ...advanced,
            },
        }));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
    };

    return {
        settings,
        updateSettings,
        updateContainerSettings,
        updateGridSettings,
        updateSpacingSettings,
        updateAdvancedSettings,
        resetSettings,
    };
} 