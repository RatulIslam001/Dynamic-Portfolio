import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Code, Layout, Smartphone, BarChart3, FileText, Globe, Clock, Computer, ShoppingBag, Briefcase, Monitor, BarChart2, Shield, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

// Define the icon mapping
const iconMap = {
  'code': Code,
  'layout': Layout,
  'smartphone': Smartphone,
  'bar-chart': BarChart3,
  'file-text': FileText,
  'globe': Globe,
  'computer': Computer,
  'shopping-bag': ShoppingBag,
  'briefcase': Briefcase,
  'monitor': Monitor,
  'bar-chart-2': BarChart2,
  'shield': Shield,
};

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
  starting_price: number;
  projects_count?: number;
};

type Props = {
  services: Service[];
};

export default function Services({ services }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [filteredServices, setFilteredServices] = useState<Service[]>(services);

    // Derive categories from services
    const categories = ['All', ...new Set(services.map(service => {
        if (service.icon.includes('code') || service.icon.includes('computer')) return 'Development';
        if (service.icon.includes('layout') || service.icon.includes('smartphone')) return 'Design';
        if (service.icon.includes('bar-chart') || service.icon.includes('globe')) return 'Marketing';
        if (service.icon.includes('shield')) return 'Consulting';
        if (service.icon.includes('file-text')) return 'Content';
        return 'Other';
    }))];

    // Filter services based on search query and category
    useEffect(() => {
        let filtered = services;
        
        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(service =>
                service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        // Filter by category
        if (categoryFilter !== 'All') {
            filtered = filtered.filter(service => {
                if (categoryFilter === 'Development' && (service.icon.includes('code') || service.icon.includes('computer'))) return true;
                if (categoryFilter === 'Design' && (service.icon.includes('layout') || service.icon.includes('smartphone'))) return true;
                if (categoryFilter === 'Marketing' && (service.icon.includes('bar-chart') || service.icon.includes('globe'))) return true;
                if (categoryFilter === 'Consulting' && service.icon.includes('shield')) return true;
                if (categoryFilter === 'Content' && service.icon.includes('file-text')) return true;
                return categoryFilter === 'Other';
            });
        }
        
        setFilteredServices(filtered);
    }, [searchQuery, categoryFilter, services]);

    // Get the appropriate icon component
    const getIconComponent = (iconName: string) => {
        const key = iconName.replace('lucide-', '') as keyof typeof iconMap;
        return iconMap[key] || Code; // Default to Code if not found
    };

    return (
        <>
            <Head title="Professional Services - Portfolio" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center gap-4 mb-6">
                            <Link href="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Back to Home
                                </motion.button>
                            </Link>
                        </div>
                        <div className="text-center">
                            <span className="text-[#20B2AA] font-medium mb-2 inline-block">All Services</span>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Professional Services</h1>
                            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
                                Comprehensive digital solutions to help your business grow and succeed in the modern marketplace
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search Bar and Filters */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:w-auto md:min-w-[300px]">
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:bg-gray-800 dark:text-white"
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        </div>
                        
                        <div className="relative w-full md:w-auto">
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
                                <Filter className="w-5 h-5 text-gray-400" />
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="bg-transparent outline-none border-none text-gray-700 dark:text-gray-200 pr-8 appearance-none w-full"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="max-w-7xl mx-auto px-4 pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map((service) => {
                            const IconComponent = getIconComponent(service.icon);
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="p-8 flex-1">
                                        <div className="w-14 h-14 bg-[#E6F7F6] dark:bg-[#20B2AA]/20 rounded-2xl flex items-center justify-center mb-6">
                                            <IconComponent className="w-7 h-7 text-[#20B2AA]" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                                            {service.description}
                                        </p>
                                        <div className="mt-auto space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Starting at</span>
                                                <span className="text-[#20B2AA] font-medium">${service.starting_price}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-500 dark:text-gray-400">{service.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 px-8 bg-[#20B2AA] hover:bg-[#1a9994] text-white font-medium flex items-center justify-center gap-2 group transition-colors"
                                        >
                                            Learn More
                                            <motion.svg 
                                                className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </motion.svg>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Ready to Start Section */}
                <div className="bg-white dark:bg-gray-800 py-16">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Let's discuss how I can help bring your vision to life with professional, high-quality services
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-[#20B2AA] hover:bg-[#1a9994] text-white font-medium rounded-lg w-full sm:w-auto"
                            >
                                Get Started Today
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium rounded-lg hover:border-[#20B2AA] hover:text-[#20B2AA] w-full sm:w-auto"
                            >
                                View My Work
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 