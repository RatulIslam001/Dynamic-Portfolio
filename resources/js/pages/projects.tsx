import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, ArrowRight, Github, ExternalLink, Star, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  category: string;
  status: string;
  is_featured: boolean;
  completion_date?: string;
  client_name?: string;
  project_url?: string;
  technologies: string[];
  github_url?: string;
};

type Content = {
  page_title: string;
  page_description: string;
  page_badge: string;
  total_projects_label: string;
  categories_label: string;
  technologies_label: string;
  clients_label: string;
  search_placeholder: string;
  all_categories_text: string;
  projects_section_title: string;
  cta_title: string;
  cta_description: string;
  cta_primary_button: string;
  cta_secondary_button: string;
  cta_primary_url: string;
  cta_secondary_url: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
};

type Props = {
  projects: Project[];
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
  content?: Content;
};

export default function Projects({ projects, profile, content }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(content?.all_categories_text || 'All');
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
    const [projectCount, setProjectCount] = useState(projects.length);

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

    // Use dynamic categories from admin panel or derive from projects
    const allCategoriesText = content?.all_categories_text || 'All';
    const adminCategories = content?.filter_categories || [];
    const categories = adminCategories.length > 0
        ? [allCategoriesText, ...adminCategories]
        : [allCategoriesText, ...new Set(projects.map(project => project.category))];

    // Filter projects based on search query and category
    useEffect(() => {
        let filtered = projects;
        
        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.technologies && project.technologies.some(tech => 
                    tech.toLowerCase().includes(searchQuery.toLowerCase())
                ))
            );
        }
        
        // Filter by category
        if (categoryFilter !== allCategoriesText) {
            filtered = filtered.filter(project => project.category === categoryFilter);
        }
        
        setFilteredProjects(filtered);
        setProjectCount(filtered.length);
    }, [searchQuery, categoryFilter, projects]);

    return (
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
            <Head title={content?.meta_title || content?.page_title || "My Projects"} />

            <div className="min-h-screen bg-white dark:bg-gray-900">
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
                                        } else if (navItem.href === 'works' || navItem.href === 'projects') {
                                            href = '/#works';
                                        }

                                        // Determine if this is the active page
                                        const isActive = navItem.title === 'Works' || navItem.title === 'Projects';

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
                    
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 py-20 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-5 dark:opacity-10">
                            <div className="absolute top-0 left-0 w-72 h-72 bg-[#20B2AA] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#20B2AA] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 relative z-10">
                            <div className="inline-block px-3 py-1 bg-[#20B2AA]/10 text-[#20B2AA] text-sm font-medium rounded-full mb-4">
                                {content?.page_badge || 'Portfolio'}
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                {content?.page_title || 'My Projects'}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
                                {content?.page_description || 'A collection of projects showcasing my expertise in web development, mobile applications, and user experience design. Each project represents a unique challenge and innovative solution.'}
                            </p>
                            
                            {/* Stats */}
                            <div className="flex flex-wrap justify-center gap-12 mt-12">
                                <div className="text-center">
                                    <p className="text-[#20B2AA] font-bold text-3xl mb-1">
                                        {content?.stat_total_projects || `${projects.length}+`}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                        {content?.total_projects_label || 'Total Projects'}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#20B2AA] font-bold text-3xl mb-1">
                                        {content?.stat_categories || (categories.length - 1)}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                        {content?.categories_label || 'Categories'}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#20B2AA] font-bold text-3xl mb-1">
                                        {content?.stat_technologies || `${Array.from(new Set(projects.flatMap(p => p.technologies))).length}+`}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                        {content?.technologies_label || 'Technologies'}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#20B2AA] font-bold text-3xl mb-1">
                                        {content?.stat_clients || `${Array.from(new Set(projects.filter(p => p.client_name).map(p => p.client_name))).length}+`}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                        {content?.clients_label || 'Happy Clients'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="max-w-7xl mx-auto px-4 py-10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {content?.projects_section_title || 'Featured Work'}
                                    </h2>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{projectCount} Projects</p>
                        </div>
                    </div>
                </div>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setCategoryFilter(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        categoryFilter === category
                                            ? 'bg-[#20B2AA] text-white shadow-md shadow-[#20B2AA]/20'
                                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#20B2AA] hover:text-[#20B2AA]'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full mb-10">
                            <input
                                type="text"
                                placeholder={content?.search_placeholder || "Search projects..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:bg-gray-800 dark:text-white shadow-sm"
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* Projects Grid */}
                    <div className="max-w-7xl mx-auto px-4 pb-20">
                    {filteredProjects.length === 0 ? (
                            <div className="text-center py-16">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700"
                                >
                                    {/* Project Image */}
                                        <div className="relative h-52 overflow-hidden">
                                        {project.image ? (
                                            <img 
                                                src={project.image} 
                                                alt={project.title} 
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <span className="text-gray-400 dark:text-gray-500">No image</span>
                                            </div>
                                        )}
                                        
                                            {/* Year Badge */}
                                            {project.completion_date && (
                                                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white text-xs font-medium px-2.5 py-1.5 rounded-md backdrop-blur-sm">
                                                    {new Date(project.completion_date).getFullYear()}
                                            </div>
                                        )}
                                        
                                        {/* Category Badge */}
                                            <div className="absolute top-4 left-4 bg-[#20B2AA] bg-opacity-90 text-white text-xs font-medium px-2.5 py-1.5 rounded-md backdrop-blur-sm">
                                            {project.category}
                                        </div>
                                    </div>
                                    
                                    {/* Project Content */}
                                    <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                                <Link href={`/projects/${project.id}`} className="hover:text-[#20B2AA] transition-colors">
                                                    {project.title}
                                                </Link>
                                        </h3>
                                        
                                            <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm flex-grow">
                                            {project.description}
                                        </p>
                                        
                                        {/* Technologies */}
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="mb-4">
                                                    <div className="flex flex-wrap gap-1.5">
                                                    {project.technologies.map((tech, index) => (
                                                        <span 
                                                            key={index} 
                                                                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        </div>
                                            
                                        {/* Action Buttons */}
                                        <div className="px-6 pb-6 flex gap-3">
                                            {project.project_url && (
                                                <a
                                                    href={project.project_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 inline-flex items-center justify-center py-3 px-4 bg-[#20B2AA] text-white font-medium rounded-lg hover:bg-[#1a9e98] transition-all duration-300 shadow-sm shadow-[#20B2AA]/20"
                                                >
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    View Live
                                                </a>
                                            )}
                                            
                                            {project.github_url && (
                                                <a 
                                                    href={project.github_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex-1 inline-flex items-center justify-center py-3 px-4 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:border-[#20B2AA] hover:text-[#20B2AA] transition-all duration-300"
                                                >
                                                    <Github className="w-4 h-4 mr-2" />
                                                    View Code
                                                </a>
                                            )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#20B2AA] rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                            <h2 className="text-3xl font-bold mb-4">
                                {content?.cta_title || 'Ready to Start Your Project?'}
                            </h2>
                            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
                                {content?.cta_description || 'Let\'s collaborate to bring your ideas to life with innovative solutions and exceptional results.'}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href={content?.cta_primary_url || '#contact'}
                                    className="px-8 py-3.5 bg-[#20B2AA] hover:bg-[#1a9e98] text-white font-medium rounded-lg w-full sm:w-auto transition-all duration-300 shadow-lg shadow-[#20B2AA]/20"
                                >
                                    {content?.cta_primary_button || 'Start a Project'}
                                </Link>
                                <Link
                                    href={content?.cta_secondary_url || '/services'}
                                    className="px-8 py-3.5 border border-gray-700 text-white font-medium rounded-lg hover:border-[#20B2AA] hover:text-[#20B2AA] w-full sm:w-auto transition-all duration-300"
                                >
                                    {content?.cta_secondary_button || 'View All Services'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
} 