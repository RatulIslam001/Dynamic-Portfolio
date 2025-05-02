import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

interface BlankPageProps {
    title: string;
    description?: string;
}

export default function BlankPage({ title, description }: BlankPageProps) {
    return (
        <AdminLayout>
            <Head title={`${title} - Portfolio Admin`} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                    {description && (
                        <p className="mt-2 text-sm text-gray-500">{description}</p>
                    )}
                </div>

                {/* Content area */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <div className="min-h-[400px] flex items-center justify-center text-gray-500">
                        This page is under construction
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 