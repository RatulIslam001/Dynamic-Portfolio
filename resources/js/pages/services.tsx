import { Head } from '@inertiajs/react';
import { 
  Code, Layout, Smartphone, Database, ShoppingBag, Search, 
  Zap, CheckCircle, Clock, BarChart, Shield, Headphones,
  Activity, ArrowLeft
} from 'lucide-react';
import { Link } from '@inertiajs/react';

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
        <>
            <Head title="Services - Portfolio" />

            <div className="min-h-screen bg-white">
                {/* Back to Home Button */}
                <div className="max-w-7xl mx-auto px-4 pt-6">
                    <Link 
                        href="/" 
                        className="inline-flex items-center text-[#20B2AA] hover:text-[#1a9994] transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                                    Back to Home
                            </Link>
                        </div>
                
                {/* Header Section */}
                <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                    <h1 className="text-4xl font-bold mb-2">
                        Professional <span className="text-[#20B2AA]">Services</span>
                    </h1>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-10">
                        Comprehensive digital solutions tailored to your business needs. From concept to deployment, I provide 
                        end-to-end services that drive results and exceed expectations.
                    </p>
                    
                    {/* Benefits */}
                    <div className="flex flex-wrap justify-center gap-8 mb-16">
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[#20B2AA]" />
                            <span className="text-sm font-medium">Fast Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-[#20B2AA]" />
                            <span className="text-sm font-medium">Quality Guaranteed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[#20B2AA]" />
                            <span className="text-sm font-medium">24/7 Support</span>
                        </div>
                    </div>
                </div>

                {/* Services Grid - All services from database */}
                <div className="max-w-7xl mx-auto px-4 pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div 
                                    key={service.id}
                                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col"
                                >
                                        <div className="mb-4">
                                    <IconComponent icon={service.icon} />
                                        </div>
                                        
                                <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                                        
                                <p className="text-gray-600 mb-6 text-sm">
                                            {service.description}
                                        </p>
                                        
                                        <div className="mb-6">
                                    <h3 className="text-sm font-semibold mb-3">Key Features:</h3>
                                    <ul className="space-y-1">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-[#20B2AA] mr-2">•</span>
                                                <span className="text-gray-700 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                            </div>
                                
                                <div className="flex items-center justify-between mt-auto">
                                            <div>
                                        <p className="text-xs text-gray-500">Starting at</p>
                                        <p className="text-[#20B2AA] font-medium">
                                            ${service.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#20B2AA] text-white text-sm rounded-md hover:bg-[#1a9994] transition-colors">
                                        Get Quote
                                    </button>
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
                                href="/contact"
                                className="px-6 py-3 bg-white text-[#20B2AA] font-medium rounded-md hover:bg-gray-100 transition-colors"
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
                
                {/* Footer */}
                <div className="bg-[#0F172A] text-white py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-[#20B2AA] flex items-center justify-center">
                                        <span className="font-bold text-sm">P</span>
                                    </div>
                                    <span className="font-bold">Portfolio</span>
                                </div>
                                <p className="text-gray-300 text-sm mb-4">
                                    Creating exceptional digital experiences through innovative 
                                    design and development. Let's work together to bring your 
                                    ideas to life.
                                </p>
                                <div className="flex gap-3">
                                    <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                        <span className="sr-only">Facebook</span>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                        <span className="sr-only">GitHub</span>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="font-bold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                                    <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
                                    <li><Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link></li>
                                    <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-bold mb-4">Contact Info</h3>
                                <p className="text-gray-300 text-sm mb-2">hello@portfolio.com</p>
                                <p className="text-gray-300 text-sm mb-2">+1 (555) 123-4567</p>
                                <p className="text-gray-300 text-sm">New York, NY</p>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">© 2023 Portfolio. All rights reserved.</p>
                            <div className="flex gap-4 mt-4 md:mt-0">
                                <Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</Link>
                                <Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 