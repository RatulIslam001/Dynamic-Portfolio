import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar" className="min-h-screen bg-background">
            <div className="flex h-screen overflow-hidden">
                {/* Fixed Sidebar */}
                <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
                    <AppSidebar />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 ml-64">
                    {/* Fixed Header */}
                    <div className="fixed top-0 right-0 left-64 z-40 bg-white border-b border-gray-200">
                        <div className="p-4">
                            <AppSidebarHeader breadcrumbs={breadcrumbs} />
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="pt-16 px-6 pb-6 h-screen overflow-y-auto">
                        <main>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
