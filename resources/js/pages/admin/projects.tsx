import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Plus,
    Search,
    Star,
    Edit2,
    Trash2,
    Calendar,
    Link as LinkIcon,
    MoreHorizontal,
    Eye,
    Grid,
    List
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import DeleteConfirmation from '@/components/ui/delete-confirmation';
import { motion } from 'framer-motion';
import Combobox from '@/components/ui/combobox';
import TagInput from '@/components/ui/tag-input';
import { Checkbox } from '@/components/ui/checkbox';
import { ProjectManagementGrid } from '@/components/ui/project-management-grid';

const categoryOptions = [
    'Web Design',
    'Web App',
    'Mobile App',
    'Branding',
    'UI/UX Design',
] as const;

const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
] as const;

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

interface Content {
    // Home page projects section
    home_section_badge: string;
    home_section_title: string;
    home_section_description: string;
    home_section_button_text: string;

    // Projects page content
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

    // Filter categories and statistics
    filter_categories: string[];
    stat_total_projects: string;
    stat_categories: string;
    stat_technologies: string;
    stat_clients: string;
}

interface Props {
    projects: Project[];
    content?: Content;
}

interface ProjectFormData {
    title: string;
    description: string;
    category: string;
    status: 'draft' | 'published';
    is_featured: boolean;
    client_name: string;
    project_url: string;
    github_url: string;
    completion_date: string;
    technologies: string[];
    image: File | string | null;
    [key: string]: any;
}

