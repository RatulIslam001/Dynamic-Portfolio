import { Head } from '@inertiajs/react';
import { 
  Code, Layout, Smartphone, Database, ShoppingBag, Search, 
  Zap, CheckCircle, Clock, BarChart, Shield, Headphones,
  Activity, ArrowLeft, Download
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion } from 'framer-motion';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

// Define the service type
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
    is_active: boolean;
    price: number;
    features: string[];
}

// Define the props type
interface Props {
  services: Service[];
}

// Icon component mapping
const IconComponent = ({ icon, className = "w-6 h-6 text-[#20B2AA]" }: { icon: string, className?: string }) => {
    // Map icon string to Lucide component
    switch (icon.toLowerCase()) {
        case 'code':
            return <Code className={className} />;
        case 'layout':
            return <Layout className={className} />;
        case 'smartphone':
            return <Smartphone className={className} />;
        case 'database':
            return <Database className={className} />;
        case 'shopping-bag':
            return <ShoppingBag className={className} />;
        case 'search':
            return <Search className={className} />;
        case 'activity':
            return <Activity className={className} />;
        case 'shield':
            return <Shield className={className} />;
        case 'headphones':
            return <Headphones className={className} />;
        default:
            return <Code className={className} />;
    }
};

export default function Services({ services }: Props) {
    // Work process steps
    const workProcess = [
        {
            number: '01',
            title: 'Discovery',
            description: 'Understanding your requirements, goals, and target audience to create an optimal solution.'
        },
        {
            number: '02',
            title: 'Planning',
            description: 'Creating detailed project plans, wireframes, and technical specifications.'
        },
        {
            number: '03',
            title: 'Development',
            description: 'Building your solution using best practices and cutting-edge technologies.'
        },
        {
            number: '04',
            title: 'Testing',
            description: 'Rigorous testing across all devices and browsers to ensure quality and performance.'
        },
        {
            number: '05',
            title: 'Launch',
            description: 'Deploying your project and providing ongoing support and maintenance.'
        }
    ];

    return (
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
            <Head title="Services - Portfolio" />

            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                {/* Navigation */}
                <motion.nav 
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800"
                >
                    <div className="flex items-center gap-4">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 cursor-pointer" 
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#20B2AA] rounded-full flex items-center justify-center text-white font-bold">
                                    P
                                </div>
                                <span className="font-medium text-base">Portfolio</span>
                            </Link>
                        </motion.div>
                    </div>

                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-8">
                            {['Home', 'Services', 'Works', 'Skills', 'Resume', 'Testimonials', 'Contact'].map((item, index) => (
                                <NavigationMenuItem key={item}>
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                    {item === 'Services' ? (
                                        <Link
                                            href="/services"
                                            className="text-sm font-medium cursor-pointer text-[#20B2AA] hover:text-[#20B2AA] transition-colors relative group after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#20B2AA] after:rounded-full"
                                        >
                                            {item}
                                        </Link>
                                    ) : item === 'Home' ? (
                                        <Link
                                            href="/"
                                            className="text-sm font-medium cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] transition-colors relative group"
                                        >
                                            {item}
                                        </Link>
                                    ) : item === 'Contact' ? (
                                        <Link
                                            href="/contact"
                                            className="text-sm font-medium cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] transition-colors relative group"
                                        >
                                            {item}
                                        </Link>
                                    ) : item === 'Works' ? (
                                        <Link
                                            href="/projects"
                                            className="text-sm font-medium cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] transition-colors relative group"
                                        >
                                            {item}
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`/#${item.toLowerCase()}`}
                                            className="text-sm font-medium cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] transition-colors relative group"
                                        >
                                            {item}
                                        </Link>
                                    )}
                                    </motion.div>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/contact">
                                <Button className="bg-[#20B2AA] hover:bg-[#1a9994] text-white px-6 py-2.5 text-sm">
                                    Hire Me
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.nav>
                
                {/* Content with padding to account for fixed navbar */}
                <div className="pt-24">
                    {/* Back to Home Button */}
                    <div className="max-w-7xl mx-auto px-4 mb-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block"
                        >
                            <Link 
                                href="/" 
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] dark:hover:text-[#20B2AA] transition-colors group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm font-medium">Back to Home</span>
                            </Link>
                        </motion.div>
                    </div>
                    
                    {/* Header Section */}
                    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                            Professional <span className="text-[#20B2AA]">Services</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
                            Comprehensive digital solutions tailored to your business needs. From concept to deployment, I provide 
                            end-to-end services that drive results and exceed expectations.
                        </p>
                        
                        {/* Benefits */}
                        <div className="flex flex-wrap justify-center gap-8 mb-16">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-[#20B2AA]" />
                                <span className="text-sm font-medium dark:text-gray-200">Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#20B2AA]" />
                                <span className="text-sm font-medium dark:text-gray-200">Quality Guaranteed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#20B2AA]" />
                                <span className="text-sm font-medium dark:text-gray-200">24/7 Support</span>
                        </div>
                    </div>
                </div>

                    {/* Services Grid - All services from database */}
                <div className="max-w-7xl mx-auto px-4 pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <div 
                                    key={service.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col"
                                >
                                        <div className="mb-4">
                                        <IconComponent icon={service.icon} className="w-6 h-6 text-[#20B2AA]" />
                                        </div>
                                        
                                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h2>
                                        
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                                            {service.description}
                                        </p>
                                        
                                        <div className="mb-6">
                                        <h3 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200">Key Features:</h3>
                                        <ul className="space-y-1">
                                            {service.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-[#20B2AA] mr-2">•</span>
                                                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                            </div>
                                    
                                    <div className="flex items-center justify-between mt-auto">
                                            <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Starting at</p>
                                            <p className="text-[#20B2AA] font-medium">
                                                ${service.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <Link 
                                            href="/?section=contact"
                                            className="px-4 py-2 bg-[#20B2AA] text-white text-sm rounded-md hover:bg-[#1a9994] transition-colors"
                                        >
                                            Get Quote
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                                        </div>
                                        
                    {/* Work Process Section */}
                    <div className="bg-[#0F172A] text-white py-16">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl font-bold mb-4 text-center">My Work Process</h2>
                            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
                                A systematic approach that ensures quality results and client satisfaction.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {workProcess.map((step, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-12 h-12 rounded-full bg-[#20B2AA] flex items-center justify-center mx-auto mb-4">
                                            <span className="font-bold">{step.number}</span>
                                        </div>
                                        <h3 className="font-bold mb-2">{step.title}</h3>
                                        <p className="text-gray-300 text-sm">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                </div>

                    {/* CTA Section */}
                    <div className="bg-[#20B2AA] text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
                            <p className="text-white/80 max-w-2xl mx-auto mb-8">
                                Let's discuss your requirements and create something amazing together.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link 
                                    href="/?section=contact"
                                    className="px-6 py-3 bg-white text-[#20B2AA] font-medium rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    Get Free Consultation
                                </Link>
                                <Link 
                                    href="/projects"
                                    className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
                                >
                                    View Portfolio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
} 