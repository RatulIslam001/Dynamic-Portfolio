import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { type PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Fixed Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Content Area */}
                <div className="h-screen overflow-y-auto p-8">
                    {children}
                </div>
            </div>
        </div>
    );
} 