import { Head } from '@inertiajs/react';
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

export default function Welcome() {
    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: true
        });
    };

    return (
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
            <Head title="Portfolio - Creative Designer & Developer">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
                        <div className="w-8 h-8 bg-[#20B2AA] rounded-full flex items-center justify-center text-white font-bold">
                            P
                        </div>
                        <span className="font-medium text-base">Portfolio</span>
                    </div>

                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-8">
                            {['Home', 'Services', 'Works', 'Skills', 'Resume', 'Testimonials', 'Contact'].map((item) => (
                                <NavigationMenuItem key={item}>
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
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
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
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="min-h-screen flex items-center pt-20 px-4 pb-16 max-w-7xl mx-auto" id="home">
                    <div className="grid grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6F7F6] text-[#20B2AA] text-sm mb-8">
                                <span className="w-2 h-2 rounded-full bg-[#20B2AA] animate-pulse"></span>
                                Available for work
                            </div>

                            <h1 className="text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                                Creative <span className="text-[#20B2AA]">Designer</span> & Developer
                            </h1>

                            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-xl">
                                I create exceptional digital experiences that solve complex problems and connect people through elegant, user-focused design.
                            </p>

                            <div className="flex items-center gap-4 mb-12">
                                <ScrollLink
                                    to="works"
                                    spy={true}
                                    smooth={true}
                                    offset={-100}
                                    duration={500}
                                    className="cursor-pointer"
                                >
                                    <Button className="bg-[#20B2AA] hover:bg-[#1a9994] text-white px-8 py-3 text-base">
                                        View My Work
                                    </Button>
                                </ScrollLink>
                                <Button variant="outline" className="border-gray-200 px-8 py-3 text-base">
                                    <Download className="w-5 h-5 mr-2" />
                                    Download CV
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <Github className="w-5 h-5 text-gray-600" />
                                </a>
                                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <Twitter className="w-5 h-5 text-gray-600" />
                                </a>
                                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <Linkedin className="w-5 h-5 text-gray-600" />
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden">
                                {/* Profile image will go here */}
                            </div>
                            
                            {/* Stats cards */}
                            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#E6F7F6] flex items-center justify-center">
                                    <span className="text-[#20B2AA] text-xl">✓</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-lg dark:text-white">50+ Projects</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#E6F7F6] flex items-center justify-center">
                                    <span className="text-[#20B2AA] text-xl">★</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-lg dark:text-white">5 Years</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Experience</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-32 px-4 bg-gray-50 dark:bg-gray-800" id="services">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-[#20B2AA] font-medium text-sm">Services</span>
                            <h2 className="text-3xl font-bold mt-3 mb-4">My Expertise</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl mx-auto">
                                I provide high-quality services tailored to meet your specific needs and help your business grow
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {/* Web Development */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-[#E6F7F6] rounded-lg flex items-center justify-center mb-4">
                                    <Code className="w-5 h-5 text-[#20B2AA]" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Web Development</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    Creating responsive, fast, and user-friendly websites using modern technologies and best practices.
                                </p>
                                <a href="#" className="text-[#20B2AA] font-medium inline-flex items-center hover:gap-2 transition-all">
                                    Learn more
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 12h16m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            </div>

                            {/* UI/UX Design */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-[#E6F7F6] rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5 text-[#20B2AA]" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3">UI/UX Design</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    Designing intuitive and beautiful user interfaces that provide exceptional user experiences.
                                </p>
                                <a href="#" className="text-[#20B2AA] font-medium inline-flex items-center hover:gap-2 transition-all">
                                    Learn more
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 12h16m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            </div>

                            {/* Mobile Development */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-[#E6F7F6] rounded-lg flex items-center justify-center mb-4">
                                    <Smartphone className="w-5 h-5 text-[#20B2AA]" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Mobile Development</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    Building cross-platform mobile applications that work seamlessly on iOS and Android devices.
                                </p>
                                <a href="#" className="text-[#20B2AA] font-medium inline-flex items-center hover:gap-2 transition-all">
                                    Learn more
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 12h16m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            </div>

                            {/* SEO Optimization */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-[#E6F7F6] rounded-lg flex items-center justify-center mb-4">
                                    <Search className="w-5 h-5 text-[#20B2AA]" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">SEO Optimization</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    Improving your website's visibility in search engines to drive more organic traffic.
                                </p>
                                <a href="#" className="text-[#20B2AA] font-medium inline-flex items-center hover:gap-2 transition-all">
                                    Learn more
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 12h16m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </a>
                            </div>

                            {/* Digital Marketing */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-[#E6F7F6] rounded-lg flex items-center justify-center mb-4">
                                    <BarChart3 className="w-5 h-5 text-[#20B2AA]" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Digital Marketing</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    Creating and implementing effective digital marketing strategies to grow your business.
                                </p>
                                <a href="#" className="text-[#20B2AA] font-medium inline-flex items-center hover:gap-2 transition-all">
                                    Learn more
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 12h16m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </a>
                            </div>

                            {/* Content Creation */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-[#E6F7F6] rounded-lg flex items-center justify-center mb-4">
                                    <FileText className="w-5 h-5 text-[#20B2AA]" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Content Creation</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    Producing high-quality content that engages your audience and drives conversions.
                                </p>
                                <a href="#" className="text-[#20B2AA] font-medium inline-flex items-center hover:gap-2 transition-all">
                                    Learn more
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 12h16m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Projects Section */}
                <section className="py-32 px-6 dark:bg-gray-900" id="works">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-[#20B2AA] font-medium">Portfolio</span>
                            <h2 className="text-4xl font-bold mt-4 mb-6">Featured Projects</h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Explore my latest work and see how I've helped clients achieve their goals
                            </p>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex items-center justify-center gap-4 mb-12">
                            <button className="px-6 py-2 rounded-full bg-[#20B2AA] text-white font-medium">
                                All
                            </button>
                            <button className="px-6 py-2 rounded-full text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                Web Design
                            </button>
                            <button className="px-6 py-2 rounded-full text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                Mobile Apps
                            </button>
                            <button className="px-6 py-2 rounded-full text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                Branding
                            </button>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-3 gap-8">
                            {/* Project Card 1 */}
                            <div className="group relative bg-gray-100 rounded-3xl overflow-hidden aspect-[4/3] hover:shadow-lg transition-shadow">
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>

                            {/* Project Card 2 */}
                            <div className="group relative bg-gray-100 rounded-3xl overflow-hidden aspect-[4/3] hover:shadow-lg transition-shadow">
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>

                            {/* Project Card 3 */}
                            <div className="group relative bg-gray-100 rounded-3xl overflow-hidden aspect-[4/3] hover:shadow-lg transition-shadow">
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>

                            {/* Project Card 4 */}
                            <div className="group relative bg-gray-100 rounded-3xl overflow-hidden aspect-[4/3] hover:shadow-lg transition-shadow">
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                                </div>
                            </div>

                            {/* Project Card 5 */}
                            <div className="group relative bg-gray-100 rounded-3xl overflow-hidden aspect-[4/3] hover:shadow-lg transition-shadow">
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                                </div>
                            </div>

                            {/* Project Card 6 */}
                            <div className="group relative bg-gray-100 rounded-3xl overflow-hidden aspect-[4/3] hover:shadow-lg transition-shadow">
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                                </div>
                            </div>
                        </div>

                        {/* View All Projects Button */}
                        <div className="flex justify-center mt-12">
                            <button className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                                View All Projects
                            </button>
                        </div>
                    </div>
                </section>

                {/* Technical Proficiency Section */}
                <section className="py-24 px-6 bg-gray-50 dark:bg-gray-800" id="skills">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-[#20B2AA] font-medium">Skills</span>
                            <h2 className="text-4xl font-bold mt-4 mb-6">Technical Proficiency</h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                I've spent years honing my skills in various technologies and design principles
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-20">
                            {/* Left Column - Skill Bars */}
                            <div className="space-y-8">
                                <ProgressBar label="HTML/CSS" percentage={95} />
                                <ProgressBar label="JavaScript" percentage={90} />
                                <ProgressBar label="React" percentage={85} />
                                <ProgressBar label="Next.js" percentage={80} />
                                <ProgressBar label="UI/UX Design" percentage={85} />
                            </div>

                            {/* Right Column - Skill Cards */}
                            <div className="grid grid-cols-2 gap-8">
                                <SkillCard skill="Node.js" percentage={75} />
                                <SkillCard skill="TypeScript" percentage={85} />
                                <SkillCard skill="Figma" percentage={90} />
                                <SkillCard skill="GraphQL" percentage={75} />
                                <SkillCard skill="Responsive Design" percentage={95} />
                                <SkillCard skill="Git" percentage={80} />
                            </div>
                        </div>
                </div>
                </section>

                {/* Experience & Education Section */}
                <section className="py-24 px-6 dark:bg-gray-900" id="resume">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-[#20B2AA] font-medium">Resume</span>
                            <h2 className="text-4xl font-bold mt-4 mb-6">Experience & Education</h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                My professional journey and academic background
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-20">
                            {/* Experience Column */}
                            <div>
                                <div className="flex items-center gap-3 mb-12">
                                    <div className="w-12 h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center">
                                        <Briefcase className="w-6 h-6 text-[#20B2AA]" />
                                    </div>
                                    <h3 className="text-2xl font-semibold">Experience</h3>
                                </div>

                                <div className="space-y-6">
                                    <TimelineItem
                                        period="2020 - Present"
                                        title="Senior Web Developer"
                                        organization="Tech Solutions Inc."
                                        description="Leading web development projects and mentoring junior developers."
                                    />
                                    <TimelineItem
                                        period="2018 - 2020"
                                        title="Frontend Developer"
                                        organization="Digital Creations"
                                        description="Developed responsive websites and web applications using React."
                                    />
                                    <TimelineItem
                                        period="2016 - 2018"
                                        title="UI/UX Designer"
                                        organization="Creative Studio"
                                        description="Designed user interfaces and experiences for web and mobile applications."
                                    />
                                </div>
                            </div>

                            {/* Education Column */}
                            <div>
                                <div className="flex items-center gap-3 mb-12">
                                    <div className="w-12 h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center">
                                        <GraduationCap className="w-6 h-6 text-[#20B2AA]" />
                                    </div>
                                    <h3 className="text-2xl font-semibold">Education</h3>
                                </div>

                                <div className="space-y-6">
                                    <TimelineItem
                                        period="2014 - 2016"
                                        title="Master's in Computer Science"
                                        organization="Tech University"
                                        description="Specialized in web technologies and user interface design."
                                    />
                                    <TimelineItem
                                        period="2010 - 2014"
                                        title="Bachelor's in Computer Science"
                                        organization="State University"
                                        description="Focused on software development and design principles."
                                    />
                                    <TimelineItem
                                        period="2008 - 2010"
                                        title="Associate's in Graphic Design"
                                        organization="Design Institute"
                                        description="Studied visual communication and digital design fundamentals."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Download Resume Button */}
                        <div className="flex justify-center mt-16">
                            <Button className="bg-[#20B2AA] hover:bg-[#1a9994] text-white px-8 py-6 text-base inline-flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Download Full Resume
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-24 px-6 bg-gray-50 dark:bg-gray-800" id="testimonials">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-[#20B2AA] font-medium">Testimonials</span>
                            <h2 className="text-4xl font-bold mt-4 mb-6">What Clients Say</h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Feedback from clients who have experienced working with me
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                            <TestimonialCard
                                quote="Working with this developer was an absolute pleasure. They delivered our project on time and exceeded our expectations in every way."
                                name="Sarah Johnson"
                                role="CEO"
                                company="TechStart"
                            />

                            <TestimonialCard
                                quote="The attention to detail and creative solutions provided made our website stand out from competitors. Highly recommended!"
                                name="Michael Chen"
                                role="Marketing Director"
                                company="GrowthLabs"
                            />

                            <TestimonialCard
                                quote="Exceptional work ethic and communication throughout the project. The final product was exactly what we envisioned and more."
                                name="Emily Rodriguez"
                                role="Founder"
                                company="DesignHub"
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-24 px-4 dark:bg-gray-900" id="contact">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-[#20B2AA] font-medium text-sm">Contact</span>
                            <h2 className="text-3xl font-bold mt-3 mb-4">Let's Work Together</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl mx-auto">
                                Have a project in mind? Let's discuss how I can help bring your ideas to life
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] h-[600px]">
                                <h3 className="text-xl font-semibold mb-4 dark:text-white">Get In Touch</h3>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Your Name"
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:placeholder-gray-400 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Your Email"
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:placeholder-gray-400 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:placeholder-gray-400 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            placeholder="Your Message"
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 resize-none bg-white dark:placeholder-gray-400 shadow-sm"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-[#20B2AA] to-[#1a9994] hover:from-[#1a9994] hover:to-[#158783] text-white font-medium shadow-lg shadow-[#20B2AA]/20 hover:shadow-xl hover:shadow-[#20B2AA]/30 transition-all duration-200 transform hover:-translate-y-0.5"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            {/* Contact Info Cards */}
                            <div className="grid grid-cols-1 gap-6 h-[600px] content-center">
                                <ContactCard
                                    icon={<Mail className="w-6 h-6 text-[#20B2AA]" />}
                                    title="Email"
                                    subtitle="For general inquiries:"
                                    value="ratul.innovations@gmail.com"
                                />
                                <ContactCard
                                    icon={<Phone className="w-6 h-6 text-[#20B2AA]" />}
                                    title="Phone"
                                    subtitle="Available Monday-Friday:"
                                    value="01781-935014"
                                />
                                <ContactCard
                                    icon={<MapPin className="w-6 h-6 text-[#20B2AA]" />}
                                    title="Location"
                                    subtitle="Based in:"
                                    value="Kushtia, Bangladesh"
                                />
                            </div>
                        </div>
                </div>
                </section>

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
