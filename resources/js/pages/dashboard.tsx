import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Users, Briefcase, Award, Activity } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">+2 from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">28</div>
                            <p className="text-xs text-muted-foreground">+4 new skills added</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                            <BarChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24.3%</div>
                            <p className="text-xs text-muted-foreground">+2.4% from last month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Recent Projects */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Projects</CardTitle>
                            <CardDescription>Your latest portfolio projects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Project Items */}
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p className="font-medium">E-commerce Dashboard</p>
                                        <p className="text-sm text-muted-foreground">React, TypeScript, Tailwind</p>
                                    </div>
                                    <Button variant="outline" size="sm">View</Button>
                                </div>
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p className="font-medium">Social Media App</p>
                                        <p className="text-sm text-muted-foreground">Next.js, MongoDB, GraphQL</p>
                                    </div>
                                    <Button variant="outline" size="sm">View</Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Portfolio Website</p>
                                        <p className="text-sm text-muted-foreground">Laravel, React, MySQL</p>
                                    </div>
                                    <Button variant="outline" size="sm">View</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest updates and changes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 border-b pb-4">
                                    <Activity className="mt-1 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Added new skill: Docker</p>
                                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 border-b pb-4">
                                    <Activity className="mt-1 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Updated project: E-commerce Dashboard</p>
                                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                                    </div>
                    </div>
                                <div className="flex items-start gap-4">
                                    <Activity className="mt-1 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Profile information updated</p>
                                        <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                    </div>
                </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
