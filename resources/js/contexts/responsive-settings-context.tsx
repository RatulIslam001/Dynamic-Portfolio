import { createContext, useContext, useState, ReactNode } from 'react';

interface ResponsiveSettings {
    breakpoints: {
        mobile: string;
        tablet: string;
        desktop: string;
    };
    navigationStyle: 'hamburger' | 'bottom' | 'minimal';
    layoutStyle: 'stacked' | 'grid' | 'masonry';
    elementVisibility: {
        showHeroImage: boolean;
        showSidebar: boolean;
        enableAnimations: boolean;
    };
    fontSizeAdjustment: 'no-change' | 'scale-down' | 'scale-up';
}

interface ResponsiveSettingsContextType {
    settings: ResponsiveSettings;
    updateBreakpoints: (breakpoints: Partial<ResponsiveSettings['breakpoints']>) => void;
    updateNavigationStyle: (style: ResponsiveSettings['navigationStyle']) => void;
    updateLayoutStyle: (style: ResponsiveSettings['layoutStyle']) => void;
    updateElementVisibility: (visibility: Partial<ResponsiveSettings['elementVisibility']>) => void;
    updateFontSizeAdjustment: (adjustment: ResponsiveSettings['fontSizeAdjustment']) => void;
}

const defaultSettings: ResponsiveSettings = {
    breakpoints: {
        mobile: '640px',
        tablet: '1024px',
        desktop: '1280px'
    },
    navigationStyle: 'hamburger',
    layoutStyle: 'stacked',
    elementVisibility: {
        showHeroImage: true,
        showSidebar: true,
        enableAnimations: true
    },
    fontSizeAdjustment: 'no-change'
};

const ResponsiveSettingsContext = createContext<ResponsiveSettingsContextType | undefined>(undefined);

export function ResponsiveSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<ResponsiveSettings>(defaultSettings);

    const updateBreakpoints = (breakpoints: Partial<ResponsiveSettings['breakpoints']>) => {
        setSettings(prev => ({
            ...prev,
            breakpoints: {
                ...prev.breakpoints,
                ...breakpoints
            }
        }));
    };

    const updateNavigationStyle = (style: ResponsiveSettings['navigationStyle']) => {
        setSettings(prev => ({
            ...prev,
            navigationStyle: style
        }));
    };

    const updateLayoutStyle = (style: ResponsiveSettings['layoutStyle']) => {
        setSettings(prev => ({
            ...prev,
            layoutStyle: style
        }));
    };

    const updateElementVisibility = (visibility: Partial<ResponsiveSettings['elementVisibility']>) => {
        setSettings(prev => ({
            ...prev,
            elementVisibility: {
                ...prev.elementVisibility,
                ...visibility
            }
        }));
    };

    const updateFontSizeAdjustment = (adjustment: ResponsiveSettings['fontSizeAdjustment']) => {
        setSettings(prev => ({
            ...prev,
            fontSizeAdjustment: adjustment
        }));
    };

    return (
        <ResponsiveSettingsContext.Provider
            value={{
                settings,
                updateBreakpoints,
                updateNavigationStyle,
                updateLayoutStyle,
                updateElementVisibility,
                updateFontSizeAdjustment
            }}
        >
            {children}
        </ResponsiveSettingsContext.Provider>
    );
}

export function useResponsiveSettings() {
    const context = useContext(ResponsiveSettingsContext);
    if (context === undefined) {
        throw new Error('useResponsiveSettings must be used within a ResponsiveSettingsProvider');
    }
    return context;
} 