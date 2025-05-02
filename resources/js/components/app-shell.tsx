import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    className?: string;
}

export function AppShell({ children, variant = 'header', className }: AppShellProps) {
    const [isOpen, setIsOpen] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('sidebar') !== 'false' : true));

    const handleSidebarChange = (open: boolean) => {
        setIsOpen(open);

        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebar', String(open));
        }
    };

    if (variant === 'header') {
        return <div className={cn("flex min-h-screen w-full flex-col", className)}>{children}</div>;
    }

    return (
        <SidebarProvider defaultOpen={isOpen} open={isOpen} onOpenChange={handleSidebarChange}>
            <div className={className}>{children}</div>
        </SidebarProvider>
    );
}
