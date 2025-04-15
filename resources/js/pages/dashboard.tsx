import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Search, Bell, Settings, Users, MessageSquare, FileText, BarChart2, Edit3, Eye, Send, Star, RefreshCw } from 'lucide-react';
import { useState } from 'react';
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
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                            <input
                                type="text"
                                defaultValue="Creative Designer & Developer"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#20B2AA]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
                            <input
                                type="text"
                                defaultValue="I create exceptional digital experiences that solve complex problems"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#20B2AA]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                            <input
                                type="text"
                                defaultValue="View My Work"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#20B2AA]"
                            />
                        </div>
                    </div>
                );
            case 'Contact Info':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                defaultValue="contact@example.com"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#20B2AA]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                defaultValue="+1 (555) 000-0000"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#20B2AA]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                defaultValue="New York, USA"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#20B2AA]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Form Message</label>
                            <textarea
                                defaultValue="Let's create something amazing together!"
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#20B2AA] resize-none"
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Head title="Portfolio Admin Dashboard" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Sidebar */}
                <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-30">
                    <div className="flex items-center gap-2 p-5 border-b border-gray-200">
                        <div className="w-8 h-8 bg-[#20B2AA] rounded-lg flex items-center justify-center text-white font-bold">
                            P
                        </div>
                        <span className="font-semibold text-gray-800">Portfolio Admin</span>
                    </div>

                    <nav className="p-4 space-y-2">
                        {[
                            { name: 'Dashboard', icon: BarChart2, active: true },
                            { name: 'Profile', icon: Users },
                            { name: 'Services', icon: Settings },
                            { name: 'Projects', icon: FileText },
                            { name: 'Skills', icon: Star },
                            { name: 'Resume', icon: FileText },
                            { name: 'Testimonials', icon: MessageSquare },
                            { name: 'Messages', icon: MessageSquare },
                            { name: 'Appearance', icon: Eye },
                            { name: 'Settings', icon: Settings },
                        ].map((item) => (
                            <button
                                key={item.name}
                                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm ${
                                    item.active 
                                        ? 'bg-[#20B2AA] text-white' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="ml-64 p-8">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-xl text-gray-800 font-medium">Welcome back to your portfolio admin.</h1>
                            <p className="text-gray-500 text-sm mt-1">Here's what's happening with your portfolio today.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#20B2AA] text-sm"
                                />
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>

                            {/* Notifications */}
                            <button className="relative p-2 rounded-lg hover:bg-gray-100">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Profile */}
                            <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100">
                                <img src="/storage/profile.jpg" alt="Profile" className="w-8 h-8 rounded-lg object-cover" />
                                <span className="text-sm font-medium text-gray-700">Admin</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Visitors', value: '1254', change: '+12%', timeframe: 'from last month' },
                            { label: 'Messages', value: '23', change: '+5', timeframe: 'new since last week' },
                            { label: 'Projects', value: '16', change: '2', timeframe: 'in draft mode' },
                            { label: 'Testimonials', value: '8', change: '+2', timeframe: 'new this month' }
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{ y: -4 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                            >
                                <p className="text-gray-500 text-sm mb-1.5">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-semibold text-gray-800">{stat.value}</h3>
                                    <span className="text-xs text-green-500">{stat.change}</span>
                                </div>
                                <p className="text-gray-400 text-xs mt-1">{stat.timeframe}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Visitor Analytics */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Visitor Analytics</h2>
                                    <p className="text-sm text-gray-500 mt-1">Last 7 months</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#20B2AA]">
                                        <option value="7months">Last 7 Months</option>
                                        <option value="6months">Last 6 Months</option>
                                        <option value="3months">Last 3 Months</option>
                                        <option value="1month">Last Month</option>
                                    </select>
                                    <button className="text-gray-400 hover:text-gray-600">
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
                            <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
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
                                    },
                                    {
                                        icon: RefreshCw,
                                        color: 'bg-teal-100',
                                        iconColor: 'text-teal-600',
                                        title: 'Portfolio updated',
                                        description: 'You updated the Mobile App project details',
                                        time: '3 days ago'
                                    }
                                ].map((activity, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
                                            <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-800">{activity.title}</h3>
                                            <p className="text-sm text-gray-500">{activity.description}</p>
                                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Edit */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-800">Quick Edit</h2>
                                <span className="text-sm text-gray-500">Last edited 2 hours ago</span>
                            </div>
                            
                            {/* Section Tabs */}
                            <div className="flex gap-2 mb-6">
                                {['Hero Section', 'Contact Info'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                                            activeTab === tab
                                                ? 'bg-[#20B2AA] text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Edit Form */}
                            <form onSubmit={(e) => e.preventDefault()}>
                                {renderFormFields()}
                                <div className="flex items-center gap-3 mt-6">
                                    <button 
                                        type="submit" 
                                        className="flex-1 py-2.5 px-4 bg-[#20B2AA] text-white text-sm font-medium rounded-lg hover:bg-[#1a9994] transition-all duration-200 focus:ring-2 focus:ring-[#20B2AA] focus:ring-offset-2 focus:outline-none"
                                    >
                                        Save Changes
                                    </button>
                                    <button 
                                        type="button" 
                                        className="py-2.5 px-6 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
