import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Twitter, Code, Smartphone, Search, BarChart3, FileText, Briefcase, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
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

export default function Welcome() {
    const [activeFilter, setActiveFilter] = useState('All');
    
    // Project data
    const projects = [
        {
            title: "Agency Website",
            category: "Web Design",
            description: "Modern agency website with parallax effects and interactive elements.",
            image: "/storage/Agency Website.png"
        },
        {
            title: "E-commerce Dashboard",
            category: "Web Design",
            description: "Modern e-commerce admin dashboard with real-time analytics and inventory management.",
            image: "/storage/Ecommerce.png"
        },
        {
            title: "Food Delivery App",
            category: "Mobile Apps",
            description: "Feature-rich food delivery application with real-time order tracking.",
            image: "/storage/Food Delivery App.png"
        },
        {
            title: "Portfolio Website",
            category: "Web Design",
            description: "Responsive portfolio website with modern animations and dark mode support.",
            image: "/storage/Portfolio Website.png"
        },
        {
            title: "Task Management System",
            category: "Web Design",
            description: "Collaborative task management platform with real-time updates and team features.",
            image: "/storage/Task Management System.png"
        },
        {
            title: "Travel Booking App",
            category: "Mobile Apps",
            description: "Cross-platform travel booking application with interactive maps and real-time availability.",
            image: "/storage/Travel Booking App.png"
        }
    ];

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
                    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800"
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

                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-8">
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

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
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
                </motion.nav>

                {/* Hero Section */}
                <motion.section 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="min-h-screen flex items-center pt-20 px-4 pb-16 max-w-7xl mx-auto relative overflow-hidden"
                    id="home"
                >
                    {/* Background gradient effects */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-[#20B2AA]/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 items-center relative">
                        <motion.div variants={containerVariants}>
                            <motion.div 
                                variants={itemVariants}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6F7F6] text-[#20B2AA] text-sm mb-8"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#20B2AA] animate-pulse"></span>
                                Available for work
                            </motion.div>

                            <motion.h1 
                                variants={itemVariants}
                                className="text-6xl font-bold leading-[1.1] tracking-tight mb-6"
                            >
                                Creative <span className="text-[#20B2AA] relative">
                                    Designer
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                                        <path d="M0 4C50 4 150 4 200 4" stroke="#20B2AA" strokeWidth="4" strokeLinecap="round"/>
                                    </svg>
                                </span> & Developer
                            </motion.h1>

                            <motion.p 
                                variants={itemVariants}
                                className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-xl"
                            >
                                I create exceptional digital experiences that solve complex problems and connect people through elegant, user-focused design.
                            </motion.p>

                            <motion.div 
                                variants={itemVariants}
                                className="flex items-center gap-4 mb-12"
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <ScrollLink
                                    to="works"
                                    spy={true}
                                    smooth={true}
                                    offset={-100}
                                    duration={500}
                                    className="cursor-pointer"
                                >
                                        <Button className="bg-[#20B2AA] hover:bg-[#1a9994] text-white px-8 py-3 text-base relative overflow-hidden group">
                                            <span className="relative z-10">View My Work</span>
                                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                    </Button>
                                </ScrollLink>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="outline" className="border-gray-200 px-8 py-3 text-base group hover:border-[#20B2AA] transition-colors">
                                        <Download className="w-5 h-5 mr-2 group-hover:text-[#20B2AA] transition-colors" />
                                    Download CV
                                </Button>
                                </motion.div>
                            </motion.div>

                            <motion.div 
                                variants={itemVariants}
                                className="flex items-center gap-4"
                            >
                                <motion.a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                                >
                                    <Github className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-[#20B2AA] transition-colors duration-300" />
                                </motion.a>
                                <motion.a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                                >
                                    <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-[#20B2AA] transition-colors duration-300" />
                                </motion.a>
                                <motion.a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                                >
                                    <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-[#20B2AA] transition-colors duration-300" />
                                </motion.a>
                            </motion.div>
                        </motion.div>

                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-full h-[600px] bg-gradient-to-br from-[#20B2AA]/20 to-purple-500/20 rounded-3xl overflow-hidden relative backdrop-blur-sm border border-white/20"
                            >
                                {/* Profile image */}
                                <img 
                                    src="/storage/profile.jpg" 
                                    alt="Profile"
                                    className="w-full h-full object-cover object-center z-10 relative"
                                    style={{ objectPosition: "center 20%" }}
                                />
                                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                            </motion.div>
                            
                            {/* Stats cards */}
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="absolute -top-4 right-0 md:-top-6 md:-right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 px-4 py-3 flex items-center gap-3 z-10 max-w-[90%] sm:max-w-[250px] border border-gray-100 dark:border-gray-700"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#E6F7F6] dark:bg-[#20B2AA]/20 flex items-center justify-center flex-shrink-0">
                                    <motion.span 
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-[#20B2AA] text-xl"
                                    >
                                        ✓
                                    </motion.span>
                                </div>
                                <div className="min-w-0">
                                    <div className="font-semibold text-lg text-gray-900 dark:text-white truncate">50+ Projects</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">Completed</div>
                                </div>
                            </motion.div>
                            
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 px-4 py-3 flex items-center gap-3 z-10 border border-gray-100 dark:border-gray-700"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#E6F7F6] dark:bg-[#20B2AA]/20 flex items-center justify-center">
                                    <motion.span 
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="text-[#20B2AA] text-xl"
                                    >
                                        ★
                                    </motion.span>
                                </div>
                                <div>
                                    <div className="font-semibold text-lg text-gray-900 dark:text-white">5 Years</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Experience</div>
                                </div>
                            </motion.div>
                            </div>
                        </div>
                </motion.section>

                {/* Services Section */}
                <section className="py-32 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden" id="services">
                    {/* Background patterns */}
                    <div className="absolute inset-0 opacity-30 dark:opacity-10">
                        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#20B2AA] rounded-lg transform rotate-45"></div>
                        <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-purple-500 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium text-sm inline-block px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-4"
                            >
                                Services
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-4xl font-bold mt-3 mb-4"
                            >
                                My Expertise
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
                            >
                                I provide high-quality services tailored to meet your specific needs and help your business grow
                            </motion.p>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Code,
                                    title: "Web Development",
                                    description: "Creating responsive, fast, and user-friendly websites using modern technologies and best practices.",
                                    gradient: "from-[#20B2AA] to-teal-600"
                                },
                                {
                                    icon: Search,
                                    title: "UI/UX Design",
                                    description: "Designing intuitive and beautiful user interfaces that provide exceptional user experiences.",
                                    gradient: "from-purple-500 to-indigo-600"
                                },
                                {
                                    icon: Smartphone,
                                    title: "Mobile Development",
                                    description: "Building cross-platform mobile applications that work seamlessly on iOS and Android devices.",
                                    gradient: "from-orange-500 to-pink-600"
                                },
                                {
                                    icon: Search,
                                    title: "SEO Optimization",
                                    description: "Improving your website's visibility in search engines to drive more organic traffic.",
                                    gradient: "from-blue-500 to-cyan-600"
                                },
                                {
                                    icon: BarChart3,
                                    title: "Digital Marketing",
                                    description: "Creating and implementing effective digital marketing strategies to grow your business.",
                                    gradient: "from-green-500 to-emerald-600"
                                },
                                {
                                    icon: FileText,
                                    title: "Content Writing",
                                    description: "Crafting engaging and SEO-friendly content that resonates with your target audience.",
                                    gradient: "from-red-500 to-rose-600"
                                }
                            ].map((service, index) => (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <motion.div 
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group relative overflow-hidden"
                                    >
                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                                        
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                                <service.icon className="w-6 h-6 text-[#20B2AA]" />
                                </div>
                                            <h3 className="text-xl font-semibold mb-4 group-hover:text-[#20B2AA] transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-base mb-6">
                                                {service.description}
                                            </p>
                                            <motion.a 
                                                href="#"
                                                className="text-[#20B2AA] font-medium inline-flex items-center group/link"
                                                whileHover={{ x: 5 }}
                                            >
                                    Learn more
                                                <svg 
                                                    className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none"
                                                >
                                                    <path 
                                                        d="M4 12h16m0 0l-6-6m6 6l-6 6" 
                                                        stroke="currentColor" 
                                                        strokeWidth="2" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round"
                                                    />
                                    </svg>
                                            </motion.a>
                            </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Projects Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="py-32 px-6 dark:bg-gray-900" 
                    id="works"
                >
                    <div className="max-w-7xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium inline-block px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-4"
                            >
                                Portfolio
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-4xl font-bold mt-4 mb-6"
                            >
                                Featured Projects
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                            >
                                Explore my latest work and see how I've helped clients achieve their goals
                            </motion.p>
                        </motion.div>

                        {/* Filter Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center justify-center gap-4 mb-12"
                        >
                            {[
                                { name: 'All', active: activeFilter === 'All' },
                                { name: 'Web Design', active: activeFilter === 'Web Design' },
                                { name: 'Mobile Apps', active: activeFilter === 'Mobile Apps' },
                                { name: 'Branding', active: activeFilter === 'Branding' }
                            ].map((filter, index) => (
                                <motion.button
                                    key={filter.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveFilter(filter.name)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                        filter.active 
                                            ? 'bg-[#20B2AA] text-white' 
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    {filter.name}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Projects Grid */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-3 gap-8"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="group relative bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden aspect-video hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#20B2AA]/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="w-full h-full relative">
                                        {/* Project Image */}
                                        <div className="absolute inset-0">
                                            <img 
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>
                                        
                                        {/* Overlay Content */}
                                        <div className="absolute inset-0 flex items-end justify-start p-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <div className="w-full">
                                                <span className="inline-block px-3 py-1 bg-[#20B2AA]/90 text-white text-sm rounded-full mb-3">
                                                    {project.category}
                                                </span>
                                                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                                <p className="text-gray-200 text-sm line-clamp-2 max-w-md opacity-90">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* View All Projects Button */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex justify-center mt-12"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all duration-300 hover:border-[#20B2AA] hover:text-[#20B2AA] group"
                            >
                                <span className="inline-flex items-center gap-2">
                                View All Projects
                                    <motion.svg 
                                        className="w-4 h-4"
                                        initial={{ x: 0 }}
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </motion.svg>
                                </span>
                            </motion.button>
                        </motion.div>
                        </div>
                </motion.section>

                {/* Technical Proficiency Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden" 
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
                            className="absolute top-20 right-20 w-40 h-40 border-2 border-[#20B2AA] rounded-full"
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
                            className="absolute bottom-40 left-20 w-32 h-32 border-2 border-purple-500 rounded-lg transform rotate-45"
                        />
                        </div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium inline-block px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-4"
                            >
                                Skills
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-4xl font-bold mt-4 mb-6"
                            >
                                Technical Proficiency
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                            >
                                I've spent years honing my skills in various technologies and design principles
                            </motion.p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-20">
                            {/* Left Column - Skill Bars */}
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-8"
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
                                className="grid grid-cols-2 gap-8"
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
                    className="py-24 px-6 dark:bg-gray-900 relative overflow-hidden" 
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
                            className="absolute top-20 left-20 w-64 h-64 bg-[#20B2AA]/5 rounded-full blur-3xl"
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
                            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                        />
                        </div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium inline-block px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-4"
                            >
                                Resume
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-4xl font-bold mt-4 mb-6"
                            >
                                Experience & Education
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                            >
                                My professional journey and academic background
                            </motion.p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-20">
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
                                    className="flex items-center gap-3 mb-12"
                                >
                                    <motion.div 
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-12 h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center"
                                    >
                                        <Briefcase className="w-6 h-6 text-[#20B2AA]" />
                                    </motion.div>
                                    <h3 className="text-2xl font-semibold">Experience</h3>
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
                            >
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="flex items-center gap-3 mb-12"
                                >
                                    <motion.div 
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-12 h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center"
                                    >
                                        <GraduationCap className="w-6 h-6 text-[#20B2AA]" />
                                    </motion.div>
                                    <h3 className="text-2xl font-semibold">Education</h3>
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
                            className="flex justify-center mt-16"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#20B2AA] hover:bg-[#1a9994] text-white px-8 py-6 text-base inline-flex items-center gap-2 rounded-xl group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                <Download className="w-5 h-5" />
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
                    className="py-24 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden" 
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
                            className="absolute top-20 left-20 w-96 h-96 bg-[#20B2AA]/10 rounded-full blur-3xl"
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
                            className="absolute bottom-20 right-20 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl"
                        />
                        </div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium inline-block px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-4"
                            >
                                Testimonials
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-4xl font-bold mt-4 mb-6"
                            >
                                What Clients Say
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
                            >
                                Feedback from clients who have experienced working with me
                            </motion.p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-3 gap-8"
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
                                        className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
                                    >
                                        {/* Decorative elements */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#20B2AA] to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: testimonial.delay + 0.2 }}
                                            className="mb-6"
                                        >
                                            <svg className="w-10 h-10 text-[#20B2AA] opacity-80" fill="currentColor" viewBox="0 0 32 32">
                                                <path d="M10 8c-3.314 0-6 2.686-6 6v10h6v-4c0-2.21 1.79-4 4-4V8h-4zm12 0c-3.314 0-6 2.686-6 6v10h6v-4c0-2.21 1.79-4 4-4V8h-4z"/>
                                            </svg>
                                        </motion.div>

                                        <motion.p 
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: testimonial.delay + 0.4 }}
                                            className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                                        >
                                            {testimonial.quote}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: testimonial.delay + 0.6 }}
                                        >
                                            <div className="font-semibold text-lg mb-1 dark:text-white">
                                                {testimonial.name}
                        </div>
                                            <div className="text-[#20B2AA] text-sm">
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
                    className="py-24 px-4 bg-white dark:bg-gray-900 relative overflow-hidden" 
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
                            className="absolute top-20 left-20 w-[40rem] h-[40rem] bg-[#20B2AA]/5 rounded-full blur-3xl"
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
                            className="absolute bottom-20 right-20 w-[35rem] h-[35rem] bg-purple-500/5 rounded-full blur-3xl"
                        />
                        </div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#20B2AA] font-medium inline-block px-4 py-1.5 bg-[#E6F7F6] rounded-full mb-4"
                            >
                                Contact
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-4xl font-bold mt-4 mb-6"
                            >
                                Get In Touch
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
                            >
                                Have a project in mind? Let's discuss how I can help bring your ideas to life.
                            </motion.p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <form className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-4"
                                    >
                                    <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Name
                                        </label>
                                            <motion.input
                                                whileFocus={{ scale: 1.01 }}
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Your Name"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email
                                        </label>
                                            <motion.input
                                                whileFocus={{ scale: 1.01 }}
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Your Email"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Subject
                                        </label>
                                            <motion.input
                                                whileFocus={{ scale: 1.01 }}
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Message
                                        </label>
                                            <motion.textarea
                                                whileFocus={{ scale: 1.01 }}
                                            id="message"
                                            name="message"
                                            rows={6}
                                            placeholder="Your Message"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 resize-none bg-white dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                    </motion.div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-3 px-4 bg-[#20B2AA] hover:bg-[#1a9994] text-white font-medium rounded-lg shadow-lg shadow-[#20B2AA]/20 hover:shadow-xl hover:shadow-[#20B2AA]/30 transition-all duration-200"
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
                                className="space-y-6"
                            >
                                {[
                                    {
                                        icon: <Mail className="w-6 h-6 text-[#20B2AA]" />,
                                        title: "Email",
                                        subtitle: "For general inquiries:",
                                        value: "ratul.innovations@gmail.com",
                                        delay: 0
                                    },
                                    {
                                        icon: <Phone className="w-6 h-6 text-[#20B2AA]" />,
                                        title: "Phone",
                                        subtitle: "Available Monday-Friday:",
                                        value: "01781-935014",
                                        delay: 0.2
                                    },
                                    {
                                        icon: <MapPin className="w-6 h-6 text-[#20B2AA]" />,
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
                                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                                className="w-12 h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center"
                                            >
                                                {item.icon}
                                            </motion.div>
                                            <div>
                                                <h3 className="text-lg font-semibold mb-1 dark:text-white group-hover:text-[#20B2AA] transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                    {item.subtitle}
                                                </p>
                                                <p className="text-[#20B2AA] font-medium">
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
                <footer className="bg-[#0F172A] dark:bg-gray-950 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 gap-12 mb-8">
                            {/* Left Column - Logo and Description */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-7 h-7 bg-[#20B2AA] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        P
                                    </div>
                                    <span className="font-medium text-sm">Portfolio</span>
                                </div>
                                <p className="text-gray-400 max-w-md text-sm">
                                    Creating exceptional digital experiences through innovative design and development solutions.
                                </p>
                            </div>

                            {/* Right Column - Social Links */}
                            <div className="flex justify-end">
                                <div className="flex items-center gap-4">
                                    <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                                        <Twitter className="w-5 h-5 text-gray-400" />
                                    </a>
                                    <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                                        <Github className="w-5 h-5 text-gray-400" />
                                    </a>
                                    <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                                        <Linkedin className="w-5 h-5 text-gray-400" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-800 mb-8"></div>

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between">
                            <div className="text-gray-400 text-sm">
                                © 2025 Your Portfolio. All rights reserved.
                            </div>
                            <div className="flex items-center gap-8">
                                <a href="#" className="text-gray-400 text-sm hover:text-[#20B2AA] transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-gray-400 text-sm hover:text-[#20B2AA] transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-gray-400 text-sm hover:text-[#20B2AA] transition-colors">
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
