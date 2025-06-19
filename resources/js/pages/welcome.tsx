import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Twitter, Code, Smartphone, Search, BarChart3, FileText, Briefcase, GraduationCap, Mail, Phone, MapPin, ArrowRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { ProgressBar } from '@/components/ui/progress-bar';
import { SkillCard } from '@/components/ui/skill-card';
import { TimelineItem } from '@/components/ui/timeline-item';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { ContactCard } from '@/components/ui/contact-card';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { ThemeToggle } from '@/components/theme-toggle';
import { ThemeProvider } from '@/components/theme-provider';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from '@inertiajs/react';
import { ProjectCard } from '@/components/ui/project-card';
import { ActionButton } from '@/components/ui/action-button';
import { MobileMenu } from '@/components/ui/mobile-menu';
import { IconComponent } from '@/components/IconComponent';

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    price: number;
    features: string[];
    is_active: boolean;
}

interface Project {
    id: number;
    title: string;
    description: string;
    image: string | null;
    category: string;
    technologies: string[];
}

interface ProfileData {
    full_name: string;
    title: string;
    about: string;
    years_experience: number;
    projects_completed: number;
    is_available: boolean;
    cta_text: string;
    cta_secondary_text: string;
    cta_url: string;
    cta_secondary_url: string;
    avatar: string;
    social: {
        github: string | null;
        twitter: string | null;
        linkedin: string | null;
    };
    contact: {
        email: string;
        phone: string;
        location: string;
    };
}

interface Props {
    services: Service[];
    projects: Project[];
    profile: ProfileData | null;
}

