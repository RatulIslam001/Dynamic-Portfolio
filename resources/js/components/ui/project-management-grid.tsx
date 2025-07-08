import React from 'react';
import { motion } from 'framer-motion';
import { ProjectManagementCard } from './project-management-card';
import { Button } from '@/components/ui/button';
import { Plus, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string | null;
    category: string;
    status: 'draft' | 'published';
    is_featured: boolean;
    completion_date: string;
    client_name: string | null;
    project_url: string | null;
    technologies: string[];
}

interface ProjectManagementGridProps {
    projects: Project[];
    onEdit?: (project: Project) => void;
    onDelete?: (project: Project) => void;
    onView?: (project: Project) => void;
    onToggleFeatured?: (project: Project) => void;
    onToggleStatus?: (project: Project) => void;
    onDuplicate?: (project: Project) => void;
    onAddNew?: () => void;
    viewMode?: 'grid' | 'table';
    onViewModeChange?: (mode: 'grid' | 'table') => void;
    className?: string;
}

export function ProjectManagementGrid({
    projects,
    onEdit,
    onDelete,
    onView,
    onToggleFeatured,
    onToggleStatus,
    onDuplicate,
    onAddNew,
    viewMode = 'grid',
    onViewModeChange,
    className
}: ProjectManagementGridProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (projects.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16 px-4"
            >
                <div className="text-center max-w-md">
                    <div className="mb-6">
                        <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Grid className="h-12 w-12 text-gray-400" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No projects found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Get started by creating your first project. Showcase your work and build an impressive portfolio.
                    </p>
                    <Button
                        onClick={onAddNew}
                        className="bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Project
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className={cn("space-y-6", className)}>
            {/* View Mode Toggle */}
            {onViewModeChange && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => onViewModeChange('grid')}
                                className={cn(
                                    "h-7 px-2",
                                    viewMode === 'grid' 
                                        ? "bg-[#20B2AA] hover:bg-[#1a9994] text-white" 
                                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}
                            >
                                <Grid className="w-3 h-3" />
                            </Button>
                            <Button
                                variant={viewMode === 'table' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => onViewModeChange('table')}
                                className={cn(
                                    "h-7 px-2",
                                    viewMode === 'table' 
                                        ? "bg-[#20B2AA] hover:bg-[#1a9994] text-white" 
                                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}
                            >
                                <List className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {projects.length} project{projects.length !== 1 ? 's' : ''}
                    </div>
                </div>
            )}

            {/* Projects Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {projects.map((project) => (
                    <motion.div key={project.id} variants={itemVariants}>
                        <ProjectManagementCard
                            project={project}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onView={onView}
                            onToggleFeatured={onToggleFeatured}
                            onToggleStatus={onToggleStatus}
                            onDuplicate={onDuplicate}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Add New Project Card */}
            {onAddNew && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-[#20B2AA] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                    onClick={onAddNew}
                >
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#20B2AA]/10 flex items-center justify-center">
                            <Plus className="w-6 h-6 text-[#20B2AA]" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                                Add New Project
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Create a new project to showcase your work
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Project Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {projects.length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Total Projects
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                        {projects.filter(p => p.status === 'published').length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Published
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                        {projects.filter(p => p.is_featured).length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Featured
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                        {[...new Set(projects.map(p => p.category))].length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Categories
                    </div>
                </div>
            </div>
        </div>
    );
}
