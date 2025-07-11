import { Head } from '@inertiajs/react';
import { 
  Code, Layout, Smartphone, Database, ShoppingBag, Search, 
  Zap, CheckCircle, Clock, BarChart, Shield, Headphones,
  Activity, ArrowLeft, Download, FileText, Palette
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
  long_description?: string;
  icon: string;
  is_active: boolean;
  is_featured?: boolean;
  price: number;
  duration?: string;
  projects_count?: number;
  features: string[];
  technologies?: string[];
  image_url?: string;
  starting_price?: number;
}

// Define the content type
interface Content {
  page_title: string;
  page_description: string;
  benefits: Array<{
    text: string;
    icon: string;
  }>;
  work_process: {
    title: string;
    description: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    primary_text: string;
    secondary_text: string;
  };
}

// Define the props type
interface Props {
  services: Service[];
  content?: Content;
  profile?: {
    navbar_items?: Array<{
      title: string;
      href: string;
    }>;
    logo?: {
      text: string;
      type: string;
      icon: string;
      icon_type: string;
      color: string;
    };
  };
}

// Icon component mapping
const IconComponent = ({ icon, className = "w-6 h-6 text-[#20B2AA]" }: { icon: string, className?: string }) => {
    // Map icon string to Lucide component
    switch (icon.toLowerCase()) {
        case 'code':
            return <Code className={className} />;
        case 'layout':
            return <Layout className={className} />;
        case 'palette':
            return <Palette className={className} />;
        case 'smartphone':
            return <Smartphone className={className} />;
        case 'database':
            return <Database className={className} />;
        case 'shopping-bag':
        case 'shoppingbag':
            return <ShoppingBag className={className} />;
        case 'search':
            return <Search className={className} />;
        case 'activity':
        case 'Activity':
            return <Activity className={className} />;
        case 'shield':
            return <Shield className={className} />;
        case 'headphones':
            return <Headphones className={className} />;
        case 'file-text':
        case 'filetext':
        case 'FileText':
            return <FileText className={className} />;
        case 'bar-chart':
        case 'barchart':
            return <BarChart className={className} />;
        case 'zap':
            return <Zap className={className} />;
        default:
            return <Code className={className} />;
    }
};

