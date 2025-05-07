import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import Experience from './resume/experience';
import Education from './resume/education';

export default function Resume() {
    return (
        <AdminLayout>
            <Head title="Resume - Portfolio Admin" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Resume</h1>
                        <p className="text-sm text-gray-500">Manage your professional experience and qualifications</p>
                    </div>
                </div>

                {/* Content */}
                <Card className="p-6">
                    <Tabs defaultValue="experience" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="experience">Experience</TabsTrigger>
                            <TabsTrigger value="education">Education</TabsTrigger>
                        </TabsList>
                        <TabsContent value="experience">
                            <Experience />
                        </TabsContent>
                        <TabsContent value="education">
                            <Education />
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </AdminLayout>
    );
} 