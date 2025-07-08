import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
    Edit2, 
    Trash2, 
    Eye, 
    Star, 
    Calendar, 
    User, 
    Link as LinkIcon, 
    ExternalLink,
    Github,
    Globe,
    Tag,
    Clock,
    CheckCircle,
    XCircle,
    MoreVertical,
    Copy,
    Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger 
} from '@/components/ui/tooltip';

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
    github_url: string | null;
    technologies: string[];
}

interface ProjectManagementCardProps {
    project: Project;
    onEdit?: (project: Project) => void;
    onDelete?: (project: Project) => void;
    onView?: (project: Project) => void;
    onToggleFeatured?: (project: Project) => void;
    onToggleStatus?: (project: Project) => void;
    onDuplicate?: (project: Project) => void;
    className?: string;
}

export function ProjectManagementCard({
    project,
    onEdit,
    onDelete,
    onView,
    onToggleFeatured,
    onToggleStatus,
    onDuplicate,
    className
}: ProjectManagementCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'published':
                return <CheckCircle className="w-3 h-3" />;
            case 'draft':
                return <Clock className="w-3 h-3" />;
            default:
                return <XCircle className="w-3 h-3" />;
        }
    };

    return (
        <TooltipProvider>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ 
                    duration: 0.3,
                    hover: { type: "spring", stiffness: 300 }
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className={cn(
                    "group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300",
                    className
                )}
            >
                {/* Featured Badge */}
                {project.is_featured && (
                    <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs font-medium">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                        </Badge>
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-10">
                    <Badge className={cn("text-xs font-medium border", getStatusColor(project.status))}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1 capitalize">{project.status}</span>
                    </Badge>
                </div>

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {project.image ? (
                        <img 
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                                <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <span className="text-sm text-gray-500">No image</span>
                            </div>
                        </div>
                    )}
                    
                    {/* Overlay with quick actions */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2"
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => onView?.(project)}
                                    className="bg-white/90 hover:bg-white text-gray-900"
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Project</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => onEdit?.(project)}
                                    className="bg-white/90 hover:bg-white text-gray-900"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Project</TooltipContent>
                        </Tooltip>

                        {project.project_url && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => window.open(project.project_url!, '_blank')}
                                        className="bg-white/90 hover:bg-white text-gray-900"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Visit Live Site</TooltipContent>
                            </Tooltip>
                        )}

                        {project.github_url && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => window.open(project.github_url!, '_blank')}
                                        className="bg-white/90 hover:bg-white text-gray-900"
                                    >
                                        <Github className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>View Source Code</TooltipContent>
                            </Tooltip>
                        )}
                    </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-4 space-y-3">
                    {/* Title and Category */}
                    <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1 group-hover:text-[#20B2AA] transition-colors">
                                {project.title}
                            </h3>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem onClick={() => onView?.(project)}>
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onEdit?.(project)}>
                                        <Edit2 className="w-4 h-4 mr-2" />
                                        Edit Project
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onDuplicate?.(project)}>
                                        <Copy className="w-4 h-4 mr-2" />
                                        Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                        onClick={() => onToggleFeatured?.(project)}
                                        className={project.is_featured ? "text-yellow-600" : ""}
                                    >
                                        <Star className={cn("w-4 h-4 mr-2", project.is_featured && "fill-current")} />
                                        {project.is_featured ? 'Remove from Featured' : 'Mark as Featured'}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onToggleStatus?.(project)}>
                                        {project.status === 'published' ? (
                                            <>
                                                <Archive className="w-4 h-4 mr-2" />
                                                Move to Draft
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Publish
                                            </>
                                        )}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                        onClick={() => onDelete?.(project)}
                                        className="text-red-600 focus:text-red-600"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        
                        <Badge variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {project.category}
                        </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {tech}
                                </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                    +{project.technologies.length - 3} more
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Project Meta Information */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            {project.client_name && (
                                <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    <span className="truncate max-w-20">{project.client_name}</span>
                                </div>
                            )}
                            
                            {project.completion_date && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{project.completion_date}</span>
                                </div>
                            )}
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex items-center gap-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onToggleFeatured?.(project)}
                                        className={cn(
                                            "h-6 w-6 p-0 transition-colors",
                                            project.is_featured 
                                                ? "text-yellow-500 hover:text-yellow-600" 
                                                : "text-gray-400 hover:text-yellow-500"
                                        )}
                                    >
                                        <Star className={cn("w-3 h-3", project.is_featured && "fill-current")} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {project.is_featured ? 'Remove from Featured' : 'Mark as Featured'}
                                </TooltipContent>
                            </Tooltip>

                            {project.project_url && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => window.open(project.project_url!, '_blank')}
                                            className="h-6 w-6 p-0 text-gray-400 hover:text-[#20B2AA]"
                                        >
                                            <LinkIcon className="w-3 h-3" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Visit Project</TooltipContent>
                                </Tooltip>
                            )}

                            {project.github_url && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => window.open(project.github_url!, '_blank')}
                                            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                                        >
                                            <Github className="w-3 h-3" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>View Source Code</TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </TooltipProvider>
    );
}