export default function Projects({ projects: initialProjects, content }: Props) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
    const [selectedStatus, setSelectedStatus] = useState<string>('All Status');
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

    // Get all available categories (static + dynamic + existing project categories)
    const getAllCategories = () => {
        const staticCategories = [...categoryOptions];
        const dynamicCategories = content?.filter_categories || [];
        const existingCategories = [...new Set(projects.map(p => p.category))];

        // Combine all categories and remove duplicates
        const allCategories = [...new Set([
            ...staticCategories,
            ...dynamicCategories,
            ...existingCategories
        ])].filter(Boolean); // Remove empty strings

        return allCategories.sort();
    };

    const form = useForm<ProjectFormData>({
        title: '',
        description: '',
        category: '',
        status: 'draft',
        is_featured: false,
        client_name: '',
        project_url: '',
        github_url: '',
        completion_date: '',
        technologies: [],
        image: null,
    });

    const editForm = useForm<ProjectFormData>({
        title: '',
        description: '',
        category: '',
        status: 'draft',
        is_featured: false,
        client_name: '',
        project_url: '',
        github_url: '',
        completion_date: '',
        technologies: [],
        image: null,
    });

    // Content management form
    const contentForm = useForm({
        // Home page projects section
        home_section_badge: content?.home_section_badge || 'Portfolio',
        home_section_title: content?.home_section_title || 'Featured Projects',
        home_section_description: content?.home_section_description || 'Explore my latest work and see how I have helped clients achieve their goals',
        home_section_button_text: content?.home_section_button_text || 'Explore All Projects',

        // Projects page content
        page_title: content?.page_title || 'My Projects',
        page_description: content?.page_description || 'Explore my portfolio of innovative projects that showcase creativity, technical expertise, and problem-solving skills.',
        page_badge: content?.page_badge || 'Portfolio',
        total_projects_label: content?.total_projects_label || 'Total Projects',
        categories_label: content?.categories_label || 'Categories',
        technologies_label: content?.technologies_label || 'Technologies',
        clients_label: content?.clients_label || 'Happy Clients',
        search_placeholder: content?.search_placeholder || 'Search projects...',
        all_categories_text: content?.all_categories_text || 'All Categories',
        projects_section_title: content?.projects_section_title || 'Featured Work',
        cta_title: content?.cta_title || 'Ready to Start Your Project?',
        cta_description: content?.cta_description || 'Let\'s collaborate to bring your ideas to life with innovative solutions and exceptional results.',
        cta_primary_button: content?.cta_primary_button || 'Start a Project',
        cta_secondary_button: content?.cta_secondary_button || 'View All Services',
        cta_primary_url: content?.cta_primary_url || '#contact',
        cta_secondary_url: content?.cta_secondary_url || '/services',

        // Filter categories and custom statistics
        filter_categories: content?.filter_categories || ['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding'],
        stat_total_projects: content?.stat_total_projects || '',
        stat_categories: content?.stat_categories || '',
        stat_technologies: content?.stat_technologies || '',
        stat_clients: content?.stat_clients || '',
    });

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All Categories' || project.category === selectedCategory;
        const matchesStatus = selectedStatus === 'All Status' || project.status === selectedStatus.toLowerCase();
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create FormData for file upload (same pattern as services and edit form)
        const formData = new FormData();

        // Append all form fields
        formData.append('title', form.data.title);
        formData.append('description', form.data.description || '');
        formData.append('category', form.data.category);
        formData.append('status', form.data.status);
        formData.append('is_featured', form.data.is_featured ? '1' : '0');
        formData.append('client_name', form.data.client_name || '');
        formData.append('project_url', form.data.project_url || '');
        formData.append('github_url', form.data.github_url || '');
        formData.append('completion_date', form.data.completion_date || '');

        // Handle technologies array
        if (form.data.technologies && form.data.technologies.length > 0) {
            form.data.technologies.forEach((tech, index) => {
                formData.append(`technologies[${index}]`, tech);
            });
        }

        // Handle image file
        if (form.data.image && form.data.image instanceof File) {
            formData.append('image', form.data.image);
        }

        // Use router.post with FormData
        router.post(route('admin.projects.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setIsAddDialogOpen(false);
                form.reset();
                toast.success('Project created successfully');

                // Reload the page to get fresh data
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            onError: (errors) => {
                console.error('Create error:', errors);
                toast.error('Failed to create project. Please check the form for errors.');
            }
        });
    };

    const confirmDelete = (project: Project) => {
        setProjectToDelete(project);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        if (!projectToDelete) return;

        try {
            await fetch(route('admin.projects.destroy', { project: projectToDelete.id }), {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') || '',
                },
            });
            setProjects(projects.filter(p => p.id !== projectToDelete.id));
            toast.success('Project deleted successfully');
        } catch (error) {
            toast.error('Failed to delete project');
        } finally {
            setDeleteConfirmOpen(false);
            setProjectToDelete(null);
        }
    };

    const handleToggleFeatured = async (project: Project) => {
        try {
            await fetch(route('admin.projects.toggle-featured', { project: project.id }), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') || '',
                },
            });
            setProjects(projects.map(p => 
                p.id === project.id ? { ...p, is_featured: !p.is_featured } : p
            ));
            toast.success('Project featured status updated successfully');
        } catch (error) {
            toast.error('Failed to update featured status');
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        editForm.setData({
            title: project.title,
            description: project.description,
            category: project.category,
            status: project.status,
            is_featured: project.is_featured,
            client_name: project.client_name ?? '',
            project_url: project.project_url ?? '',
            github_url: project.github_url ?? '',
            completion_date: project.completion_date,
            technologies: project.technologies,
            image: project.image,
        } as any);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject) return;

        // Create FormData for file upload (same pattern as services)
        const formData = new FormData();

        // Append all form fields
        formData.append('title', editForm.data.title);
        formData.append('description', editForm.data.description || '');
        formData.append('category', editForm.data.category);
        formData.append('status', editForm.data.status);
        formData.append('is_featured', editForm.data.is_featured ? '1' : '0');
        formData.append('client_name', editForm.data.client_name || '');
        formData.append('project_url', editForm.data.project_url || '');
        formData.append('github_url', editForm.data.github_url || '');
        formData.append('completion_date', editForm.data.completion_date || '');

        // Handle technologies array
        if (editForm.data.technologies && editForm.data.technologies.length > 0) {
            editForm.data.technologies.forEach((tech: string, index: number) => {
                formData.append(`technologies[${index}]`, tech);
            });
        }

        // Handle image file
        if (editForm.data.image && (editForm.data.image as any) instanceof File) {
            formData.append('image', editForm.data.image as File);
        }

        // Use router.post with method spoofing (same pattern as services)
        router.post(route('admin.projects.update', { project: editingProject.id }), formData, {
            forceFormData: true,
            onBefore: () => {
                // Add the _method field to make Laravel recognize this as a PUT request
                formData.append('_method', 'PUT');
                return true;
            },
            onSuccess: () => {
                setEditingProject(null);
                editForm.reset();
                toast.success('Project updated successfully');

                // Reload the page to get fresh data
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            onError: (errors) => {
                console.error('Update error:', errors);
                toast.error('Failed to update project. Please check the form for errors.');
            }
        });
    };

    // Handle content form submission
    const handleContentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        contentForm.post(route('admin.projects.content.update'), {
            onSuccess: () => {
                toast.success('Projects content updated successfully');
            },
        });
    };

    // New handlers for project management cards
    const handleView = (project: Project) => {
        // Navigate to project detail page or open in new tab
        window.open(`/projects/${project.id}`, '_blank');
    };

    const handleToggleStatus = async (project: Project) => {
        const newStatus = project.status === 'published' ? 'draft' : 'published';

        try {
            await fetch(route('admin.projects.update', { project: project.id }), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            // Update local state
            setProjects(projects.map(p =>
                p.id === project.id ? { ...p, status: newStatus as 'draft' | 'published' } : p
            ));

            toast.success(`Project ${newStatus === 'published' ? 'published' : 'moved to draft'} successfully`);
        } catch (error) {
            toast.error('Failed to update project status');
        }
    };

    const handleDuplicate = (project: Project) => {
        // Pre-fill the add form with project data (excluding id and dates)
        form.setData({
            title: `${project.title} (Copy)`,
            description: project.description,
            category: project.category,
            status: 'draft',
            is_featured: false,
            client_name: project.client_name || '',
            project_url: '',
            github_url: '',
            completion_date: '',
            technologies: project.technologies,
            image: null,
        });
        setIsAddDialogOpen(true);
        toast.info('Project data copied to new project form');
    };

    return (
        <AdminLayout>
            <Head title="Projects - Portfolio Admin" />

            <div className="p-6 space-y-6">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                                Projects
                            </h1>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className={cn(
                                    "px-2.5 py-0.5 text-xs font-medium",
                                    "bg-green-50 text-green-700 rounded-full",
                                    "border border-green-100"
                                )}
                            >
                                {filteredProjects.length} Total
                            </motion.div>
                        </div>
                        <p className="text-sm text-gray-500">Manage and organize your portfolio projects</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => setIsAddDialogOpen(true)}
                            className={cn(
                                "bg-[#20B2AA] hover:bg-[#1a9994]",
                                "text-white"
                            )}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Project
                        </Button>
                    </div>
                </motion.div>

                {/* Tabs for Projects Management and Content Management */}
                <Tabs defaultValue="projects" className="w-full">
                    <TabsList className="mb-6 border border-gray-200">
                        <TabsTrigger
                            value="projects"
                            className="border-r border-gray-200"
                        >
                            Projects Management
                        </TabsTrigger>
                        <TabsTrigger value="content" className="bg-red-50">Content Management</TabsTrigger>
                    </TabsList>

                    {/* Projects Management Tab */}
                    <TabsContent value="projects" className="space-y-6">
                        {/* Search and Filters */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium text-gray-700">Filters</h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All Categories');
                                setSelectedStatus('All Status');
                            }}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Clear Filters
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[240px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 w-full bg-white border-gray-200 focus:ring-[#20B2AA] focus:border-[#20B2AA]"
                                />
                            </div>
                        </div>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[180px] bg-white border-gray-200">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Categories">All Categories</SelectItem>
                                {categoryOptions.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-[180px] bg-white border-gray-200">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Status">All Status</SelectItem>
                                {statusOptions.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center justify-end gap-2 mt-4">
                        <span className="text-sm text-gray-600">View:</span>
                        <div className="flex items-center border border-gray-200 rounded-lg p-1">
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "h-7 px-2",
                                    viewMode === 'grid'
                                        ? "bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                        : "hover:bg-gray-100"
                                )}
                            >
                                <Grid className="w-3 h-3" />
                            </Button>
                            <Button
                                variant={viewMode === 'table' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('table')}
                                className={cn(
                                    "h-7 px-2",
                                    viewMode === 'table'
                                        ? "bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                        : "hover:bg-gray-100"
                                )}
                            >
                                <List className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Conditional Rendering: Grid or Table View */}
                {viewMode === 'grid' ? (
                    <ProjectManagementGrid
                        projects={filteredProjects}
                        onEdit={handleEdit}
                        onDelete={confirmDelete}
                        onView={handleView}
                        onToggleFeatured={handleToggleFeatured}
                        onToggleStatus={handleToggleStatus}
                        onDuplicate={handleDuplicate}
                        onAddNew={() => setIsAddDialogOpen(true)}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                    />
                ) : (
                    /* Projects Table */
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                    <div className="p-4 bg-gray-50/50 border-b border-gray-200">
                        <h2 className="text-sm font-medium text-gray-700">Project List</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className={cn(
                                        "text-left py-3.5 px-4 text-xs font-medium",
                                        "text-gray-500 uppercase tracking-wider"
                                    )}>
                                        Image
                                    </th>
                                    <th className="text-left py-3.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-1">
                                            Title
                                            <svg className="w-3 h-3 text-gray-400" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 2.5L9 6H3L6 2.5Z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th className={cn(
                                        "text-left py-3.5 px-4 text-xs font-medium",
                                        "text-gray-500 uppercase tracking-wider"
                                    )}>
                                        Category
                                    </th>
                                    <th className={cn(
                                        "text-left py-3.5 px-4 text-xs font-medium",
                                        "text-gray-500 uppercase tracking-wider"
                                    )}>
                                        Status
                                    </th>
                                    <th className={cn(
                                        "text-left py-3.5 px-4 text-xs font-medium",
                                        "text-gray-500 uppercase tracking-wider"
                                    )}>
                                        Featured
                                    </th>
                                    <th className="text-left py-3.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-1">
                                            Date
                                            <svg className="w-3 h-3 text-gray-400" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 2.5L9 6H3L6 2.5Z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="text-left py-3.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredProjects.map((project, index) => (
                                    <motion.tr
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50/50 transition-all duration-300 group"
                                    >
                                        <td className="py-4 px-4">
                                            <motion.div 
                                                whileHover={{ scale: 1.05 }}
                                                className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden ring-1 ring-gray-200 transition-transform duration-300"
                                            >
                                                {project.image ? (
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <LinkIcon className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </motion.div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <motion.div 
                                                whileHover={{ x: 5 }}
                                                className="font-medium text-gray-900 transition-colors duration-300 group-hover:text-[#20B2AA]"
                                            >
                                                {project.title}
                                            </motion.div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <motion.span
                                                whileHover={{ scale: 1.05 }}
                                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 transition-all duration-300 hover:bg-blue-100"
                                            >
                                                {project.category}
                                            </motion.span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <motion.span
                                                whileHover={{ scale: 1.05 }}
                                                className={cn(
                                                    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-300",
                                                    project.status === 'published'
                                                        ? "bg-green-50 text-green-700 border-green-100 hover:bg-green-100"
                                                        : "bg-yellow-50 text-yellow-700 border-yellow-100 hover:bg-yellow-100"
                                                )}
                                            >
                                                {project.status === 'published' ? 'Published' : 'Draft'}
                                            </motion.span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <motion.button
                                                whileHover={{ scale: 1.2, rotate: 180 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleToggleFeatured(project)}
                                                className={cn(
                                                    "transition-colors duration-300",
                                                    project.is_featured ? "text-yellow-400" : "text-gray-300 hover:text-gray-400"
                                                )}
                                            >
                                                <Star className="w-5 h-5 fill-current" />
                                            </motion.button>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-500">{project.completion_date}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-1 text-gray-400 hover:text-[#20B2AA] transition-colors duration-300"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleEdit(project)}
                                                    className="p-1 text-gray-400 hover:text-[#20B2AA] transition-colors duration-300"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => {
                                                        setProjectToDelete(project);
                                                        setDeleteConfirmOpen(true);
                                                    }}
                                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-300"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {filteredProjects.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <div className="mb-4">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                                    </svg>
                                                </div>
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
                                                <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
                                                <div className="mt-6">
                                                    <Button
                                                        onClick={() => setIsAddDialogOpen(true)}
                                                        className="bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        New Project
                                                    </Button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    </motion.div>
                )}
                    </TabsContent>

                    {/* Content Management Tab */}
                    <TabsContent value="content" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Projects Page Content Management</CardTitle>
                                <CardDescription>
                                    Manage the content and text displayed on the projects page.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleContentSubmit} className="space-y-6">
                                    {/* Home Page Projects Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Home Page Projects Section</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="home_section_badge">Section Badge</Label>
                                                <Input
                                                    id="home_section_badge"
                                                    value={contentForm.data.home_section_badge}
                                                    onChange={e => contentForm.setData('home_section_badge', e.target.value)}
                                                    placeholder="Portfolio"
                                                />
                                                {contentForm.errors.home_section_badge && (
                                                    <p className="text-sm text-red-500">{contentForm.errors.home_section_badge}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="home_section_title">Section Title</Label>
                                                <Input
                                                    id="home_section_title"
                                                    value={contentForm.data.home_section_title}
                                                    onChange={e => contentForm.setData('home_section_title', e.target.value)}
                                                    placeholder="Featured Projects"
                                                />
                                                {contentForm.errors.home_section_title && (
                                                    <p className="text-sm text-red-500">{contentForm.errors.home_section_title}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="home_section_description">Section Description</Label>
                                            <Textarea
                                                id="home_section_description"
                                                value={contentForm.data.home_section_description}
                                                onChange={e => contentForm.setData('home_section_description', e.target.value)}
                                                placeholder="Explore my latest work and see how I have helped clients achieve their goals"
                                                rows={3}
                                            />
                                            {contentForm.errors.home_section_description && (
                                                <p className="text-sm text-red-500">{contentForm.errors.home_section_description}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="home_section_button_text">Button Text</Label>
                                            <Input
                                                id="home_section_button_text"
                                                value={contentForm.data.home_section_button_text}
                                                onChange={e => contentForm.setData('home_section_button_text', e.target.value)}
                                                placeholder="Explore All Projects"
                                            />
                                            {contentForm.errors.home_section_button_text && (
                                                <p className="text-sm text-red-500">{contentForm.errors.home_section_button_text}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Page Header Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Projects Page Header</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="page_title">Page Title</Label>
                                                <Input
                                                    id="page_title"
                                                    value={contentForm.data.page_title}
                                                    onChange={e => contentForm.setData('page_title', e.target.value)}
                                                    placeholder="My Projects"
                                                />
                                                {contentForm.errors.page_title && (
                                                    <p className="text-sm text-red-500">{contentForm.errors.page_title}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="page_badge">Page Badge</Label>
                                                <Input
                                                    id="page_badge"
                                                    value={contentForm.data.page_badge}
                                                    onChange={e => contentForm.setData('page_badge', e.target.value)}
                                                    placeholder="Portfolio"
                                                />
                                                {contentForm.errors.page_badge && (
                                                    <p className="text-sm text-red-500">{contentForm.errors.page_badge}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="page_description">Page Description</Label>
                                            <Textarea
                                                id="page_description"
                                                value={contentForm.data.page_description}
                                                onChange={e => contentForm.setData('page_description', e.target.value)}
                                                placeholder="Explore my portfolio of innovative projects..."
                                                rows={3}
                                            />
                                            {contentForm.errors.page_description && (
                                                <p className="text-sm text-red-500">{contentForm.errors.page_description}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Custom Statistics Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Custom Statistics Numbers</h3>
                                        <p className="text-sm text-gray-600">Leave empty to use auto-calculated values</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="stat_total_projects">Total Projects Number</Label>
                                                <Input
                                                    id="stat_total_projects"
                                                    value={contentForm.data.stat_total_projects}
                                                    onChange={e => contentForm.setData('stat_total_projects', e.target.value)}
                                                    placeholder="12+ (or leave empty for auto)"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="stat_categories">Categories Number</Label>
                                                <Input
                                                    id="stat_categories"
                                                    value={contentForm.data.stat_categories}
                                                    onChange={e => contentForm.setData('stat_categories', e.target.value)}
                                                    placeholder="5 (or leave empty for auto)"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="stat_technologies">Technologies Number</Label>
                                                <Input
                                                    id="stat_technologies"
                                                    value={contentForm.data.stat_technologies}
                                                    onChange={e => contentForm.setData('stat_technologies', e.target.value)}
                                                    placeholder="28+ (or leave empty for auto)"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="stat_clients">Clients Number</Label>
                                                <Input
                                                    id="stat_clients"
                                                    value={contentForm.data.stat_clients}
                                                    onChange={e => contentForm.setData('stat_clients', e.target.value)}
                                                    placeholder="12+ (or leave empty for auto)"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Statistics Labels Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Statistics Labels</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="total_projects_label">Total Projects Label</Label>
                                                <Input
                                                    id="total_projects_label"
                                                    value={contentForm.data.total_projects_label}
                                                    onChange={e => contentForm.setData('total_projects_label', e.target.value)}
                                                    placeholder="Total Projects"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="categories_label">Categories Label</Label>
                                                <Input
                                                    id="categories_label"
                                                    value={contentForm.data.categories_label}
                                                    onChange={e => contentForm.setData('categories_label', e.target.value)}
                                                    placeholder="Categories"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="technologies_label">Technologies Label</Label>
                                                <Input
                                                    id="technologies_label"
                                                    value={contentForm.data.technologies_label}
                                                    onChange={e => contentForm.setData('technologies_label', e.target.value)}
                                                    placeholder="Technologies"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="clients_label">Clients Label</Label>
                                                <Input
                                                    id="clients_label"
                                                    value={contentForm.data.clients_label}
                                                    onChange={e => contentForm.setData('clients_label', e.target.value)}
                                                    placeholder="Happy Clients"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Filter Categories Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Filter Categories</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Filter Categories (Used on both Home and Projects pages)</Label>
                                                <div className="space-y-2">
                                                    {contentForm.data.filter_categories.map((category, index) => (
                                                        <div key={index} className="flex items-center gap-2">
                                                            <Input
                                                                value={category}
                                                                onChange={(e) => {
                                                                    const newCategories = [...contentForm.data.filter_categories];
                                                                    newCategories[index] = e.target.value;
                                                                    contentForm.setData('filter_categories', newCategories);
                                                                }}
                                                                placeholder="Category name"
                                                                className="flex-1"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    const newCategories = contentForm.data.filter_categories.filter((_, i) => i !== index);
                                                                    contentForm.setData('filter_categories', newCategories);
                                                                }}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            contentForm.setData('filter_categories', [...contentForm.data.filter_categories, '']);
                                                        }}
                                                        className="w-full"
                                                    >
                                                        Add Category
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Filter Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Filter Section</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="search_placeholder">Search Placeholder</Label>
                                                <Input
                                                    id="search_placeholder"
                                                    value={contentForm.data.search_placeholder}
                                                    onChange={e => contentForm.setData('search_placeholder', e.target.value)}
                                                    placeholder="Search projects..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="all_categories_text">All Categories Text</Label>
                                                <Input
                                                    id="all_categories_text"
                                                    value={contentForm.data.all_categories_text}
                                                    onChange={e => contentForm.setData('all_categories_text', e.target.value)}
                                                    placeholder="All Categories"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Projects Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Projects Section</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="projects_section_title">Section Title</Label>
                                                <Input
                                                    id="projects_section_title"
                                                    value={contentForm.data.projects_section_title}
                                                    onChange={e => contentForm.setData('projects_section_title', e.target.value)}
                                                    placeholder="Featured Work"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Call to Action Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Call to Action Section</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="cta_title">CTA Title</Label>
                                                <Input
                                                    id="cta_title"
                                                    value={contentForm.data.cta_title}
                                                    onChange={e => contentForm.setData('cta_title', e.target.value)}
                                                    placeholder="Ready to Start Your Project?"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cta_description">CTA Description</Label>
                                            <Textarea
                                                id="cta_description"
                                                value={contentForm.data.cta_description}
                                                onChange={e => contentForm.setData('cta_description', e.target.value)}
                                                placeholder="Let's collaborate to bring your ideas to life..."
                                                rows={3}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="cta_primary_button">Primary Button Text</Label>
                                                <Input
                                                    id="cta_primary_button"
                                                    value={contentForm.data.cta_primary_button}
                                                    onChange={e => contentForm.setData('cta_primary_button', e.target.value)}
                                                    placeholder="Start a Project"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cta_secondary_button">Secondary Button Text</Label>
                                                <Input
                                                    id="cta_secondary_button"
                                                    value={contentForm.data.cta_secondary_button}
                                                    onChange={e => contentForm.setData('cta_secondary_button', e.target.value)}
                                                    placeholder="View All Services"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cta_primary_url">Primary Button URL</Label>
                                                <Input
                                                    id="cta_primary_url"
                                                    value={contentForm.data.cta_primary_url}
                                                    onChange={e => contentForm.setData('cta_primary_url', e.target.value)}
                                                    placeholder="#contact"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cta_secondary_url">Secondary Button URL</Label>
                                                <Input
                                                    id="cta_secondary_url"
                                                    value={contentForm.data.cta_secondary_url}
                                                    onChange={e => contentForm.setData('cta_secondary_url', e.target.value)}
                                                    placeholder="/services"
                                                />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            className="bg-[#20B2AA] hover:bg-[#1a9994]"
                                            disabled={contentForm.processing}
                                        >
                                            {contentForm.processing ? 'Saving...' : 'Save Content'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Add Project Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Plus className="w-5 h-5 text-[#20B2AA]" />
                            Add New Project
                        </DialogTitle>
                        <DialogDescription>
                            Add a new project to your portfolio. Fill in the project details below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Project Title
                                    <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    value={form.data.title}
                                    onChange={e => form.setData('title', e.target.value)}
                                    className="w-full"
                                    placeholder="Enter project title"
                                />
                                {form.errors.title && (
                                    <p className="text-sm text-red-500">{form.errors.title}</p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Description
                                    <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    value={form.data.description}
                                    onChange={e => form.setData('description', e.target.value)}
                                    className="w-full min-h-[100px]"
                                    placeholder="Enter project description"
                                />
                                {form.errors.description && (
                                    <p className="text-sm text-red-500">{form.errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Category
                                    <span className="text-red-500">*</span>
                                </label>
                                <Combobox
                                    value={form.data.category}
                                    onChange={(value) => form.setData('category', value as any)}
                                    options={getAllCategories()}
                                    placeholder="Select or type category..."
                                    allowCustom={true}
                                    error={form.errors.category}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Status
                                    <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    value={form.data.status}
                                    onValueChange={(value: 'draft' | 'published') => form.setData('status', value as any)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.status && (
                                    <p className="text-sm text-red-500">{form.errors.status}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Client Name
                                </label>
                                <Input
                                    type="text"
                                    value={form.data.client_name}
                                    onChange={e => form.setData('client_name', e.target.value)}
                                    className="w-full"
                                    placeholder="Enter client name"
                                />
                                {form.errors.client_name && (
                                    <p className="text-sm text-red-500">{form.errors.client_name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Live Demo URL
                                </label>
                                <Input
                                    type="url"
                                    value={form.data.project_url}
                                    onChange={e => form.setData('project_url', e.target.value)}
                                    className="w-full"
                                    placeholder="https://example.com"
                                />
                                {form.errors.project_url && (
                                    <p className="text-sm text-red-500">{form.errors.project_url}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    GitHub Repository URL
                                </label>
                                <Input
                                    type="url"
                                    value={form.data.github_url}
                                    onChange={e => form.setData('github_url', e.target.value)}
                                    className="w-full"
                                    placeholder="https://github.com/username/repository"
                                />
                                {form.errors.github_url && (
                                    <p className="text-sm text-red-500">{form.errors.github_url}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Completion Date
                                </label>
                                <Input
                                    type="date"
                                    value={form.data.completion_date}
                                    onChange={e => form.setData('completion_date', e.target.value)}
                                    className="w-full"
                                />
                                {form.errors.completion_date && (
                                    <p className="text-sm text-red-500">{form.errors.completion_date}</p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Technologies Used
                                </label>
                                <TagInput
                                    value={form.data.technologies}
                                    onChange={(tags) => form.setData('technologies', tags)}
                                    placeholder="Type a technology and press Enter (e.g., React, Laravel)"
                                    error={form.errors.technologies}
                                    maxTags={15}
                                />
                                <p className="text-xs text-gray-500">Add technologies used in this project</p>
                                {form.errors.technologies && (
                                    <p className="text-sm text-red-500">{form.errors.technologies}</p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_featured"
                                        checked={form.data.is_featured}
                                        onCheckedChange={(checked) => form.setData('is_featured', checked as boolean)}
                                    />
                                    <label
                                        htmlFor="is_featured"
                                        className="text-sm font-medium text-gray-700 cursor-pointer"
                                    >
                                        Featured Project
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">Featured projects will be highlighted on the homepage</p>
                                {form.errors.is_featured && (
                                    <p className="text-sm text-red-500">{form.errors.is_featured}</p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Project Image
                                </label>
                                <div className="mt-1 flex flex-col gap-4">
                                    {form.data.image && (form.data.image as any) instanceof File && (
                                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                                            <div className="relative group">
                                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border-2 border-[#20B2AA] bg-[#E6F7F6]">
                                                    <img
                                                        src={URL.createObjectURL(form.data.image as File)}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => form.setData('image', null)}
                                                            className="text-white hover:text-red-400 transition-colors"
                                                        >
                                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-3 sm:space-y-4">
                                        <div>
                                            <label 
                                                htmlFor="project-image-upload" 
                                                className={cn(
                                                    "flex flex-col items-center justify-center w-full h-20 sm:h-24 rounded-lg cursor-pointer transition-all duration-200",
                                                    "border-2 border-dashed",
                                                    form.data.image
                                                        ? "border-[#20B2AA] bg-[#E6F7F6] hover:bg-[#d9f2f1]"
                                                        : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                                )}
                                            >
                                                <div className="flex flex-col items-center justify-center py-3 sm:py-4 px-2">
                                                    <svg className={cn(
                                                        "w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3",
                                                        form.data.image ? "text-[#20B2AA]" : "text-gray-400"
                                                    )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-500 text-center">
                                                        <span className="font-medium">Click to upload</span>
                                                        <span className="hidden sm:inline"> or drag and drop</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500 text-center">PNG, JPG or WEBP (MAX. 2MB)</p>
                                                </div>
                                                <input 
                                                    id="project-image-upload"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={e => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            // Validate file type
                                                            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
                                                            if (!validTypes.includes(file.type)) {
                                                                toast.error('Please upload a valid image file (PNG, JPG or WEBP)');
                                                                return;
                                                            }
                                                            // Validate file size (2MB)
                                                            if (file.size > 2 * 1024 * 1024) {
                                                                toast.error('Image size should be less than 2MB');
                                                                return;
                                                            }
                                                            form.setData('image', file as any);
                                                        }
                                                    }}
                                                    accept="image/png,image/jpeg,image/webp"
                                                />
                                            </label>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Recommended image specifications:</span>
                                            </div>
                                            <ul className="pl-5 space-y-1">
                                                <li className="text-xs text-gray-500 flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                                    Size: 1200x800px (3:2 ratio)
                                                </li>
                                                <li className="text-xs text-gray-500 flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                                    Format: PNG, JPG or WEBP
                                                </li>
                                                <li className="text-xs text-gray-500 flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                                    Max size: 2MB
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {form.errors.image && (
                                    <p className="text-sm text-red-500 mt-1">{form.errors.image}</p>
                                )}
                            </div>
                        </div>

                        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsAddDialogOpen(false)}
                                className="w-full sm:w-auto sm:mr-2 order-2 sm:order-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#20B2AA] hover:bg-[#1a9994] text-white w-full sm:w-auto order-1 sm:order-2"
                                disabled={form.processing}
                            >
                                {form.processing ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating...
                                    </div>
                                ) : (
                                    'Create Project'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Project Dialog */}
            <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
                <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit2 className="w-5 h-5 text-[#20B2AA]" />
                            Edit Project
                        </DialogTitle>
                        <DialogDescription>
                            Update the project details below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdate} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Project Title
                                    <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    value={editForm.data.title}
                                    onChange={e => editForm.setData('title', e.target.value)}
                                    className="w-full"
                                    placeholder="Enter project title"
                                />
                                {editForm.errors.title && (
                                    <p className="text-sm text-red-500">{editForm.errors.title}</p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Description
                                    <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    value={editForm.data.description}
                                    onChange={e => editForm.setData('description', e.target.value)}
                                    className="w-full min-h-[100px]"
                                    placeholder="Enter project description"
                                />
                                {editForm.errors.description && (
                                    <p className="text-sm text-red-500">{editForm.errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Category
                                    <span className="text-red-500">*</span>
                                </label>
                                <Combobox
                                    value={editForm.data.category}
                                    onChange={(value) => editForm.setData('category', value as any)}
                                    options={getAllCategories()}
                                    placeholder="Select or type category..."
                                    allowCustom={true}
                                    error={editForm.errors.category}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Status
                                    <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    value={editForm.data.status}
                                    onValueChange={(value: 'draft' | 'published') => editForm.setData('status', value as any)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {editForm.errors.status && (
                                    <p className="text-sm text-red-500">{editForm.errors.status}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Client Name
                                </label>
                                <Input
                                    type="text"
                                    value={editForm.data.client_name}
                                    onChange={e => editForm.setData('client_name', e.target.value)}
                                    className="w-full"
                                    placeholder="Enter client name"
                                />
                                {editForm.errors.client_name && (
                                    <p className="text-sm text-red-500">{editForm.errors.client_name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Live Demo URL
                                </label>
                                <Input
                                    type="url"
                                    value={editForm.data.project_url}
                                    onChange={e => editForm.setData('project_url', e.target.value)}
                                    className="w-full"
                                    placeholder="https://example.com"
                                />
                                {editForm.errors.project_url && (
                                    <p className="text-sm text-red-500">{editForm.errors.project_url}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    GitHub Repository URL
                                </label>
                                <Input
                                    type="url"
                                    value={editForm.data.github_url}
                                    onChange={e => editForm.setData('github_url', e.target.value)}
                                    className="w-full"
                                    placeholder="https://github.com/username/repository"
                                />
                                {editForm.errors.github_url && (
                                    <p className="text-sm text-red-500">{editForm.errors.github_url}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Completion Date
                                </label>
                                <Input
                                    type="date"
                                    value={editForm.data.completion_date}
                                    onChange={e => editForm.setData('completion_date', e.target.value)}
                                    className="w-full"
                                />
                                {editForm.errors.completion_date && (
                                    <p className="text-sm text-red-500">{editForm.errors.completion_date}</p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Technologies Used
                                </label>
                                <TagInput
                                    value={editForm.data.technologies}
                                    onChange={(tags) => editForm.setData('technologies', tags)}
                                    placeholder="Type a technology and press Enter (e.g., React, Laravel)"
                                    error={editForm.errors.technologies}
                                    maxTags={15}
                                />
                                <p className="text-xs text-gray-500">Add technologies used in this project</p>
                                {editForm.errors.technologies && (
                                    <p className="text-sm text-red-500">{editForm.errors.technologies}</p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="edit_is_featured"
                                        checked={editForm.data.is_featured}
                                        onCheckedChange={(checked) => editForm.setData('is_featured', checked as boolean)}
                                    />
                                    <label
                                        htmlFor="edit_is_featured"
                                        className="text-sm font-medium text-gray-700 cursor-pointer"
                                    >
                                        Featured Project
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">Featured projects will be highlighted on the homepage</p>
                                {editForm.errors.is_featured && (
                                    <p className="text-sm text-red-500">{editForm.errors.is_featured}</p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Project Image
                                </label>
                                <div className="mt-1 flex flex-col sm:flex-row gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="relative group">
                                            <div className={cn(
                                                "w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed transition-all duration-200",
                                                editForm.data.image 
                                                    ? "border-[#20B2AA] bg-[#E6F7F6]" 
                                                    : "border-gray-200 bg-gray-50 group-hover:border-gray-300"
                                            )}>
                                                {editForm.data.image ? (
                                                    <>
                                                        <img
                                                            src={typeof editForm.data.image === 'string' 
                                                                ? editForm.data.image 
                                                                : (editForm.data.image as any) instanceof File
                                                                    ? URL.createObjectURL(editForm.data.image)
                                                                    : ''}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => editForm.setData('image', null)}
                                                                className="text-white hover:text-red-400 transition-colors"
                                                            >
                                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-gray-500">
                                                        <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-xs font-medium">No image</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label 
                                                htmlFor="project-image-edit" 
                                                className={cn(
                                                    "flex flex-col items-center justify-center w-full h-24 rounded-lg cursor-pointer transition-all duration-200",
                                                    "border-2 border-dashed",
                                                    editForm.data.image 
                                                        ? "border-[#20B2AA] bg-[#E6F7F6] hover:bg-[#d9f2f1]" 
                                                        : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                                )}
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className={cn(
                                                        "w-8 h-8 mb-3",
                                                        editForm.data.image ? "text-[#20B2AA]" : "text-gray-400"
                                                    )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-medium">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                                                </div>
                                                <input 
                                                    id="project-image-edit"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={e => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            // Validate file type
                                                            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
                                                            if (!validTypes.includes(file.type)) {
                                                                toast.error('Please upload a valid image file (PNG, JPG or WEBP)');
                                                                return;
                                                            }
                                                            // Validate file size (2MB)
                                                            if (file.size > 2 * 1024 * 1024) {
                                                                toast.error('Image size should be less than 2MB');
                                                                return;
                                                            }
                                                            editForm.setData('image', file as any);
                                                        }
                                                    }}
                                                    accept="image/png,image/jpeg,image/webp"
                                                />
                                            </label>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Recommended image specifications:</span>
                                            </div>
                                            <ul className="pl-5 space-y-1">
                                                <li className="text-xs text-gray-500 flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                                    Size: 1200x800px (3:2 ratio)
                                                </li>
                                                <li className="text-xs text-gray-500 flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                                    Format: PNG, JPG or WEBP
                                                </li>
                                                <li className="text-xs text-gray-500 flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                                    Max size: 2MB
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {editForm.errors.image && (
                                    <p className="text-sm text-red-500 mt-1">{editForm.errors.image}</p>
                                )}
                            </div>
                        </div>

                        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditingProject(null)}
                                className="w-full sm:w-auto sm:mr-2 order-2 sm:order-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#20B2AA] hover:bg-[#1a9994] text-white w-full sm:w-auto order-1 sm:order-2"
                                disabled={editForm.processing}
                            >
                                {editForm.processing ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Updating...
                                    </div>
                                ) : (
                                    'Update Project'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirmation 
                isOpen={deleteConfirmOpen}
                onClose={() => {
                    setDeleteConfirmOpen(false);
                    setProjectToDelete(null);
                }}
                onConfirm={handleDeleteConfirmed}
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </AdminLayout>
    );
} 