export default function Welcome({ services, projects, profile }: Props) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Default values in case profile data is not available
    const defaultTitle = 'Creative Designer & Developer';
    const defaultAbout = 'I create exceptional digital experiences that solve complex problems and connect people through elegant, user-focused design.';
    const defaultCtaText = 'View Work';
    const defaultCtaSecondaryText = 'Download CV';
    const defaultCtaUrl = '#works';
    const defaultCtaSecondaryUrl = '#';
    const defaultIsAvailable = true;
    
    const yearsExperience = profile?.years_experience ?? 5;
    const projectsCompleted = profile?.projects_completed ?? 50;
    const isAvailable = profile?.is_available ?? defaultIsAvailable;
    const title = profile?.title ?? defaultTitle;
    const about = profile?.about ?? defaultAbout;
    const ctaText = profile?.cta_text ?? defaultCtaText;
    const ctaSecondaryText = profile?.cta_secondary_text ?? defaultCtaSecondaryText;
    const ctaUrl = profile?.cta_url ?? defaultCtaUrl;
    const ctaSecondaryUrl = profile?.cta_secondary_url ?? defaultCtaSecondaryUrl;
    const avatarUrl = profile?.avatar ?? '/images/Profile.png';
    const githubUrl = profile?.social?.github ?? 'https://github.com';
    const twitterUrl = profile?.social?.twitter ?? 'https://twitter.com';
    const linkedinUrl = profile?.social?.linkedin ?? 'https://linkedin.com';

    // Filter projects based on active filter
    const filteredProjects = activeFilter === 'All' 
        ? projects 
        : projects.filter(project => project.category === activeFilter);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out',
        });
    }, []);
    
    // Handle URL query parameters for section scrolling
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const section = queryParams.get('section');
        
        if (section) {
            const element = document.getElementById(section);
            if (element) {
                scroll.scrollTo(element.offsetTop - 100, {
                    duration: 800,
                    smooth: true,
                });
                
                // Clean the URL after scrolling (remove the query parameter)
                setTimeout(() => {
                    window.history.replaceState({}, document.title, window.location.pathname);
                }, 1000);
            }
        }
    }, []);

    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: true
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
            <Head title="Portfolio - Creative Designer & Developer">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                {/* Navigation */}
                <motion.nav 
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800"
                >
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 cursor-pointer" 
                        onClick={scrollToTop}
                    >
                        <div className="w-8 h-8 bg-[#20B2AA] rounded-full flex items-center justify-center text-white font-bold">
                            P
                        </div>
                        <span className="font-medium text-base">Portfolio</span>
                    </motion.div>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <div className="hidden md:block">
                    <NavigationMenu>
                            <NavigationMenuList className="flex gap-4 lg:gap-8">
                            {['Home', 'Services', 'Works', 'Skills', 'Resume', 'Testimonials', 'Contact'].map((item, index) => (
                                <NavigationMenuItem key={item}>
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                    <ScrollLink
                                        to={item.toLowerCase()}
                                        spy={true}
                                        smooth={true}
                                        offset={-100}
                                        duration={500}
                                        className="text-sm font-medium cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] transition-colors relative group"
                                        activeClass="!text-[#20B2AA] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#20B2AA] after:rounded-full"
                                    >
                                        {item}
                                    </ScrollLink>
                                    </motion.div>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        
                        {/* Desktop Hire Me Button - Hidden on mobile */}
                        <div className="hidden md:block">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <ScrollLink
                            to="contact"
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={500}
                            className="cursor-pointer"
                        >
                            <Button className="bg-[#20B2AA] hover:bg-[#1a9994] text-white px-6 py-2.5 text-sm">
                                Hire Me
                            </Button>
                        </ScrollLink>
                        </motion.div>
                        </div>
                        
                        {/* Mobile Menu Button - Visible only on mobile */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                        >
                            <Menu className="w-6 h-6" />
                        </motion.button>
                    </div>
                </motion.nav>
                
                {/* Mobile Menu */}
                <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

                {/* Hero Section */}
                <motion.section 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="min-h-[100vh] flex items-center justify-center mt-16 xs:mt-20 sm:mt-20 md:mt-10 px-3 xs:px-4 pb-10 sm:pb-10 md:pb-10 max-w-7xl mx-auto relative overflow-hidden"
                    id="home"
                >
                    {/* Background gradient effects */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-20 left-10 sm:left-20 w-36 xs:w-48 sm:w-72 h-36 xs:h-48 sm:h-72 bg-[#20B2AA]/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-10 sm:right-20 w-40 xs:w-56 sm:w-96 h-40 xs:h-56 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-16 items-center relative w-full">
                        {/* Image Content - Order 1 on mobile (appears above text) */}
                        <div className="relative order-1 lg:order-2 w-full mt-0">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-full h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] bg-[#7a261a] rounded-2xl xs:rounded-3xl overflow-hidden relative backdrop-blur-sm border border-orange-800/30 mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full"
                            >
                                {/* Profile image */}
                                <img 
                                    src={avatarUrl} 
                                    alt="Profile"
                                    className="w-full h-full object-contain object-center z-10 relative"
                                />
                                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                            </motion.div>
                            
                            {/* Stats cards - Positioned for responsive layout */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="absolute top-5 xs:top-6 right-5 md:top-8 md:right-8 bg-white dark:bg-gray-800 rounded-xl xs:rounded-2xl shadow-lg dark:shadow-gray-900/50 px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 flex items-center gap-2 xs:gap-3 sm:gap-4 z-20 max-w-[170px] sm:max-w-[250px] border border-gray-100 dark:border-gray-700"
                            >
                                <div className="w-6 xs:w-8 sm:w-10 h-6 xs:h-8 sm:h-10 rounded-full bg-[#E6F7F6] dark:bg-[#20B2AA]/20 flex items-center justify-center flex-shrink-0">
                                    <motion.span 
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-[#20B2AA] text-base xs:text-lg sm:text-xl"
                                    >
                                        ✓
                                    </motion.span>
                                </div>
                                <div className="min-w-0">
                                    <div className="font-semibold text-sm xs:text-base sm:text-lg text-gray-900 dark:text-white truncate">{projectsCompleted}+ Projects</div>
                                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">Completed</div>
                                </div>
                            </motion.div>
                            
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="absolute bottom-5 xs:bottom-6 left-5 md:bottom-8 md:left-8 bg-white dark:bg-gray-800 rounded-xl xs:rounded-2xl shadow-lg dark:shadow-gray-900/50 px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 flex items-center gap-2 xs:gap-3 sm:gap-4 z-20 border border-gray-100 dark:border-gray-700"
                            >
                                <div className="w-6 xs:w-8 sm:w-10 h-6 xs:h-8 sm:h-10 rounded-full bg-[#E6F7F6] dark:bg-[#20B2AA]/20 flex items-center justify-center">
                                    <motion.span 
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="text-[#20B2AA] text-base xs:text-lg sm:text-xl"
                                    >
                                        ★
                                    </motion.span>
                                </div>
                                <div>
                                    <div className="font-semibold text-sm xs:text-base sm:text-lg text-gray-900 dark:text-white">{yearsExperience} Years</div>
                                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Experience</div>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Text Content - Order 2 on mobile (appears below image) */}
                        <motion.div variants={containerVariants} className="lg:order-1 order-2 w-full mt-4 xs:mt-6 sm:mt-0 flex flex-col items-center lg:items-start">
                            <motion.div 
                                variants={itemVariants}
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6F7F6] text-[#20B2AA] text-xs xs:text-sm mb-4 xs:mb-5 sm:mb-6 ${!isAvailable ? 'opacity-0' : ''}`}
                            >
                                <span className="w-2 h-2 rounded-full bg-[#20B2AA] animate-pulse"></span>
                                Available for work
                            </motion.div>

                            <motion.h1 
                                variants={itemVariants}
                                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-2 xs:mb-3 sm:mb-6 text-center lg:text-left"
                                dangerouslySetInnerHTML={{ __html: formatTitle(title) }}
                            />

                            <motion.p 
                                variants={itemVariants}
                                className="text-gray-600 dark:text-gray-300 text-sm xs:text-base sm:text-lg mb-3 xs:mb-4 sm:mb-8 max-w-xl text-center lg:text-left mx-auto lg:mx-0"
                            >
                                {about}
                            </motion.p>

                            <motion.div 
                                variants={itemVariants}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6 xs:mb-8 sm:mb-12 w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto lg:mx-0"
                            >
                                <div className="w-full xs:w-[48%] sm:w-auto">
                                    <ActionButton 
                                        href={ctaUrl} 
                                        className="relative z-10 shadow-lg shadow-[#20B2AA]/15 hover:shadow-xl hover:shadow-[#20B2AA]/25 transition-all duration-300 font-medium w-full text-center flex justify-center items-center text-sm sm:text-base py-3 px-6 sm:px-8"
                                        fullWidth
                                    >
                                        <span className="block">{ctaText}</span>
                                </ActionButton>
                                </div>
                                <div className="w-full xs:w-[48%] sm:w-auto">
                                <ActionButton 
                                    variant="outline" 
                                    icon={false}
                                    href={ctaSecondaryUrl}
                                        className="group relative z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#20B2AA] shadow-sm hover:shadow-md transition-all duration-300 text-gray-800 dark:text-gray-200 hover:text-[#20B2AA] rounded-md w-full text-center flex justify-center items-center text-sm sm:text-base py-3 px-6 sm:px-8"
                                        fullWidth
                                >
                                        <Download className="w-4 sm:w-5 h-4 sm:h-5 mr-1.5 sm:mr-2 text-gray-600 dark:text-gray-400 group-hover:text-[#20B2AA] transition-colors flex-shrink-0" />
                                        <span className="block">{ctaSecondaryText}</span>
                                </ActionButton>
                                </div>
                            </motion.div>

                            <motion.div 
                                variants={itemVariants}
                                className="flex items-center gap-4 justify-center mt-3 xs:mt-4"
                            >
                                <motion.a
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-8 xs:w-10 h-8 xs:h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                                >
                                    <Github className="w-4 xs:w-5 h-4 xs:h-5 text-gray-600 dark:text-gray-300 group-hover:text-[#20B2AA] transition-colors duration-300" />
                                </motion.a>
                                <motion.a
                                    href={twitterUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-8 xs:w-10 h-8 xs:h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                                >
                                    <Twitter className="w-4 xs:w-5 h-4 xs:h-5 text-gray-600 dark:text-gray-300 group-hover:text-[#20B2AA] transition-colors duration-300" />
                                </motion.a>
                                <motion.a
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-8 xs:w-10 h-8 xs:h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                                >
                                    <Linkedin className="w-4 xs:w-5 h-4 xs:h-5 text-gray-600 dark:text-gray-300 group-hover:text-[#20B2AA] transition-colors duration-300" />
                                </motion.a>
                            </motion.div>
                        </motion.div>
                        </div>
                </motion.section>

                {/* Services Section */}
                <section className="py-20 sm:py-24 md:py-32 px-4 bg-white dark:bg-gray-900 relative overflow-hidden" id="services">
                    {/* Subtle background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-900/30 opacity-50"></div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16 md:mb-24"
                        >
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium text-xs sm:text-sm inline-block px-3 sm:px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-3 sm:mb-4"
                            >
                                Professional Services
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-3xl sm:text-4xl font-bold mt-2 sm:mt-3 mb-3 sm:mb-5"
                            >
                                Areas of Expertise
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-2"
                            >
                                Delivering tailored, high-quality solutions to help your business thrive in the digital landscape
                            </motion.p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {services.map((service, index) => {
                                // Assign colors based on index
                                const colors = ["#20B2AA", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"];
                                const color = colors[index % colors.length];
                                
                                return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 group relative overflow-hidden h-auto sm:h-[260px] md:h-[280px] flex flex-col"
                                    >
                                        {/* Top accent line with color */}
                                        <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
                                            <motion.div 
                                                initial={{ width: "0%" }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                                                className="absolute top-0 left-0 h-full" 
                                                style={{ backgroundColor: color }}
                                            ></motion.div>
                                        </div>
                                        
                                        <div className="relative flex-1">
                                            <motion.div 
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 sm:mb-6"
                                                style={{ backgroundColor: `${color}10` }}
                                            >
                                                <IconComponent icon={service.icon} className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: color }} />
                                            </motion.div>
                                            <motion.h3 
                                                initial={{ x: -20, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                                                className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-[#20B2AA] transition-colors duration-300"
                                            >
                                                {service.title}
                                            </motion.h3>
                                            <motion.p 
                                                initial={{ x: -20, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                                                className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                                            >
                                                {service.description}
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )})}
                        </div>

                        {/* View All Services Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex justify-center mt-10 sm:mt-16"
                        >
                            <div className="relative w-full sm:w-auto">
                                <ActionButton 
                                    href="/services" 
                                    variant="minimal" 
                                    icon={false}
                                    className="font-medium text-[#20B2AA] bg-white dark:bg-transparent hover:text-[#1a9994] border border-[#20B2AA]/20 hover:border-[#20B2AA]/60 px-8 py-2.5 rounded-full hover:bg-[#E6F7F6]/50 transition-all shadow-sm hover:shadow-md backdrop-blur-sm overflow-hidden group w-full sm:w-auto text-[15px]"
                                    fullWidth={true}
                                >
                                    <span className="relative z-10">Explore All Services</span>
                                    <motion.span 
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "0%" }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute inset-0 bg-gradient-to-r from-[#E6F7F6]/80 to-transparent z-0"
                                    ></motion.span>
                                </ActionButton>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Projects Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 dark:bg-gray-900" 
                    id="works"
                >
                    <div className="max-w-7xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12 sm:mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium inline-block px-3 sm:px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-3 sm:mb-4 text-xs sm:text-sm"
                            >
                                Portfolio
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-3xl sm:text-4xl font-bold mt-2 sm:mt-4 mb-3 sm:mb-6"
                            >
                                Featured Projects
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg px-2"
                            >
                                Explore my latest work and see how I've helped clients achieve their goals
                            </motion.p>
                        </motion.div>

                        {/* Filter Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
                        >
                            {/* All projects button */}
                                <motion.button
                                key="All"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveFilter('All')}
                                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeFilter === 'All' 
                                            ? 'bg-[#20B2AA] text-white' 
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                All
                            </motion.button>

                            {/* Predefined categories for better UI and organization */}
                            {['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding'].map((category) => (
                                <motion.button
                                    key={category}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveFilter(category)}
                                    className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        activeFilter === category 
                                            ? 'bg-[#20B2AA] text-white' 
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    {category}
                                </motion.button>
                            ))}
                            
                            {/* Show any additional unique categories from database that aren't in the predefined list */}
                            {[...new Set(projects.map(project => project.category))]
                                .filter(category => !['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding'].includes(category))
                                .map((category) => (
                                    <motion.button
                                        key={category}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveFilter(category)}
                                        className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                            activeFilter === category 
                                                ? 'bg-[#20B2AA] text-white' 
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        {category}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Projects Grid */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                        >
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    id={project.id}
                                    title={project.title}
                                    description={project.description}
                                    category={project.category}
                                    image={project.image}
                                />
                            ))}
                        </motion.div>

                        {/* View All Projects Button */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex justify-center mt-10 sm:mt-16 mb-6"
                        >
                            <div className="relative w-full sm:w-auto">
                                <Link href={route('projects')}>
                                <ActionButton 
                                    variant="minimal" 
                                    icon={false}
                                    className="font-medium text-[#20B2AA] bg-white dark:bg-transparent hover:text-[#1a9994] border border-[#20B2AA]/20 hover:border-[#20B2AA]/60 px-8 py-2.5 rounded-full hover:bg-[#E6F7F6]/50 transition-all shadow-sm hover:shadow-md backdrop-blur-sm overflow-hidden group w-full sm:w-auto text-[15px]"
                                    fullWidth={true}
                                >
                                    <span className="relative z-10">Explore All Projects</span>
                                    <motion.span 
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "0%" }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute inset-0 bg-gradient-to-r from-[#E6F7F6]/80 to-transparent z-0"
                                    ></motion.span>
                                </ActionButton>
                                </Link>
                            </div>
                        </motion.div>
                        </div>
                </motion.section>

                {/* Technical Proficiency Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden" 
                    id="skills"
                >
                    {/* Background Elements */}
                    <div className="absolute inset-0 opacity-30 dark:opacity-10">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute top-20 right-20 w-24 sm:w-40 h-24 sm:h-40 border-2 border-[#20B2AA] rounded-full"
                        />
                        <motion.div
                            animate={{
                                rotate: [360, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute bottom-40 left-20 w-20 sm:w-32 h-20 sm:h-32 border-2 border-purple-500 rounded-lg transform rotate-45"
                        />
                        </div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12 sm:mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium inline-block px-3 sm:px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-3 sm:mb-4 text-xs sm:text-sm"
                            >
                                Skills
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-3xl sm:text-4xl font-bold mt-2 sm:mt-4 mb-3 sm:mb-6"
                            >
                                Technical Proficiency
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg px-2"
                            >
                                I've spent years honing my skills in various technologies and design principles
                            </motion.p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                            {/* Left Column - Skill Bars */}
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-6 sm:space-y-8"
                            >
                                {[
                                    { label: "HTML/CSS", percentage: 95 },
                                    { label: "JavaScript", percentage: 90 },
                                    { label: "React", percentage: 85 },
                                    { label: "Next.js", percentage: 80 },
                                    { label: "UI/UX Design", percentage: 85 }
                                ].map((skill, index) => (
                                    <motion.div
                                        key={skill.label}
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <ProgressBar label={skill.label} percentage={skill.percentage} />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Right Column - Skill Cards */}
                            <motion.div 
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-4 lg:mt-0"
                            >
                                {[
                                    { skill: "Node.js", percentage: 75 },
                                    { skill: "TypeScript", percentage: 85 },
                                    { skill: "Figma", percentage: 90 },
                                    { skill: "GraphQL", percentage: 75 },
                                    { skill: "Responsive Design", percentage: 95 },
                                    { skill: "Git", percentage: 80 }
                                ].map((skill, index) => (
                                    <motion.div
                                        key={skill.skill}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <SkillCard skill={skill.skill} percentage={skill.percentage} />
                                    </motion.div>
                                ))}
                            </motion.div>
                            </div>
                        </div>
                </motion.section>

                {/* Experience & Education Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="py-20 sm:py-24 px-4 sm:px-6 dark:bg-gray-900 relative overflow-hidden" 
                    id="resume"
                >
                    {/* Background Elements */}
                    <div className="absolute inset-0">
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-20 left-10 sm:left-20 w-48 sm:w-64 h-48 sm:h-64 bg-[#20B2AA]/5 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{
                                y: [0, 20, 0],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute bottom-20 right-10 sm:right-20 w-56 sm:w-96 h-56 sm:h-96 bg-purple-500/5 rounded-full blur-3xl"
                        />
                        </div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12 sm:mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium inline-block px-3 sm:px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-3 sm:mb-4 text-xs sm:text-sm"
                            >
                                Resume
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-3xl sm:text-4xl font-bold mt-2 sm:mt-4 mb-3 sm:mb-6"
                            >
                                Experience & Education
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg px-2"
                            >
                                My professional journey and academic background
                            </motion.p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Experience Column */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="flex items-center gap-3 mb-8 sm:mb-12"
                                >
                                    <motion.div 
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center"
                                    >
                                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#20B2AA]" />
                                    </motion.div>
                                    <h3 className="text-xl sm:text-2xl font-semibold">Experience</h3>
                                </motion.div>

                                <div className="space-y-6">
                                    {[
                                        {
                                            period: "2020 - Present",
                                            title: "Senior Web Developer",
                                            organization: "Tech Solutions Inc.",
                                            description: "Leading web development projects and mentoring junior developers."
                                        },
                                        {
                                            period: "2018 - 2020",
                                            title: "Frontend Developer",
                                            organization: "Digital Creations",
                                            description: "Developed responsive websites and web applications using React."
                                        },
                                        {
                                            period: "2016 - 2018",
                                            title: "UI/UX Designer",
                                            organization: "Creative Studio",
                                            description: "Designed user interfaces and experiences for web and mobile applications."
                                        }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, x: -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <TimelineItem {...item} />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Education Column */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="mt-8 lg:mt-0"
                            >
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="flex items-center gap-3 mb-8 sm:mb-12"
                                >
                                    <motion.div 
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center"
                                    >
                                        <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#20B2AA]" />
                                    </motion.div>
                                    <h3 className="text-xl sm:text-2xl font-semibold">Education</h3>
                                </motion.div>

                                <div className="space-y-6">
                                    {[
                                        {
                                            period: "2014 - 2016",
                                            title: "Master's in Computer Science",
                                            organization: "Tech University",
                                            description: "Specialized in web technologies and user interface design."
                                        },
                                        {
                                            period: "2010 - 2014",
                                            title: "Bachelor's in Computer Science",
                                            organization: "State University",
                                            description: "Focused on software development and design principles."
                                        },
                                        {
                                            period: "2008 - 2010",
                                            title: "Associate's in Graphic Design",
                                            organization: "Design Institute",
                                            description: "Studied visual communication and digital design fundamentals."
                                        }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, x: 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <TimelineItem {...item} />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Download Resume Button */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex justify-center mt-10 sm:mt-16"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#20B2AA] hover:bg-[#1a9994] text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base inline-flex items-center gap-2 rounded-xl group relative overflow-hidden cursor-pointer w-full sm:w-auto justify-center sm:justify-start"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                                Download Full Resume
                                </span>
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                            </motion.button>
                        </motion.div>
                        </div>
                </motion.section>

                {/* Testimonials Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden" 
                    id="testimonials"
                >
                    {/* Animated background elements */}
                    <div className="absolute inset-0">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-20 left-10 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#20B2AA]/10 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.1, 0.15, 0.1],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                            className="absolute bottom-20 right-10 sm:right-20 w-64 sm:w-[30rem] h-64 sm:h-[30rem] bg-purple-500/10 rounded-full blur-3xl"
                        />
                        </div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12 sm:mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium inline-block px-3 sm:px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-3 sm:mb-4 text-xs sm:text-sm"
                            >
                                Testimonials
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-3xl sm:text-4xl font-bold mt-2 sm:mt-4 mb-3 sm:mb-6"
                            >
                                What Clients Say
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg px-2"
                            >
                                Feedback from clients who have experienced working with me
                            </motion.p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                        >
                            {[
                                {
                                    quote: "Working with this developer was an absolute pleasure. They delivered our project on time and exceeded our expectations in every way.",
                                    name: "Sarah Johnson",
                                    role: "CEO",
                                    company: "TechStart",
                                    delay: 0
                                },
                                {
                                    quote: "The attention to detail and creative solutions provided made our website stand out from competitors. Highly recommended!",
                                    name: "Michael Chen",
                                    role: "Marketing Director",
                                    company: "GrowthLabs",
                                    delay: 0.2
                                },
                                {
                                    quote: "Exceptional work ethic and communication throughout the project. The final product was exactly what we envisioned and more.",
                                    name: "Emily Rodriguez",
                                    role: "Founder",
                                    company: "DesignHub",
                                    delay: 0.4
                                }
                            ].map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: testimonial.delay }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="relative"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 relative overflow-hidden group h-full"
                                    >
                                        {/* Decorative elements */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#20B2AA] to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: testimonial.delay + 0.2 }}
                                            className="mb-4 sm:mb-6"
                                        >
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#20B2AA] opacity-80" fill="currentColor" viewBox="0 0 32 32">
                                                <path d="M10 8c-3.314 0-6 2.686-6 6v10h6v-4c0-2.21 1.79-4 4-4V8h-4zm12 0c-3.314 0-6 2.686-6 6v10h6v-4c0-2.21 1.79-4 4-4V8h-4z"/>
                                            </svg>
                                        </motion.div>

                                        <motion.p 
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: testimonial.delay + 0.4 }}
                                            className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base"
                                        >
                                            {testimonial.quote}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: testimonial.delay + 0.6 }}
                                        >
                                            <div className="font-semibold text-base sm:text-lg mb-1 dark:text-white">
                                                {testimonial.name}
                        </div>
                                            <div className="text-[#20B2AA] text-xs sm:text-sm">
                                                {testimonial.role} at {testimonial.company}
                    </div>
                                        </motion.div>

                                        {/* Hover effect gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#20B2AA]/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

                {/* Contact Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="py-20 sm:py-24 px-4 sm:px-6 bg-white dark:bg-gray-900 relative overflow-hidden" 
                    id="contact"
                >
                    {/* Background Elements */}
                    <div className="absolute inset-0">
                        <motion.div
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-20 left-10 sm:left-20 w-64 md:w-[40rem] h-64 md:h-[40rem] bg-[#20B2AA]/5 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{
                                y: [0, 30, 0],
                                opacity: [0.1, 0.15, 0.1],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                            className="absolute bottom-20 right-10 sm:right-20 w-64 md:w-[35rem] h-64 md:h-[35rem] bg-purple-500/5 rounded-full blur-3xl"
                        />
                        </div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12 sm:mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium inline-block px-3 sm:px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-3 sm:mb-4 text-xs sm:text-sm"
                            >
                                Contact
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-3xl sm:text-4xl font-bold mt-2 sm:mt-4 mb-3 sm:mb-6"
                            >
                                Get In Touch
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg px-2"
                            >
                                Have a project in mind? Let's discuss how I can help bring your ideas to life.
                            </motion.p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <form className="space-y-5 sm:space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-3 sm:space-y-4"
                                    >
                                    <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                                            Name
                                        </label>
                                            <motion.input
                                                whileFocus={{ scale: 1.01 }}
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Your Name"
                                                className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                                            Email
                                        </label>
                                            <motion.input
                                                whileFocus={{ scale: 1.01 }}
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Your Email"
                                                className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                                            Subject
                                        </label>
                                            <motion.input
                                                whileFocus={{ scale: 1.01 }}
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                                className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                                            Message
                                        </label>
                                            <motion.textarea
                                                whileFocus={{ scale: 1.01 }}
                                            id="message"
                                            name="message"
                                            rows={5}
                                            placeholder="Your Message"
                                                className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 resize-none bg-white dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                    </motion.div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-2.5 sm:py-3 px-4 bg-[#20B2AA] hover:bg-[#1a9994] text-white font-medium rounded-lg shadow-lg shadow-[#20B2AA]/20 hover:shadow-xl hover:shadow-[#20B2AA]/30 transition-all duration-200 cursor-pointer"
                                    >
                                        Send Message
                                    </motion.button>
                                </form>
                            </motion.div>

                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-4 sm:space-y-6 mt-2 lg:mt-0"
                            >
                                {[
                                    {
                                        icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#20B2AA]" />,
                                        title: "Email",
                                        subtitle: "For general inquiries:",
                                        value: "ratul.innovations@gmail.com",
                                        delay: 0
                                    },
                                    {
                                        icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#20B2AA]" />,
                                        title: "Phone",
                                        subtitle: "Available Monday-Friday:",
                                        value: "01781-935014",
                                        delay: 0.2
                                    },
                                    {
                                        icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#20B2AA]" />,
                                        title: "Location",
                                        subtitle: "Based in:",
                                        value: "Kushtia, Bangladesh",
                                        delay: 0.4
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: item.delay }}
                                        className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                                className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center"
                                            >
                                                {item.icon}
                                            </motion.div>
                                            <div>
                                                <h3 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1 dark:text-white group-hover:text-[#20B2AA] transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1">
                                                    {item.subtitle}
                                                </p>
                                                <p className="text-[#20B2AA] font-medium text-sm sm:text-base">
                                                    {item.value}
                                                </p>
                            </div>
                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                </div>
                    </div>
                </motion.section>

                {/* Footer Section */}
                <footer className="bg-[#0F172A] dark:bg-gray-950 text-white py-8 sm:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 mb-6 sm:mb-8">
                            {/* Left Column - Logo and Description */}
                            <div>
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#20B2AA] rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                                        P
                                    </div>
                                    <span className="font-medium text-xs sm:text-sm">Portfolio</span>
                                </div>
                                <p className="text-gray-400 max-w-md text-xs sm:text-sm">
                                    Creating exceptional digital experiences through innovative design and development solutions.
                                </p>
                            </div>

                            {/* Right Column - Social Links */}
                            <div className="flex justify-start sm:justify-end mt-4 sm:mt-0">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                                        <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                    </a>
                                    <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                                        <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                    </a>
                                    <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-800 mb-6 sm:mb-8"></div>

                        {/* Bottom Row */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                            <div className="text-gray-400 text-xs sm:text-sm order-2 sm:order-1">
                                © {new Date().getFullYear()} Your Portfolio. All rights reserved.
                            </div>
                            <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-8 order-1 sm:order-2">
                                <a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-[#20B2AA] transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-[#20B2AA] transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-[#20B2AA] transition-colors">
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
}

function formatTitle(title: string): string {
    // Check if the title has the default format
    if (title === 'Creative Designer & Developer') {
        return `Creative <span class="text-[#20B2AA] relative">
            Designer
            <svg class="absolute -bottom-1 xs:-bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M0 4C50 4 150 4 200 4" stroke="#20B2AA" stroke-width="4" stroke-linecap="round"/>
            </svg>
        </span> & Developer`;
    }
    
    // If it's a custom title, look for keywords to highlight
    const keywords = ['Designer', 'Developer', 'Engineer', 'Programmer', 'Creative', 'UX/UI', 'Architect'];
    let formattedTitle = title;
    
    for (const keyword of keywords) {
        if (title.includes(keyword)) {
            formattedTitle = title.replace(
                keyword, 
                `<span class="text-[#20B2AA] relative">
                    ${keyword}
                    <svg class="absolute -bottom-1 xs:-bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                        <path d="M0 4C50 4 150 4 200 4" stroke="#20B2AA" stroke-width="4" stroke-linecap="round"/>
                    </svg>
                </span>`
            );
            break;
        }
    }
    
    return formattedTitle;
}
