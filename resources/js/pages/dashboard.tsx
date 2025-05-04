import { Head, router, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Search, Bell, Settings, Users, MessageSquare, FileText, BarChart2, Edit3, Eye, Send, Star, RefreshCw, MapPin, Github, Linkedin, Twitter, LogOut } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('Hero Section');

    // Chart data
    const chartData = {
        labels: ['May 2021', 'Jun 2021', 'Jul 2021', 'Aug 2021', 'Sep 2021', 'Oct 2021', 'Nov 2021'],
        datasets: [
            {
                label: 'Visitors',
                data: [650, 750, 600, 800, 850, 700, 900],
                borderColor: '#20B2AA',
                backgroundColor: 'rgba(32, 178, 170, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#20B2AA',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: 'Messages',
                data: [200, 450, 300, 500, 450, 400, 600],
                borderColor: '#4169E1',
                backgroundColor: 'rgba(65, 105, 225, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#4169E1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            }
        ]
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 6,
                    boxHeight: 6,
                    padding: 20,
                    font: {
                        size: 12,
                    }
                }
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: '#111827',
                bodyColor: '#111827',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: function(context: any) {
                        return ` ${context.dataset.label}: ${context.parsed.y}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                beginAtZero: true,
                border: {
                    display: false
                },
                grid: {
                    color: '#f3f4f6'
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    stepSize: 200
                }
            }
        }
    };

    // Function to render form fields based on active tab
    const renderFormFields = () => {
        switch (activeTab) {
            case 'Hero Section':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                            <input
                                type="text"
                                defaultValue="Creative Designer & Developer"
                                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subheading</label>
                            <input
                                type="text"
                                defaultValue="I create exceptional digital experiences that solve complex problems"
                                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                            <input
                                type="text"
                                defaultValue="View My Work"
                                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] transition-colors"
                            />
                            <p className="mt-2 text-xs text-gray-500">This text will appear on the main call-to-action button in your hero section.</p>
                        </div>
                    </div>
                );
            case 'Contact Info':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        defaultValue="contact@example.com"
                                        className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] transition-colors"
                                        placeholder="Enter your email"
                                    />
                                    <MessageSquare className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        defaultValue="+1 (555) 000-0000"
                                        className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] transition-colors"
                                        placeholder="Enter phone number"
                                    />
                                    <Bell className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    defaultValue="New York, USA"
                                    className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] transition-colors"
                                    placeholder="Enter your location"
                                />
                                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Links</label>
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="url"
                                        defaultValue="https://github.com/yourusername"
                                        className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] transition-colors"
                                        placeholder="GitHub Profile URL"
                                    />
                                    <Github className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                                <div className="relative">
                                    <input
                                        type="url"
                                        defaultValue="https://linkedin.com/in/yourusername"
                                        className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] transition-colors"
                                        placeholder="LinkedIn Profile URL"
                                    />
                                    <Linkedin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                                <div className="relative">
                                    <input
                                        type="url"
                                        defaultValue="https://twitter.com/yourusername"
                                        className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] transition-colors"
                                        placeholder="Twitter Profile URL"
                                    />
                                    <Twitter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Form Message</label>
                            <div className="relative">
                                <textarea
                                    defaultValue="Let's create something amazing together!"
                                    rows={3}
                                    className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] transition-colors resize-none"
                                    placeholder="Enter your contact form message"
                                />
                                <MessageSquare className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">This message will be displayed in your contact form section.</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleLogout = () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                // Will automatically redirect to login page
                window.location.href = '/login';
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Dashboard - Portfolio Admin" />

            {/* Dashboard Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            <p className="mt-1 text-sm text-gray-500">Welcome back to your portfolio admin.</p>
                        </div>
                                <Link
                            href={route('home')}
                            className="inline-flex items-center justify-center px-4 py-2 bg-[#20B2AA] text-white text-sm font-medium rounded-lg hover:bg-[#1a9994] transition-colors duration-200"
                        >
                            View Portfolio
                        </Link>
                    </div>
                        </div>
                    </div>

            <div className="p-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Total Visitors', value: '1254', change: '+12%', timeframe: 'from last month' },
                            { label: 'Messages', value: '23', change: '+5', timeframe: 'new since last week' },
                            { label: 'Projects', value: '16', change: '2', timeframe: 'in draft mode' },
                            { label: 'Testimonials', value: '8', change: '+2', timeframe: 'new this month' }
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{ y: -4 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                            >
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <div className="flex items-baseline gap-2 mt-2">
                                    <h3 className="text-2xl font-semibold text-gray-800">{stat.value}</h3>
                                <span className="text-xs font-medium text-green-500">{stat.change}</span>
                                </div>
                            <p className="text-xs text-gray-400 mt-1">{stat.timeframe}</p>
                            </motion.div>
                        ))}
                    </div>

                {/* Chart and Quick Actions */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Visitor Analytics */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Visitor Analytics</h2>
                                    <p className="text-sm text-gray-500 mt-1">Last 7 months</p>
                                </div>
                                <div className="flex items-center gap-4">
                                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent">
                                        <option value="7months">Last 7 Months</option>
                                        <option value="6months">Last 6 Months</option>
                                        <option value="3months">Last 3 Months</option>
                                        <option value="1month">Last Month</option>
                                    </select>
                                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                                        <RefreshCw className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="h-[300px]">
                                <Line data={chartData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                            <button className="text-sm text-[#20B2AA] hover:text-[#1a9994]">View All</button>
                        </div>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: MessageSquare,
                                        color: 'bg-blue-100',
                                        iconColor: 'text-blue-600',
                                        title: 'New message received',
                                        description: 'John Doe sent you a message about a potential project',
                                        time: '5 minutes ago'
                                    },
                                    {
                                        icon: Eye,
                                        color: 'bg-purple-100',
                                        iconColor: 'text-purple-600',
                                        title: 'Project viewed',
                                        description: 'Your E-commerce Redesign project was viewed 12 times',
                                        time: '2 hours ago'
                                    },
                                    {
                                        icon: Star,
                                        color: 'bg-yellow-100',
                                        iconColor: 'text-yellow-600',
                                        title: 'New testimonial',
                                        description: 'Sarah Johnson left a 5-star testimonial',
                                        time: 'Yesterday'
                                    },
                                    {
                                        icon: Send,
                                        color: 'bg-green-100',
                                        iconColor: 'text-green-600',
                                        title: 'Contact form submission',
                                        description: 'New inquiry from Tech Solutions Inc.',
                                        time: '2 days ago'
                                    }
                                ].map((activity, index) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}>
                                            <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                                        </div>
                                    <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-800">{activity.title}</h3>
                                        <p className="text-sm text-gray-500 mt-0.5 truncate">{activity.description}</p>
                                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                            </div>
                        </div>

                {/* Content Editor */}
                <div className="rounded-xl shadow-sm border border-gray-100 bg-white p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                                <h2 className="text-lg font-semibold text-gray-800">Quick Edit</h2>
                            <p className="text-sm text-gray-500 mt-1">Update your portfolio content quickly</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-500">Last edited 2 hours ago</span>
                        </div>
                            </div>
                            
                            {/* Section Tabs */}
                    <div className="flex gap-2 mb-8 border-b border-gray-100">
                                {['Hero Section', 'Contact Info'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                                            activeTab === tab
                                        ? 'border-[#20B2AA] text-[#20B2AA]'
                                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-200'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Edit Form */}
                    <form onSubmit={(e) => e.preventDefault()} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                                {renderFormFields()}
                        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
                                    <button 
                                        type="submit" 
                                className="flex items-center justify-center gap-2 py-2.5 px-6 bg-[#20B2AA] text-white text-sm font-medium rounded-lg hover:bg-[#1a9994] transition-all duration-200 focus:ring-2 focus:ring-[#20B2AA] focus:ring-offset-2 focus:outline-none"
                                    >
                                <Edit3 className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                    <button 
                                        type="button" 
                                className="py-2.5 px-6 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
        </AdminLayout>
    );
}
