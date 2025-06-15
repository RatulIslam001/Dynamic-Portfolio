import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, ArrowRight, Github, ExternalLink, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

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
  live_url?: string;
};

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
    const [projectCount, setProjectCount] = useState(projects.length);

    // Derive categories from projects
    const categories = ['All', ...new Set(projects.map(project => project.category))];

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
        if (categoryFilter !== 'All') {
            filtered = filtered.filter(project => project.category === categoryFilter);
        }
        
        setFilteredProjects(filtered);
        setProjectCount(filtered.length);
    }, [searchQuery, categoryFilter, projects]);

    return (
        <>
            <Head title="My Projects" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 py-16 text-center">
                    <div className="max-w-7xl mx-auto px-4">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">My <span className="text-[#20B2AA]">Projects</span></h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
                            A collection of projects showcasing my expertise in web development, mobile 
                            applications, and user experience design. Each project represents a unique challenge 
                            and innovative solution.
                        </p>
                        
                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mt-10">
                            <div className="text-center">
                                <p className="text-[#20B2AA] font-bold text-2xl">40+ Projects Completed</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[#20B2AA] font-bold text-2xl">30+ Happy Clients</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[#20B2AA] font-bold text-2xl">99% Success Rate</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <h2 className="text-xl font-semibold">Filter Projects</h2>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm text-gray-500">{projectCount} Projects</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setCategoryFilter(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    categoryFilter === category
                                        ? 'bg-[#20B2AA] text-white'
                                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#20B2AA] hover:text-[#20B2AA]'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="max-w-7xl mx-auto px-4 pb-8">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA] focus:ring-opacity-20 outline-none transition-all duration-200 bg-white dark:bg-gray-800 dark:text-white"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="max-w-7xl mx-auto px-4 pb-16">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-12">
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
                                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                                >
                                    {/* Project Image */}
                                    <div className="relative h-48 overflow-hidden">
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
                                            <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded-md">
                                                {new Date(project.completion_date).getFullYear()}
                                            </div>
                                        )}
                                        
                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3 bg-[#20B2AA] bg-opacity-90 text-white text-xs font-medium px-2 py-1 rounded-md">
                                            {project.category}
                                        </div>
                                    </div>
                                    
                                    {/* Project Content */}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {project.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm flex-grow">
                                            {project.description}
                                        </p>
                                        
                                        {/* Technologies */}
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="mb-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {project.technologies.map((tech, index) => (
                                                        <span 
                                                            key={index} 
                                                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="px-6 pb-6 flex gap-2">
                                        {project.live_url && (
                                            <a 
                                                href={project.live_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center py-3 px-4 bg-[#20B2AA] text-white font-medium rounded-md hover:bg-[#1a9e98] transition-all duration-300"
                                            >
                                                View Live
                                            </a>
                                        )}
                                        
                                        {project.github_url && (
                                            <a 
                                                href={project.github_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center py-3 px-4 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:border-[#20B2AA] hover:text-[#20B2AA] transition-all duration-300"
                                            >
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
                <div className="bg-gray-900 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Let's collaborate and bring your ideas to life with cutting-edge technology and innovative
                            solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-[#20B2AA] hover:bg-[#1a9e98] text-white font-medium rounded-lg w-full sm:w-auto transition-all duration-300"
                            >
                                Start a Project
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 border border-gray-700 text-white font-medium rounded-lg hover:border-[#20B2AA] hover:text-[#20B2AA] w-full sm:w-auto transition-all duration-300"
                            >
                                Download Resume
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 