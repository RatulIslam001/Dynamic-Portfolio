import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { type PropsWithChildren } from 'react';
import { Search, Bell } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Fixed Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Top Navigation Bar */}
                <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-end px-4 py-2 gap-3">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-[240px] pl-8 pr-3 py-1.5 text-sm rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-1.5 text-gray-500 hover:text-gray-600">
                            <span className="sr-only">View notifications</span>
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-red-400 ring-1 ring-white" />
                        </button>

                        {/* User Profile */}
                        <button className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">JD</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="h-[calc(100vh-49px)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
} 