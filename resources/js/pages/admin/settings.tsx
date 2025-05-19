import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function Settings() {
    return (
        <AdminLayout>
            <Head title="Settings - Portfolio Admin" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                    <p className="text-gray-500">Configure your portfolio settings and preferences</p>
                </div>

                {/* Content */}
                <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                    <p className="text-gray-500">This page is under construction</p>
                </div>
            </div>
        </AdminLayout>
    );
} 