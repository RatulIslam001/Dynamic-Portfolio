import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
    Settings as SettingsIcon,
    Globe,
    Shield,
    Bell,
    Wrench,
    ChevronDown,
    Save
} from 'lucide-react';
import React from 'react';

interface Props {
    settings: {
        site: {
            title: string;
            description: string;
            language: string;
            timezone: string;
            date_format: string;
            time_format: string;
        };
        seo: {
            meta_title: string;
            meta_description: string;
            google_analytics_id: string;
            generate_sitemap: boolean;
            generate_robots: boolean;
            structured_data: boolean;
            social_image: string;
        };
        security: {
            two_factor_enabled: boolean;
            session_timeout: number;
            ip_restriction: string;
            last_login: {
                date: string;
                ip: string;
            };
        };
        notifications: {
            email_notifications: boolean;
            preferences: {
                new_messages: boolean;
                login_alerts: boolean;
                weekly_reports: boolean;
                marketing_emails: boolean;
            };
        };
        advanced: {
            cache_duration: string;
            image_optimization: {
                enabled: boolean;
            };
            maintenance_mode: boolean;
        };
    };
}

const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'advanced', label: 'Advanced', icon: Wrench },
];

export default function Settings({ settings }: Props) {
    const [activeTab, setActiveTab] = React.useState('general');
    const { data, setData, post, processing } = useForm({
        site: {
            title: settings.site.title,
            description: settings.site.description,
            language: settings.site.language,
            timezone: settings.site.timezone,
            date_format: settings.site.date_format,
            time_format: settings.site.time_format,
        },
        seo: {
            meta_title: settings.seo.meta_title,
            meta_description: settings.seo.meta_description,
            google_analytics_id: settings.seo.google_analytics_id,
            generate_sitemap: settings.seo.generate_sitemap,
            generate_robots: settings.seo.generate_robots,
            structured_data: settings.seo.structured_data,
            social_image: settings.seo.social_image,
        },
        security: {
            two_factor_enabled: settings.security.two_factor_enabled,
            session_timeout: settings.security.session_timeout,
            ip_restriction: settings.security.ip_restriction,
            last_login: settings.security.last_login,
        },
        notifications: {
            email_notifications: settings.notifications.email_notifications,
            preferences: settings.notifications.preferences,
        },
        advanced: {
            cache_duration: settings.advanced.cache_duration,
            image_optimization: {
                enabled: settings.advanced.image_optimization.enabled,
            },
            maintenance_mode: settings.advanced.maintenance_mode,
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout>
            <Head title="Settings - Portfolio Admin" />
            
            <div className="min-h-screen bg-gray-50/50">
                <div className="p-6 space-y-6">
                {/* Header */}
                    <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                        <p className="text-[0.925rem] text-gray-500">Manage your account and website settings</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 border-b border-gray-200">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative",
                                        tab.id === activeTab
                                            ? "text-gray-900 before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-[#20B2AA] before:rounded-full"
                                            : "text-gray-500 hover:text-gray-900"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                </div>

                {/* Content */}
                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit}>
                            {/* General Settings Section */}
                            {activeTab === 'general' && (
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
                                        <p className="mt-1 text-sm text-gray-500">Manage basic website settings</p>
                                        
                                        <div className="mt-6 space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Site Title */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-900">
                                                        Site Title
                                                    </label>
                                                    <Input 
                                                        type="text"
                                                        value={data.site.title}
                                                        onChange={e => setData('site', { ...data.site, title: e.target.value })}
                                                        placeholder="John Doe Portfolio"
                                                        className="w-full"
                                                    />
                                                </div>

                                                {/* Site Language */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-900">
                                                        Site Language
                                                    </label>
                                                    <select
                                                        value={data.site.language}
                                                        onChange={e => setData('site', { ...data.site, language: e.target.value })}
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#20B2AA]/10 focus:border-[#20B2AA]"
                                                    >
                                                        <option value="en">English</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Site Description */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">
                                                    Site Description
                                                </label>
                                                <Textarea 
                                                    value={data.site.description}
                                                    onChange={e => setData('site', { ...data.site, description: e.target.value })}
                                                    placeholder="Professional portfolio showcasing my work and skills"
                                                    className="w-full h-24"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {/* Timezone */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-900">
                                                        Timezone
                                                    </label>
                                                    <select
                                                        value={data.site.timezone}
                                                        onChange={e => setData('site', { ...data.site, timezone: e.target.value })}
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#20B2AA]/10 focus:border-[#20B2AA]"
                                                    >
                                                        <option value="America/New_York">Eastern Time (ET)</option>
                                                        <option value="UTC">UTC</option>
                                                        <option value="Europe/London">London</option>
                                                        <option value="Asia/Tokyo">Tokyo</option>
                                                    </select>
                                                </div>

                                                {/* Date Format */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-900">
                                                        Date Format
                                                    </label>
                                                    <select
                                                        value={data.site.date_format}
                                                        onChange={e => setData('site', { ...data.site, date_format: e.target.value })}
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#20B2AA]/10 focus:border-[#20B2AA]"
                                                    >
                                                        <option value="m/d/Y">MM/DD/YYYY</option>
                                                        <option value="Y-m-d">YYYY-MM-DD</option>
                                                        <option value="d/m/Y">DD/MM/YYYY</option>
                                                    </select>
                                                </div>

                                                {/* Time Format */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-900">
                                                        Time Format
                                                    </label>
                                                    <select
                                                        value={data.site.time_format}
                                                        onChange={e => setData('site', { ...data.site, time_format: e.target.value })}
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#20B2AA]/10 focus:border-[#20B2AA]"
                                                    >
                                                        <option value="h:i A">12-hour (1:30 PM)</option>
                                                        <option value="H:i">24-hour (13:30)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                        >
                                            Save Settings
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* SEO Settings Section */}
                            {activeTab === 'seo' && (
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900">SEO Settings</h2>
                                        <p className="mt-1 text-sm text-gray-500">Optimize your portfolio for search engines</p>
                                        
                                        <div className="mt-6 space-y-6">
                                            {/* Meta Title */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">
                                                    Meta Title
                                                </label>
                                                <Input 
                                                    type="text"
                                                    value={data.seo.meta_title}
                                                    onChange={e => setData('seo', { ...data.seo, meta_title: e.target.value })}
                                                    placeholder="John Doe | Creative Designer & Developer"
                                                    className="w-full"
                                                />
                                                <p className="text-sm text-gray-500">Recommended length: 50-60 characters</p>
                                            </div>

                                            {/* Meta Description */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">
                                                    Meta Description
                                                </label>
                                                <Textarea 
                                                    value={data.seo.meta_description}
                                                    onChange={e => setData('seo', { ...data.seo, meta_description: e.target.value })}
                                                    placeholder="Professional portfolio of John Doe, a creative designer and developer specializing in web and mobile applications."
                                                    className="w-full h-24"
                                                />
                                                <p className="text-sm text-gray-500">Recommended length: 150-160 characters</p>
                                            </div>

                                            {/* Social Media Image */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">
                                                    Social Media Image
                                                </label>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        {data.seo.social_image ? (
                                                            <img 
                                                                src={data.seo.social_image} 
                                                                alt="Social preview" 
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-6 h-6 text-gray-400">+</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="text-gray-700 border-gray-200 hover:bg-gray-50"
                                                            onClick={() => {
                                                                // Image upload logic here
                                                            }}
                                                        >
                                                            Upload Image
                                                        </Button>
                                                        <p className="mt-1 text-sm text-gray-500">Recommended size: 1200 × 630 pixels</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Google Analytics ID */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">
                                                    Google Analytics ID
                                                </label>
                                                <Input 
                                                    type="text"
                                                    value={data.seo.google_analytics_id}
                                                    onChange={e => setData('seo', { ...data.seo, google_analytics_id: e.target.value })}
                                                    placeholder="UA-XXXXXXXXX-X"
                                                    className="w-full"
                                                />
                                            </div>

                                            {/* Toggle Switches */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                                {/* Generate Sitemap */}
                                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                    <div className="space-y-0.5">
                                                        <span className="text-sm font-medium text-gray-900">Generate Sitemap</span>
                                                        <p className="text-xs text-gray-500">Automatically generate XML sitemap</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        role="switch"
                                                        aria-checked={data.seo.generate_sitemap}
                                                        onClick={() => setData('seo', { ...data.seo, generate_sitemap: !data.seo.generate_sitemap })}
                                                        className={cn(
                                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#20B2AA]",
                                                            data.seo.generate_sitemap ? "bg-[#20B2AA]" : "bg-gray-200"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                                                                data.seo.generate_sitemap ? "translate-x-6" : "translate-x-1"
                                                            )}
                                                        />
                                                    </button>
                                                </div>

                                                {/* Generate robots.txt */}
                                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                    <div className="space-y-0.5">
                                                        <span className="text-sm font-medium text-gray-900">Generate robots.txt</span>
                                                        <p className="text-xs text-gray-500">Create search engine instructions</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        role="switch"
                                                        aria-checked={data.seo.generate_robots}
                                                        onClick={() => setData('seo', { ...data.seo, generate_robots: !data.seo.generate_robots })}
                                                        className={cn(
                                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#20B2AA]",
                                                            data.seo.generate_robots ? "bg-[#20B2AA]" : "bg-gray-200"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                                                                data.seo.generate_robots ? "translate-x-6" : "translate-x-1"
                                                            )}
                                                        />
                                                    </button>
                                                </div>

                                                {/* Structured Data */}
                                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                    <div className="space-y-0.5">
                                                        <span className="text-sm font-medium text-gray-900">Structured Data</span>
                                                        <p className="text-xs text-gray-500">Add JSON-LD schema markup</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        role="switch"
                                                        aria-checked={data.seo.structured_data}
                                                        onClick={() => setData('seo', { ...data.seo, structured_data: !data.seo.structured_data })}
                                                        className={cn(
                                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#20B2AA]",
                                                            data.seo.structured_data ? "bg-[#20B2AA]" : "bg-gray-200"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                                                                data.seo.structured_data ? "translate-x-6" : "translate-x-1"
                                                            )}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                        >
                                            Save Settings
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Security Settings Section */}
                            {activeTab === 'security' && (
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                                        <p className="mt-1 text-sm text-gray-500">Manage account security and access</p>
                                        
                                        <div className="mt-6 space-y-6">
                                            {/* Two-Factor Authentication */}
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                                                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    role="switch"
                                                    aria-checked={data.security.two_factor_enabled}
                                                    onClick={() => setData('security', { 
                                                        ...data.security, 
                                                        two_factor_enabled: !data.security.two_factor_enabled 
                                                    })}
                                                    className={cn(
                                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#20B2AA]",
                                                        data.security.two_factor_enabled ? "bg-[#20B2AA]" : "bg-gray-200"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                                                            data.security.two_factor_enabled ? "translate-x-6" : "translate-x-1"
                                                        )}
                                                    />
                                                </button>
                                            </div>

                                            {/* Session Timeout */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">
                                                    Session Timeout (minutes)
                                                </label>
                                                <select
                                                    value={data.security.session_timeout}
                                                    onChange={e => setData('security', { 
                                                        ...data.security, 
                                                        session_timeout: parseInt(e.target.value) 
                                                    })}
                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#20B2AA]/10 focus:border-[#20B2AA]"
                                                >
                                                    <option value="15">15 minutes</option>
                                                    <option value="30">30 minutes</option>
                                                    <option value="60">1 hour</option>
                                                    <option value="120">2 hours</option>
                                                </select>
                                            </div>

                                            {/* IP Restriction */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">
                                                    IP Restriction (Optional)
                                                </label>
                                                <Input 
                                                    type="text"
                                                    value={data.security.ip_restriction}
                                                    onChange={e => setData('security', { 
                                                        ...data.security, 
                                                        ip_restriction: e.target.value 
                                                    })}
                                                    placeholder="e.g., 192.168.1.1, 10.0.0.1"
                                                    className="w-full"
                                                />
                                                <p className="text-sm text-gray-500">
                                                    Restrict admin access to specific IP addresses (comma separated)
                                                </p>
                                            </div>

                                            {/* Login History */}
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-medium text-gray-900">Login History</h3>
                                                <div className="p-4 bg-gray-50 rounded-lg">
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-gray-900">Last login: {data.security.last_login.date}</p>
                                                        <p className="text-sm text-gray-500">IP: {data.security.last_login.ip}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Password Change */}
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-medium text-gray-900">Password</h3>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="text-gray-700 border-gray-200 hover:bg-gray-50"
                                                >
                                                    Change Password
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                        >
                                            Save Settings
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Notifications Settings Section */}
                            {activeTab === 'notifications' && (
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
                                        <p className="mt-1 text-sm text-gray-500">Manage how you receive notifications</p>
                                        
                                        <div className="mt-6 space-y-6">
                                            {/* Email Notifications */}
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                                                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    role="switch"
                                                    aria-checked={data.notifications.email_notifications}
                                                    onClick={() => setData('notifications', { 
                                                        ...data.notifications, 
                                                        email_notifications: !data.notifications.email_notifications 
                                                    })}
                                                    className={cn(
                                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#20B2AA]",
                                                        data.notifications.email_notifications ? "bg-[#20B2AA]" : "bg-gray-200"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                                                            data.notifications.email_notifications ? "translate-x-6" : "translate-x-1"
                                                        )}
                                                    />
                                                </button>
                                            </div>

                                            {/* Notification Preferences */}
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-medium text-gray-900">Notification Preferences</h3>
                                                
                                                {/* New messages */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-700">New messages</span>
                                                    <button
                                                        type="button"
                                                        role="switch"
                                                        aria-checked={data.notifications.preferences.new_messages}
                                                        onClick={() => setData('notifications', { 
                                                            ...data.notifications, 
                                                            preferences: {
                                                                ...data.notifications.preferences,
                                                                new_messages: !data.notifications.preferences.new_messages
                                                            }
                                                        })}
                                                        className={cn(
                                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#20B2AA]",
                                                            data.notifications.preferences.new_messages ? "bg-[#20B2AA]" : "bg-gray-200"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                                                                data.notifications.preferences.new_messages ? "translate-x-6" : "translate-x-1"
                                                            )}
                                                        />
                                                    </button>
                                                </div>

                                                {/* Login alerts */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-700">Login alerts</span>
                                                    <button
                                                        type="button"
                                                        role="switch"
                                                        aria-checked={data.notifications.preferences.login_alerts}
                                                        onClick={() => setData('notifications', { 
                                                            ...data.notifications, 
                                                            preferences: {
                                                                ...data.notifications.preferences,
                                                                login_alerts: !data.notifications.preferences.login_alerts
                                                            }
                                                        })}
                                                        className={cn(
                                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#20B2AA]",
                                                            data.notifications.preferences.login_alerts ? "bg-[#20B2AA]" : "bg-gray-200"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                                                                data.notifications.preferences.login_alerts ? "translate-x-6" : "translate-x-1"
                                                            )}
                                                        />
                                                    </button>
                                                </div>

                                                {/* Weekly reports */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-700">Weekly reports</span>
                                                    <button
                                                        type="button"
                                                        role="switch"
                                                        aria-checked={data.notifications.preferences.weekly_reports}
                                                        onClick={() => setData('notifications', { 
                                                            ...data.notifications, 
                                                            preferences: {
                                                                ...data.notifications.preferences,
                                                                weekly_reports: !data.notifications.preferences.weekly_reports
                                                            }
                                                        })}
                                                        className={cn(
                                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#20B2AA]",
                                                            data.notifications.preferences.weekly_reports ? "bg-[#20B2AA]" : "bg-gray-200"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                                                                data.notifications.preferences.weekly_reports ? "translate-x-6" : "translate-x-1"
                                                            )}
                                                        />
                                                    </button>
                                                </div>

                                                {/* Marketing emails */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-700">Marketing emails</span>
                                                    <button
                                                        type="button"
                                                        role="switch"
                                                        aria-checked={data.notifications.preferences.marketing_emails}
                                                        onClick={() => setData('notifications', { 
                                                            ...data.notifications, 
                                                            preferences: {
                                                                ...data.notifications.preferences,
                                                                marketing_emails: !data.notifications.preferences.marketing_emails
                                                            }
                                                        })}
                                                        className={cn(
                                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#20B2AA]",
                                                            data.notifications.preferences.marketing_emails ? "bg-[#20B2AA]" : "bg-gray-200"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                                                                data.notifications.preferences.marketing_emails ? "translate-x-6" : "translate-x-1"
                                                            )}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                        >
                                            Save Settings
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Advanced Settings Section */}
                            {activeTab === 'advanced' && (
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Advanced Settings</h2>
                                        <p className="mt-1 text-sm text-gray-500">Advanced configuration options</p>

                                        {/* Caution Alert */}
                                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                                            <div className="flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-700" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                <div>
                                                    <h3 className="text-sm font-medium text-yellow-800">Caution</h3>
                                                    <p className="mt-1 text-sm text-yellow-700">
                                                        These settings are for advanced users. Incorrect configuration may affect your website functionality.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6 space-y-6">
                                            {/* Cache Control */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">Cache Control</label>
                                                <select
                                                    value={data.advanced.cache_duration}
                                                    onChange={e => setData('advanced', { 
                                                        ...data.advanced, 
                                                        cache_duration: e.target.value 
                                                    })}
                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#20B2AA]/10 focus:border-[#20B2AA]"
                                                >
                                                    <option value="1 day">Normal (1 day)</option>
                                                    <option value="1 week">Extended (1 week)</option>
                                                    <option value="1 month">Long term (1 month)</option>
                                                    <option value="custom">Custom</option>
                                                </select>
                                            </div>

                                            {/* Image Optimization */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">Image Optimization</label>
                                                <select
                                                    value={data.advanced.image_optimization.enabled ? "enabled" : "disabled"}
                                                    onChange={e => setData('advanced', { 
                                                        ...data.advanced, 
                                                        image_optimization: {
                                                            ...data.advanced.image_optimization,
                                                            enabled: e.target.value === "enabled"
                                                        }
                                                    })}
                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#20B2AA]/10 focus:border-[#20B2AA]"
                                                >
                                                    <option value="enabled">Enabled</option>
                                                    <option value="disabled">Disabled</option>
                                                </select>
                                            </div>

                                            {/* Maintenance Mode */}
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <h3 className="text-sm font-medium text-gray-900">Maintenance Mode</h3>
                                                    <p className="text-sm text-gray-500">When enabled, visitors will see a maintenance page</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    role="switch"
                                                    aria-checked={data.advanced.maintenance_mode}
                                                    onClick={() => setData('advanced', { 
                                                        ...data.advanced, 
                                                        maintenance_mode: !data.advanced.maintenance_mode 
                                                    })}
                                                    className={cn(
                                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#20B2AA]",
                                                        data.advanced.maintenance_mode ? "bg-[#20B2AA]" : "bg-gray-200"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                                                            data.advanced.maintenance_mode ? "translate-x-6" : "translate-x-1"
                                                        )}
                                                    />
                                                </button>
                                            </div>

                                            {/* Data Management */}
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-medium text-gray-900">Data Management</h3>
                                                <div className="flex gap-3">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="text-gray-700 border-gray-200 hover:bg-gray-50"
                                                        onClick={() => post(route('admin.settings.export-data'))}
                                                    >
                                                        Export Data
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                                        onClick={() => post(route('admin.settings.clear-cache'))}
                                                    >
                                                        Clear Cache
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                        >
                                            Save Settings
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 