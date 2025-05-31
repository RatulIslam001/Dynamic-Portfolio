import { createContext, useContext, ReactNode } from 'react';
import { useLayoutSettings, LayoutSettings } from '@/hooks/use-layout-settings';

type LayoutSettingsContextType = ReturnType<typeof useLayoutSettings>;

const LayoutSettingsContext = createContext<LayoutSettingsContextType | null>(null);

export function LayoutSettingsProvider({ children }: { children: ReactNode }) {
    const layoutSettings = useLayoutSettings();

    return (
        <LayoutSettingsContext.Provider value={layoutSettings}>
            {children}
        </LayoutSettingsContext.Provider>
    );
}

export function useLayoutSettingsContext() {
    const context = useContext(LayoutSettingsContext);
    if (!context) {
        throw new Error('useLayoutSettingsContext must be used within a LayoutSettingsProvider');
    }
    return context;
} 