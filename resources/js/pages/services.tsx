import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Code, Layout, Smartphone, BarChart3, FileText, Globe, Clock } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Services() {
    const [searchQuery, setSearchQuery] = useState('');

    // Dummy services data (will be replaced with database data later)
    const services = [
        {
            id: 1,
            title: "Web Development",
            description: "Creating responsive, fast, and user-friendly websites using modern technologies and best practices.",
            icon: Code,
            duration: "2-6 weeks",
            startingPrice: 2500
        },
        {
            id: 2,
            title: "UI/UX Design",
            description: "Designing intuitive and beautiful user interfaces that provide exceptional user experiences.",
            icon: Layout,
            duration: "1-4 weeks",
            startingPrice: 1500
        },
        {
            id: 3,
            title: "Mobile Development",
            description: "Building cross-platform mobile applications that work seamlessly on iOS and Android devices.",
            icon: Smartphone,
            duration: "4-12 weeks",
            startingPrice: 4000
        },
        {
            id: 4,
            title: "SEO Optimization",
            description: "Improving your website's visibility in search engines to drive more organic traffic.",
            icon: Globe,
            duration: "Ongoing",
            startingPrice: 800
        },
        {
            id: 5,
            title: "Digital Marketing",
            description: "Creating and implementing effective digital marketing strategies to grow your business.",
            icon: BarChart3,
            duration: "Ongoing",
            startingPrice: 1300
        },
        {
            id: 6,
            title: "Content Creation",
            description: "Producing high-quality content that engages your audience and drives conversions.",
            icon: FileText,
            duration: "1-2 weeks",
            startingPrice: 800
        }
    ];

    // Filter services based on search query
    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Professional Services - Portfolio" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 py-6">
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
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Professional Services</h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl">
                            Comprehensive digital solutions to help your business grow and succeed in the modern marketplace
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="relative max-w-xl">
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:bg-gray-800 dark:text-white"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* Services Grid */}
                <div className="max-w-7xl mx-auto px-4 pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map((service) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                <div className="p-8">
                                    <div className="w-14 h-14 bg-[#E6F7F6] dark:bg-[#20B2AA]/20 rounded-2xl flex items-center justify-center mb-6">
                                        <service.icon className="w-7 h-7 text-[#20B2AA]" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                                        {service.description}
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Starting at</span>
                                            <span className="text-[#20B2AA] font-medium">${service.startingPrice}</span>
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
                                        className="w-full py-4 px-8 bg-gradient-to-r from-[#20B2AA] to-[#1a9994] hover:from-[#1a9994] hover:to-[#20B2AA] text-white font-medium flex items-center justify-center gap-2 group"
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
                        ))}
                    </div>
                </div>

                {/* Ready to Start Section */}
                <div className="bg-white dark:bg-gray-800 py-16">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Let's discuss how I can help bring your vision to life with professional, high-quality services
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-[#20B2AA] hover:bg-[#1a9994] text-white font-medium rounded-lg"
                            >
                                Get Started Today
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium rounded-lg hover:border-[#20B2AA] hover:text-[#20B2AA]"
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