export default function Services({ services, content, profile }: Props) {
    // Default navigation items (fallback)
    const defaultNavItems = [
        { title: 'Home', href: 'home' },
        { title: 'Services', href: 'services' },
        { title: 'Works', href: 'works' },
        { title: 'Skills', href: 'skills' },
        { title: 'Resume', href: 'resume' },
        { title: 'Testimonials', href: 'testimonials' },
        { title: 'Contact', href: 'contact' }
    ];

    // Use dynamic navigation from profile or fallback to default
    const navItems = profile?.navbar_items || defaultNavItems;

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
                            {navItems.map((navItem, index) => (
                                <NavigationMenuItem key={navItem.title}>
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                    {(() => {
                                        // Determine the href based on the navigation item
                                        let href = `/#${navItem.href}`;
                                        if (navItem.title === 'Home') {
                                            href = '/';
                                        } else if (navItem.title === 'Services') {
                                            href = '/services';
                                        } else if (navItem.title === 'Works' || navItem.title === 'Projects') {
                                            href = '/projects';
                                        } else if (navItem.title === 'Contact') {
                                            href = '/#contact';
                                        }

                                        // Determine if this is the active page
                                        const isActive = navItem.title === 'Services';

                                        return (
                                            <Link
                                                href={href}
                                                className={`text-sm font-medium cursor-pointer transition-colors relative group ${
                                                    isActive
                                                        ? 'text-[#20B2AA] hover:text-[#20B2AA] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#20B2AA] after:rounded-full'
                                                        : 'text-gray-600 dark:text-gray-300 hover:text-[#20B2AA]'
                                                }`}
                                            >
                                                {navItem.title}
                                            </Link>
                                        );
                                    })()}
                                    </motion.div>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/#contact">
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
                                href={route('home')}
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
                            {content?.page_title ? (
                                content.page_title.includes('Services') ? (
                                    <>
                                        {content.page_title.replace(' Services', '')} <span className="text-[#20B2AA]">Services</span>
                                    </>
                                ) : (
                                    content.page_title
                                )
                            ) : (
                                <>Professional <span className="text-[#20B2AA]">Services</span></>
                            )}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
                            {content?.page_description || 'Comprehensive digital solutions tailored to your business needs. From concept to deployment, I provide end-to-end services that drive results and exceed expectations.'}
                        </p>
                        
                        {/* Benefits */}
                        <div className="flex flex-wrap justify-center gap-8 mb-16">
                            {content?.benefits ? content.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <IconComponent icon={benefit.icon} className="w-5 h-5 text-[#20B2AA]" />
                                    <span className="text-sm font-medium dark:text-gray-200">{benefit.text}</span>
                                </div>
                            )) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>

                    {/* Services Grid - All services from database */}
                <div className="max-w-7xl mx-auto px-4 pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: service.id * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-700 transition-all duration-300 p-6 flex flex-col h-full group"
                            >
                                <div className="mb-6">
                                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 group-hover:from-teal-100 group-hover:to-teal-200 dark:group-hover:from-teal-800/30 dark:group-hover:to-teal-700/30 transition-all duration-300">
                                        <IconComponent icon={service.icon} className="w-6 h-6 text-[#20B2AA] group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">{service.title}</h2>
                                
                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="mb-6 flex-grow space-y-6">
                                    {/* Key Features Section */}
                                    {service.features && Array.isArray(service.features) && service.features.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
                                                <CheckCircle className="w-4 h-4 text-[#20B2AA] mr-2" />
                                                Key Features
                                            </h3>
                                            <ul className="space-y-2">
                                                {service.features.slice(0, 4).map((feature, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-[#20B2AA] mr-2 text-lg leading-none">•</span>
                                                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                                {service.features.length > 4 && (
                                                    <li className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                                                        +{service.features.length - 4} more features
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Technologies Section */}
                                    {service.technologies && Array.isArray(service.technologies) && service.technologies.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
                                                <Code className="w-4 h-4 text-[#20B2AA] mr-2" />
                                                Technologies
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {service.technologies.slice(0, 6).map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-xs rounded-md border border-teal-200 dark:border-teal-700"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {service.technologies.length > 6 && (
                                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                                                        +{service.technologies.length - 6}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex flex-col">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Starting at</p>
                                        <p className="text-2xl font-bold text-[#20B2AA] group-hover:text-teal-600 transition-colors duration-300">
                                            ${(service.starting_price || service.price).toLocaleString()}
                                        </p>
                                        {service.duration && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {service.duration}
                                            </p>
                                        )}
                                    </div>
                                    <Link
                                        href="/?section=contact"
                                        className="px-6 py-3 bg-gradient-to-r from-[#20B2AA] to-[#1a9994] text-white text-sm font-medium rounded-lg hover:from-[#1a9994] hover:to-[#158b80] transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Get Quote
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                    {/* Work Process Section */}
                    <div className="bg-[#0F172A] text-white py-16">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl font-bold mb-4 text-center">
                                {content?.work_process?.title || 'My Work Process'}
                            </h2>
                            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
                                {content?.work_process?.description || 'A systematic approach that ensures quality results and client satisfaction.'}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {(content?.work_process?.steps || workProcess).map((step, index) => (
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
                        <h2 className="text-3xl font-bold mb-4">
                            {content?.cta?.title || 'Ready to Start Your Project?'}
                        </h2>
                            <p className="text-white/80 max-w-2xl mx-auto mb-8">
                                {content?.cta?.description || 'Let us discuss your requirements and create something amazing together.'}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/?section=contact"
                                    className="px-6 py-3 bg-white text-[#20B2AA] font-medium rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    {content?.cta?.primary_text || 'Get Free Consultation'}
                                </Link>
                                <Link
                                    href="/projects"
                                    className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
                                >
                                    {content?.cta?.secondary_text || 'View Portfolio'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}