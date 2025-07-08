import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string | null;
    project_url?: string | null;
    github_url?: string | null;
    className?: string;
}

export function ProjectCard({ id, title, description, category, image, project_url, github_url, className }: ProjectCardProps) {
    return (
        <Link href={`/projects/${id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ 
                    duration: 0.5,
                    hover: {
                        type: "spring",
                        stiffness: 300
                    }
                }}
                className={cn(
                    "group relative bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden aspect-video cursor-pointer hover:shadow-2xl hover:shadow-[#20B2AA]/20 transition-all duration-500",
                    className
                )}
            >
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#20B2AA]/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                
                <div className="w-full h-full relative">
                    {/* Project Image with Enhanced Hover */}
                    <div className="absolute inset-0">
                        {image ? (
                            <img 
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-400 dark:text-gray-500">No image</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                    
                    {/* Enhanced Overlay Content */}
                    <div className="absolute inset-0 flex items-end justify-start p-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-full">
                            <motion.span 
                                className="inline-block px-3 py-1 bg-[#20B2AA] text-white text-sm rounded-full mb-3 backdrop-blur-sm shadow-lg"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ delay: 0.2 }}
                            >
                                {category}
                            </motion.span>
                            <motion.h3 
                                className="text-xl font-semibold text-white mb-2 group-hover:text-[#20B2AA] transition-colors duration-300"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {title}
                            </motion.h3>
                            <motion.p
                                className="text-gray-200 text-sm line-clamp-2 max-w-md opacity-90 group-hover:text-white transition-colors duration-300"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {description}
                            </motion.p>

                            {/* Action Buttons */}
                            {(project_url || github_url) && (
                                <motion.div
                                    className="flex gap-3 mt-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {project_url && (
                                        <motion.button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                window.open(project_url, '_blank');
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 bg-[#20B2AA] hover:bg-[#1a9b94] text-white text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            View Live
                                        </motion.button>
                                    )}
                                    {github_url && (
                                        <motion.button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                window.open(github_url, '_blank');
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Github className="w-4 h-4" />
                                            View Code
                                        </motion.button>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
} 