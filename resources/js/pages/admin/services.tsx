import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { Code, Palette, Smartphone, Search, BarChart, FileText, Plus, X, GripVertical, ChevronUp, ChevronDown, MoreVertical, Edit2, Trash2, Users, Activity, Star, DollarSign, Eye, RefreshCw, Settings, Home, Globe, Zap, CheckCircle, Clock, Target, Award, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DeleteConfirmation from '@/components/ui/delete-confirmation';
import TagInput from '@/components/ui/tag-input';

// Define the allowed icon values
const iconOptions = [
    { value: 'Code', label: 'Code', icon: Code },
    { value: 'Palette', label: 'Design', icon: Palette },
    { value: 'Smartphone', label: 'Mobile', icon: Smartphone },
    { value: 'Search', label: 'SEO', icon: Search },
    { value: 'BarChart', label: 'Marketing', icon: BarChart },
    { value: 'FileText', label: 'Content', icon: FileText },
    { value: 'Database', label: 'Database', icon: FileText }, // Using FileText as a fallback icon
    { value: 'ShoppingBag', label: 'E-commerce', icon: FileText }, // Using FileText as a fallback icon
] as const;

// Define the type for icon values
type IconType = typeof iconOptions[number]['value'];

// Simple type for the form data
type ServiceForm = {
    title: string;
    description: string;
    long_description: string;
    icon: IconType;
    is_active: boolean;
    is_featured: boolean;
    duration: string;
    starting_price: string | number;
    projects_count: string | number;
    features: string[];
    technologies: string[];
    image: File | null;
    image_url?: string;
};

interface Service {
    id: number;
    order: number;
    title: string;
    description: string;
    long_description?: string;
    icon: IconType;
    is_active: boolean;
    is_featured?: boolean;
    duration?: string;
    starting_price?: number;
    price?: number; // Added for backward compatibility
    projects_count?: number;
    features?: string[];
    technologies?: string[];
    image_url?: string;
}

interface ServicesContent {
    services_section_badge?: string;
    services_section_title?: string;
    services_section_description?: string;
    services_button_text?: string;
    services_page_title?: string;
    services_page_description?: string;
    services_benefit_1_text?: string;
    services_benefit_1_icon?: string;
    services_benefit_2_text?: string;
    services_benefit_2_icon?: string;
    services_benefit_3_text?: string;
    services_benefit_3_icon?: string;
    work_process_title?: string;
    work_process_description?: string;
    work_process_steps?: Array<{
        number: string;
        title: string;
        description: string;
    }>;
    services_cta_title?: string;
    services_cta_description?: string;
    services_cta_primary_text?: string;
    services_cta_secondary_text?: string;
}

interface Props {
    services: Service[];
    content?: ServicesContent;
}

export default function Services({ services: initialServices, content }: Props) {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isReordering, setIsReordering] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
    const [activeTab, setActiveTab] = useState<'services' | 'content' | 'settings'>('services');

    const { data, setData, post, processing, reset, errors } = useForm<ServiceForm>({
        title: '',
        description: '',
        long_description: '',
        icon: 'Code',
        is_active: true,
        is_featured: false,
        duration: '',
        starting_price: '',
        projects_count: '',
        features: [],
        technologies: [],
        image: null,
        image_url: ''
    });

    const { data: editData, setData: setEditData, put, processing: editProcessing, reset: resetEdit, errors: editErrors } = useForm<ServiceForm>({
        title: '',
        description: '',
        long_description: '',
        icon: 'Code',
        is_active: true,
        is_featured: false,
        duration: '',
        starting_price: '',
        projects_count: '',
        features: [],
        technologies: [],
        image: null,
        image_url: ''
    });

    const { data: contentData, setData: setContentData, post: postContent, processing: contentProcessing, errors: contentErrors } = useForm({
        services_section_badge: content?.services_section_badge || 'Professional Services',
        services_section_title: content?.services_section_title || 'Areas of Expertise',
        services_section_description: content?.services_section_description || 'Delivering tailored, high-quality solutions to help your business thrive in the digital landscape',
        services_button_text: content?.services_button_text || 'Explore All Services',
        services_page_title: content?.services_page_title || 'Professional Services',
        services_page_description: content?.services_page_description || 'Comprehensive digital solutions tailored to your business needs.',
        services_benefit_1_text: content?.services_benefit_1_text || 'Fast Delivery',
        services_benefit_1_icon: content?.services_benefit_1_icon || 'Zap',
        services_benefit_2_text: content?.services_benefit_2_text || 'Quality Guaranteed',
        services_benefit_2_icon: content?.services_benefit_2_icon || 'CheckCircle',
        services_benefit_3_text: content?.services_benefit_3_text || '24/7 Support',
        services_benefit_3_icon: content?.services_benefit_3_icon || 'Clock',
        work_process_title: content?.work_process_title || 'My Work Process',
        work_process_description: content?.work_process_description || 'A systematic approach that ensures quality results and client satisfaction.',
        work_process_steps: content?.work_process_steps || [
            { number: '01', title: 'Discovery', description: 'Understanding your requirements, goals, and target audience to create an optimal solution.' },
            { number: '02', title: 'Planning', description: 'Creating detailed project plans, wireframes, and technical specifications.' },
            { number: '03', title: 'Development', description: 'Building your solution using best practices and cutting-edge technologies.' },
            { number: '04', title: 'Testing', description: 'Rigorous testing across all devices and browsers to ensure quality and performance.' },
            { number: '05', title: 'Launch', description: 'Deploying your project and providing ongoing support and maintenance.' }
        ],
        services_cta_title: content?.services_cta_title || 'Ready to Start Your Project?',
        services_cta_description: content?.services_cta_description || 'Let us discuss your requirements and create something amazing together.',
        services_cta_primary_text: content?.services_cta_primary_text || 'Get Free Consultation',
        services_cta_secondary_text: content?.services_cta_secondary_text || 'View Portfolio',
    });

    const handleDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(services);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update order values
        const updatedItems = items.map((item, index) => ({
            ...item,
            order: index,
        }));

        setServices(updatedItems);
        setIsReordering(true);

        try {
            await fetch(route('admin.services.reorder'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ services: updatedItems }),
            });
            toast.success('Services reordered successfully');
        } catch (error) {
            toast.error('Failed to reorder services');
            setServices(initialServices);
        } finally {
            setIsReordering(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Map the form data to match the controller's expected field names
        const formData = new FormData();
        
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('long_description', data.long_description || '');
        formData.append('icon', data.icon);
        formData.append('price', data.starting_price.toString());
        formData.append('duration', data.duration || '');
        formData.append('projects_count', data.projects_count?.toString() || '0');
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('is_featured', data.is_featured ? '1' : '0');
        
        // Add features as JSON string
        if (data.features && data.features.length > 0) {
            formData.append('features', JSON.stringify(data.features));
        } else {
            // Provide an empty array if no features
            formData.append('features', JSON.stringify([]));
        }
        
        // Add technologies as JSON string
        if (data.technologies && data.technologies.length > 0) {
            formData.append('technologies', JSON.stringify(data.technologies));
        } else {
            // Provide an empty array if no technologies
            formData.append('technologies', JSON.stringify([]));
        }
        
        // Add image if present
        if (data.image) {
            formData.append('image', data.image);
        }
        
        // Debug log
        console.log('Creating new service');
        
        // Use Inertia router for proper CSRF handling
        router.post(route('admin.services.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setIsAddDialogOpen(false);
                reset();
                toast.success('Service created successfully');
                
                // Reload the page to get fresh data
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            onError: (errors) => {
                console.error('Create error:', errors);
                toast.error('Failed to create service. Please check the form for errors.');
            }
        });
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setEditData({
            title: service.title,
            description: service.description,
            long_description: service.long_description || '',
            icon: service.icon,
            is_active: service.is_active,
            is_featured: service.is_featured || false,
            duration: service.duration || '',
            starting_price: service.starting_price?.toString() || '',
            projects_count: service.projects_count?.toString() || '',
            features: service.features || [],
            technologies: service.technologies || [],
            image: null,
            image_url: service.image_url
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingService) return;
        
        // Map the form data to match the controller's expected field names
        const formData = new FormData();
        
        formData.append('title', editData.title);
        formData.append('description', editData.description);
        formData.append('long_description', editData.long_description || '');
        formData.append('icon', editData.icon);
        formData.append('price', editData.starting_price.toString());
        formData.append('duration', editData.duration || '');
        formData.append('projects_count', editData.projects_count?.toString() || '0');
        formData.append('is_active', editData.is_active ? '1' : '0');
        formData.append('is_featured', editData.is_featured ? '1' : '0');
        
        // Add features as JSON string
        if (editData.features && editData.features.length > 0) {
            formData.append('features', JSON.stringify(editData.features));
        } else {
            // Provide an empty array if no features
            formData.append('features', JSON.stringify([]));
        }
        
        // Add technologies as JSON string
        if (editData.technologies && editData.technologies.length > 0) {
            formData.append('technologies', JSON.stringify(editData.technologies));
        } else {
            // Provide an empty array if no technologies
            formData.append('technologies', JSON.stringify([]));
        }
        
        // Add image if present
        if (editData.image) {
            formData.append('image', editData.image);
        }
        
        // Debug log
        console.log('Updating service with ID:', editingService.id);
        
        // Use Inertia router for proper CSRF handling
        router.post(route('admin.services.update', { service: editingService.id }), formData, {
            forceFormData: true,
            onBefore: () => {
                // Add the _method field to make Laravel recognize this as a PUT request
                formData.append('_method', 'PUT');
                return true;
            },
            onSuccess: () => {
                setEditingService(null);
                resetEdit();
                toast.success('Service updated successfully');
                
                // Reload the page to get fresh data
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            onError: (errors) => {
                console.error('Update error:', errors);
                toast.error('Failed to update service. Please check the form for errors.');
            }
        });
    };

    const confirmDelete = (service: Service) => {
        setServiceToDelete(service);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmed = () => {
        if (!serviceToDelete) return;
        
        router.delete(route('admin.services.destroy', { service: serviceToDelete.id }), {
            onSuccess: () => {
                // Show success message
                toast.success('Service deleted successfully');
                
                // Close the delete confirmation dialog
                setDeleteConfirmOpen(false);
                setServiceToDelete(null);
                
                // Reload the page to get fresh data with reindexed IDs
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            onError: () => {
                toast.error('Failed to delete service');
                setDeleteConfirmOpen(false);
                setServiceToDelete(null);
            }
        });
    };

    const handleContentUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Submitting content data:', contentData);

        postContent(route('admin.services.content.update'), {
            onSuccess: () => {
                toast.success('Services content updated successfully');
                // Reload the page to get fresh data
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            onError: (errors) => {
                console.error('Content update errors:', errors);
                toast.error('Failed to update services content');
            }
        });
    };

    const IconComponent = ({ iconName }: { iconName: IconType }) => {
        const IconFound = iconOptions.find(opt => opt.value === iconName)?.icon;
        return IconFound ? <IconFound className="w-5 h-5" /> : <Code className="w-5 h-5" />;
    };

    // Calculate total value of all services
    const totalValue = services.reduce((total, service) => {
        // Ensure we're adding numbers, not concatenating strings
        return total + (Number(service.starting_price) || 0);
    }, 0);

    // Format currency with proper formatting
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Get category label from icon name
    const getCategoryFromIcon = (icon: IconType): string => {
        switch (icon) {
            case 'Code': return 'Development';
            case 'Palette': return 'Design';
            case 'Smartphone': return 'Mobile';
            case 'Search': return 'SEO';
            case 'BarChart': return 'Marketing';
            case 'FileText': return 'Content';
            case 'Database': return 'Database';
            case 'ShoppingBag': return 'E-commerce';
            default: return 'Other';
        }
    };

    return (
        <AdminLayout>
            <Head title="Services Management - Portfolio Admin" />

            <div className="p-6 space-y-6 bg-white min-h-screen">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Services Management</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage your service offerings and content</p>
                        </div>
                        {activeTab === 'services' && (
                            <Button
                                onClick={() => setIsAddDialogOpen(true)}
                                className="bg-teal-500 hover:bg-teal-600 text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Service
                            </Button>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 bg-white p-2 rounded-t-lg shadow-sm">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('services')}
                                className={`py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all ${
                                    activeTab === 'services'
                                        ? 'border-teal-500 text-teal-600 bg-teal-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                🛠️ Services & Offerings
                            </button>
                            <button
                                onClick={() => setActiveTab('content')}
                                className={`py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all ${
                                    activeTab === 'content'
                                        ? 'border-teal-500 text-teal-600 bg-teal-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                📝 Content & Text Management
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all ${
                                    activeTab === 'settings'
                                        ? 'border-teal-500 text-teal-600 bg-teal-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                ⚙️ Settings & Configuration
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'services' && (
                    <>
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {/* Total Services Card */}
                            <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-500">Total Services</h2>
                                    <span className="p-2 bg-gray-100 rounded-md">
                                        <Users size={16} className="text-gray-600" />
                                    </span>
                                </div>
                                <div className="mt-3">
                                    <h3 className="text-2xl font-bold text-gray-900">{services.length}</h3>
                                    <p className="text-xs text-gray-500 mt-1">+{services.length - Math.max(0, services.length - 2)} from last month</p>
                                </div>
                            </div>

                            {/* Active Services Card */}
                            <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-500">Active Services</h2>
                                    <span className="p-2 bg-blue-50 rounded-md">
                                        <Activity size={16} className="text-blue-600" />
                                    </span>
                                </div>
                                <div className="mt-3">
                                    <h3 className="text-2xl font-bold text-gray-900">{services.filter(s => s.is_active).length}</h3>
                                    <p className="text-xs text-gray-500 mt-1">+{services.filter(s => s.is_active).length - Math.max(0, services.filter(s => s.is_active).length - 1)} from last month</p>
                                </div>
                            </div>

                            {/* Featured Services Card */}
                            <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-500">Featured Services</h2>
                                    <span className="p-2 bg-yellow-50 rounded-md">
                                        <Star size={16} className="text-yellow-600" />
                                    </span>
                                </div>
                                <div className="mt-3">
                                    <h3 className="text-2xl font-bold text-gray-900">{services.filter(s => s.is_featured).length}</h3>
                                    <p className="text-xs text-gray-500 mt-1">Featured on homepage</p>
                                </div>
                            </div>

                            {/* Total Value Card */}
                            <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-500">Total Value</h2>
                                    <span className="p-2 bg-green-50 rounded-md">
                                        <DollarSign size={16} className="text-green-600" />
                                    </span>
                                </div>
                                <div className="mt-3">
                                    <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</h3>
                                    <p className="text-xs text-gray-500 mt-1">Combined service value</p>
                                </div>
                            </div>
                        </div>

                        {/* Services Section */}
                        <div className="bg-white rounded-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Services</h2>
                                    <p className="text-sm text-gray-500 mt-1">Manage your service offerings</p>
                                </div>
                            </div>

                            {/* Service Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {services.map((service) => (
                                    <div key={service.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {/* Service status badge */}
                                <div className="relative">
                                    {/* Service Image or Icon Header */}
                                    {service.image_url ? (
                                        <div className="h-40 bg-gray-100">
                                            <img 
                                                src={service.image_url} 
                                                alt={service.title} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className={cn(
                                            "h-40 flex items-center justify-center",
                                            service.icon === 'Code' && "bg-blue-50",
                                            service.icon === 'Palette' && "bg-purple-50",
                                            service.icon === 'Smartphone' && "bg-indigo-50",
                                            service.icon === 'Search' && "bg-green-50",
                                            service.icon === 'BarChart' && "bg-orange-50",
                                            service.icon === 'FileText' && "bg-yellow-50",
                                            service.icon === 'Database' && "bg-cyan-50",
                                            service.icon === 'ShoppingBag' && "bg-amber-50",
                                        )}>
                                            <div className={cn(
                                                "p-4 rounded-full",
                                                service.icon === 'Code' && "bg-blue-100",
                                                service.icon === 'Palette' && "bg-purple-100",
                                                service.icon === 'Smartphone' && "bg-indigo-100",
                                                service.icon === 'Search' && "bg-green-100",
                                                service.icon === 'BarChart' && "bg-orange-100",
                                                service.icon === 'FileText' && "bg-yellow-100",
                                                service.icon === 'Database' && "bg-cyan-100",
                                                service.icon === 'ShoppingBag' && "bg-amber-100",
                                            )}>
                                                <IconComponent iconName={service.icon} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Status badge */}
                                    {service.is_active && (
                                        <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-md">
                                            Active
                                        </div>
                                    )}
                                    
                                    {/* Featured badge */}
                                    {service.is_featured && (
                                        <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-md flex items-center">
                                            <Star className="w-3 h-3 mr-1" /> Featured
                                        </div>
                                    )}
                                </div>

                                {/* Service details */}
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                                    
                                    {/* Service features */}
                                    {service.features && service.features.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Key Features:</h4>
                                            <ul className="space-y-1">
                                                {service.features.slice(0, 3).map((feature, idx) => (
                                                    <li key={idx} className="flex items-start text-xs">
                                                        <span className="text-teal-500 mr-1">•</span>
                                                        <span className="text-gray-600">{feature}</span>
                                                    </li>
                                                ))}
                                                {service.features.length > 3 && (
                                                    <li className="text-xs text-gray-500">+{service.features.length - 3} more</li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {/* Service metadata */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Price:</span>
                                            <span className="font-medium text-gray-900">{formatCurrency(service.starting_price || service.price || 0)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Duration:</span>
                                            <span className="text-gray-900">{service.duration || 'Not specified'}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Category:</span>
                                            <span className="text-gray-900">
                                                {getCategoryFromIcon(service.icon)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Service stats */}
                                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
                                        <div className="flex items-center">
                                            <Eye className="h-4 w-4 mr-1" />
                                            {Math.floor(Math.random() * 300)} views
                                        </div>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            {Math.floor(Math.random() * 20)} inquiries
                                        </div>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex border-t border-gray-200">
                                    <button 
                                        onClick={() => handleEdit(service)}
                                        className="flex-1 py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                                    >
                                        <Edit2 className="w-4 h-4 mr-2" />
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => confirmDelete(service)}
                                        className="flex-1 py-3 px-4 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-l border-gray-200 flex items-center justify-center"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                                ))}
                            </div>
                        </div>

                {/* Add Service Dialog */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="pb-6 border-b border-gray-100">
                        <DialogTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                            <Plus className="w-6 h-6 text-teal-600" />
                            Add New Service
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 mt-2">
                            Create a new service offering for your portfolio. Fill in the details below to showcase your expertise.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="pt-6">
                        {/* Basic Information Section */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                            Service Title
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            placeholder="e.g., Web Development"
                                            className={cn("h-11 transition-colors", errors.title && "border-red-500 focus-visible:ring-red-500")}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <X className="w-3 h-3" />
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                            Category
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Select
                                            value={data.icon}
                                            onValueChange={(value: IconType) => setData('icon', value)}
                                        >
                                            <SelectTrigger className="h-11">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {iconOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        <div className="flex items-center gap-2">
                                                            <option.icon className="w-4 h-4 text-gray-500" />
                                                            <span>{option.label}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.icon && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <X className="w-3 h-3" />
                                                {errors.icon}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Description</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                            Short Description
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Textarea
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            placeholder="Brief description of your service (1-2 sentences)"
                                            rows={3}
                                            className={cn("transition-colors resize-none", errors.description && "border-red-500 focus-visible:ring-red-500")}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <X className="w-3 h-3" />
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>


                                </div>
                            </div>

                            {/* Pricing & Timeline Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Pricing & Timeline</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                            Starting Price
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={data.starting_price}
                                                onChange={e => setData('starting_price', e.target.value)}
                                                placeholder="2500"
                                                min="0"
                                                className={cn("h-11 pl-8 transition-colors", errors.starting_price && "border-red-500 focus-visible:ring-red-500")}
                                            />
                                            <DollarSign className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        </div>
                                        {errors.starting_price && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <X className="w-3 h-3" />
                                                {errors.starting_price}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Estimated Duration</label>
                                        <Input
                                            type="text"
                                            value={data.duration}
                                            onChange={e => setData('duration', e.target.value)}
                                            placeholder="e.g., 4-6 weeks"
                                            className={cn("h-11 transition-colors", errors.duration && "border-red-500 focus-visible:ring-red-500")}
                                        />
                                        {errors.duration && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <X className="w-3 h-3" />
                                                {errors.duration}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>



                            {/* Features & Technologies Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Features & Technologies</h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                            Key Features
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <TagInput
                                            value={data.features || []}
                                            onChange={(tags) => setData('features', tags)}
                                            placeholder="Type a feature and press Enter (e.g., Responsive Design)"
                                            error={errors.features}
                                            maxTags={10}
                                        />
                                        <p className="text-xs text-gray-500">Add key features that highlight the value of your service</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Technologies Used</label>
                                        <TagInput
                                            value={data.technologies || []}
                                            onChange={(tags) => setData('technologies', tags)}
                                            placeholder="Type a technology and press Enter (e.g., React)"
                                            error={errors.technologies}
                                            maxTags={15}
                                        />
                                        <p className="text-xs text-gray-500">List the main technologies and tools you'll use</p>
                                    </div>
                                </div>
                            </div>

                            {/* Service Settings Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Service Settings</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-offset-0"
                                        />
                                        <div className="flex-1">
                                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active Service</label>
                                            <p className="text-xs text-gray-500 mt-1">Make this service visible to clients</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onChange={e => setData('is_featured', e.target.checked)}
                                            className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-offset-0"
                                        />
                                        <div className="flex-1">
                                            <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">Featured Service</label>
                                            <p className="text-xs text-gray-500 mt-1">Highlight this service on your portfolio</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsAddDialogOpen(false)}
                                className="px-6 py-2.5"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 flex items-center gap-2"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4" />
                                        Create Service
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
                </Dialog>

                {/* Edit Service Dialog */}
                <Dialog open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="pb-6 border-b border-gray-100">
                        <DialogTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                            <Edit2 className="w-6 h-6 text-teal-600" />
                            Edit Service
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 mt-2">
                            Update the details of your service. Make changes to improve your service offering.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdate} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Service Title</label>
                                <Input
                                    type="text"
                                    value={editData.title}
                                    onChange={e => setEditData('title', e.target.value)}
                                    placeholder="e.g., Web Development"
                                    className={cn("h-10", editErrors.title && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {editErrors.title && (
                                    <p className="text-sm text-red-500">{editErrors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Category</label>
                                <Select
                                    value={editData.icon}
                                    onValueChange={(value: IconType) => setEditData('icon', value)}
                                >
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {iconOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                <div className="flex items-center gap-2">
                                                    <option.icon className="w-4 h-4 text-gray-500" />
                                                    <span>{option.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {editErrors.icon && (
                                    <p className="text-sm text-red-500">{editErrors.icon}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <Textarea
                                value={editData.description}
                                onChange={e => setEditData('description', e.target.value)}
                                placeholder="Describe your service..."
                                rows={3}
                                className={cn(editErrors.description && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {editErrors.description && (
                                <p className="text-sm text-red-500">{editErrors.description}</p>
                            )}
                        </div>



                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Price ($)</label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        value={editData.starting_price}
                                        onChange={e => setEditData('starting_price', e.target.value)}
                                        placeholder="2500"
                                        min="0"
                                        className={cn("h-10 pl-7", editErrors.starting_price && "border-red-500 focus-visible:ring-red-500")}
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                </div>
                                {editErrors.starting_price && (
                                    <p className="text-sm text-red-500">{editErrors.starting_price}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Duration</label>
                                <Input
                                    type="text"
                                    value={editData.duration}
                                    onChange={e => setEditData('duration', e.target.value)}
                                    placeholder="4-6 weeks"
                                    className={cn("h-10", editErrors.duration && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {editErrors.duration && (
                                    <p className="text-sm text-red-500">{editErrors.duration}</p>
                                )}
                            </div>
                        </div>



                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Features</label>
                            <TagInput
                                value={editData.features || []}
                                onChange={(tags) => setEditData('features', tags)}
                                placeholder="Type a feature and press Enter (e.g., Responsive Design)"
                                error={editErrors.features}
                                maxTags={10}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Technologies</label>
                            <TagInput
                                value={editData.technologies || []}
                                onChange={(tags) => setEditData('technologies', tags)}
                                placeholder="Type a technology and press Enter (e.g., React)"
                                error={editErrors.technologies}
                                maxTags={15}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="edit_is_active"
                                    checked={editData.is_active}
                                    onChange={e => setEditData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-2"
                                />
                                <label htmlFor="edit_is_active" className="text-sm text-gray-700">Active Service</label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="edit_is_featured"
                                    checked={editData.is_featured}
                                    onChange={e => setEditData('is_featured', e.target.checked)}
                                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-2"
                                />
                                <label htmlFor="edit_is_featured" className="text-sm text-gray-700">Featured Service</label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 mt-5">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditingService(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-700 text-white"
                                disabled={editProcessing}
                            >
                                {editProcessing ? "Updating..." : "Update Service"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
                </Dialog>

                <DeleteConfirmation
                isOpen={deleteConfirmOpen}
                onClose={() => {
                    setDeleteConfirmOpen(false);
                    setServiceToDelete(null);
                }}
                onConfirm={handleDeleteConfirmed}
                title="Delete Service"
                description="Are you sure you want to delete this service? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                />
                    </>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                    <div className="space-y-6">
                        {/* Header Section */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Content & Text Management</h2>
                                    <p className="text-sm text-gray-600">Manage all text content for your services</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Update the text content that appears on your homepage and services page, including work process steps.
                                Changes will be reflected immediately on your website.
                            </p>
                        </div>

                        <form onSubmit={handleContentUpdate} className="space-y-6">
                            {/* Home Page Services Section */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <Home className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Home Page Services Section</h3>
                                            <p className="text-sm text-gray-600">Content displayed in the services section of your homepage</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Section Badge
                                            </label>
                                            <Input
                                                value={contentData.services_section_badge}
                                                onChange={(e) => setContentData('services_section_badge', e.target.value)}
                                                placeholder="Professional Services"
                                            />
                                            <p className="text-xs text-gray-500">Small badge text above the main title</p>
                                            {contentErrors.services_section_badge && (
                                                <p className="text-red-500 text-xs">{contentErrors.services_section_badge}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Section Title
                                            </label>
                                            <Input
                                                value={contentData.services_section_title}
                                                onChange={(e) => setContentData('services_section_title', e.target.value)}
                                                placeholder="Areas of Expertise"
                                            />
                                            <p className="text-xs text-gray-500">Main heading for the services section</p>
                                            {contentErrors.services_section_title && (
                                                <p className="text-red-500 text-xs">{contentErrors.services_section_title}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Section Description
                                        </label>
                                        <Textarea
                                            value={contentData.services_section_description}
                                            onChange={(e) => setContentData('services_section_description', e.target.value)}
                                            placeholder="Delivering tailored, high-quality solutions..."
                                            rows={3}
                                        />
                                        <p className="text-xs text-gray-500">Descriptive text below the main title (2-3 sentences recommended)</p>
                                        {contentErrors.services_section_description && (
                                            <p className="text-red-500 text-xs">{contentErrors.services_section_description}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Button Text
                                        </label>
                                        <Input
                                            value={contentData.services_button_text}
                                            onChange={(e) => setContentData('services_button_text', e.target.value)}
                                            placeholder="Explore All Services"
                                        />
                                        <p className="text-xs text-gray-500">Text for the call-to-action button</p>
                                        {contentErrors.services_button_text && (
                                            <p className="text-red-500 text-xs">{contentErrors.services_button_text}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Services Page Header */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <Globe className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Services Page Header</h3>
                                            <p className="text-sm text-gray-600">Content displayed at the top of your dedicated services page</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Page Title
                                        </label>
                                        <Input
                                            value={contentData.services_page_title}
                                            onChange={(e) => setContentData('services_page_title', e.target.value)}
                                            placeholder="Professional Services"
                                        />
                                        <p className="text-xs text-gray-500">Main heading for the services page</p>
                                        {contentErrors.services_page_title && (
                                            <p className="text-red-500 text-xs">{contentErrors.services_page_title}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Page Description
                                        </label>
                                        <Textarea
                                            value={contentData.services_page_description}
                                            onChange={(e) => setContentData('services_page_description', e.target.value)}
                                            placeholder="Comprehensive digital solutions tailored to your business needs..."
                                            rows={3}
                                        />
                                        <p className="text-xs text-gray-500">Introductory text for the services page (2-3 sentences recommended)</p>
                                        {contentErrors.services_page_description && (
                                            <p className="text-red-500 text-xs">{contentErrors.services_page_description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Benefits Section */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <Star className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Benefits Section</h3>
                                            <p className="text-sm text-gray-600">Three key benefits highlighted on your services page</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">Benefit 1</h4>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">Text</label>
                                                    <Input
                                                        value={contentData.services_benefit_1_text}
                                                        onChange={(e) => setContentData('services_benefit_1_text', e.target.value)}
                                                        placeholder="Fast Delivery"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                                                    <Input
                                                        value={contentData.services_benefit_1_icon}
                                                        onChange={(e) => setContentData('services_benefit_1_icon', e.target.value)}
                                                        placeholder="Zap"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">Lucide icon name</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">Benefit 2</h4>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">Text</label>
                                                    <Input
                                                        value={contentData.services_benefit_2_text}
                                                        onChange={(e) => setContentData('services_benefit_2_text', e.target.value)}
                                                        placeholder="Quality Guaranteed"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                                                    <Input
                                                        value={contentData.services_benefit_2_icon}
                                                        onChange={(e) => setContentData('services_benefit_2_icon', e.target.value)}
                                                        placeholder="CheckCircle"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">Lucide icon name</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">Benefit 3</h4>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">Text</label>
                                                    <Input
                                                        value={contentData.services_benefit_3_text}
                                                        onChange={(e) => setContentData('services_benefit_3_text', e.target.value)}
                                                        placeholder="24/7 Support"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                                                    <Input
                                                        value={contentData.services_benefit_3_icon}
                                                        onChange={(e) => setContentData('services_benefit_3_icon', e.target.value)}
                                                        placeholder="Clock"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">Lucide icon name</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Work Process Management */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <Activity className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Work Process Management</h3>
                                            <p className="text-sm text-gray-600">Define the step-by-step process shown on your services page</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-6">
                                        {/* Work Process Title and Description */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Process Title
                                                </label>
                                                <Input
                                                    value={contentData.work_process_title}
                                                    onChange={(e) => setContentData('work_process_title', e.target.value)}
                                                    placeholder="My Work Process"
                                                />
                                                <p className="text-xs text-gray-500">Main heading for the work process section</p>
                                                {contentErrors.work_process_title && (
                                                    <p className="text-red-500 text-xs">{contentErrors.work_process_title}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Process Description
                                            </label>
                                            <Textarea
                                                value={contentData.work_process_description}
                                                onChange={(e) => setContentData('work_process_description', e.target.value)}
                                                placeholder="A systematic approach that ensures quality results and client satisfaction."
                                                rows={2}
                                            />
                                            <p className="text-xs text-gray-500">Brief description of your work process approach</p>
                                            {contentErrors.work_process_description && (
                                                <p className="text-red-500 text-xs">{contentErrors.work_process_description}</p>
                                            )}
                                        </div>

                                        {/* Process Steps */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">Process Steps</h4>
                                            {contentData.work_process_steps.map((step, index) => (
                                                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                                {step.number}
                                                            </div>
                                                            <h4 className="text-lg font-medium text-gray-900">Process Step {index + 1}</h4>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                const newSteps = contentData.work_process_steps.filter((_, i) => i !== index);
                                                                setContentData('work_process_steps', newSteps);
                                                            }}
                                                            className="text-red-600 border-red-300 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Step Number
                                                            </label>
                                                            <Input
                                                                value={step.number}
                                                                onChange={(e) => {
                                                                    const newSteps = [...contentData.work_process_steps];
                                                                    newSteps[index].number = e.target.value;
                                                                    setContentData('work_process_steps', newSteps);
                                                                }}
                                                                placeholder="01"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Step Title
                                                            </label>
                                                            <Input
                                                                value={step.title}
                                                                onChange={(e) => {
                                                                    const newSteps = [...contentData.work_process_steps];
                                                                    newSteps[index].title = e.target.value;
                                                                    setContentData('work_process_steps', newSteps);
                                                                }}
                                                                placeholder="Discovery"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Step Description
                                                        </label>
                                                        <Textarea
                                                            value={step.description}
                                                            onChange={(e) => {
                                                                const newSteps = [...contentData.work_process_steps];
                                                                newSteps[index].description = e.target.value;
                                                                setContentData('work_process_steps', newSteps);
                                                            }}
                                                            placeholder="Understanding your requirements, goals, and target audience..."
                                                            rows={3}
                                                        />
                                                        <p className="text-xs text-gray-500">Detailed explanation of this process step</p>
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const newSteps = [...contentData.work_process_steps, {
                                                        number: String(contentData.work_process_steps.length + 1).padStart(2, '0'),
                                                        title: 'New Step',
                                                        description: 'Description for the new step'
                                                    }];
                                                    setContentData('work_process_steps', newSteps);
                                                }}
                                                className="w-full border-dashed border-2 border-gray-300 text-gray-600 hover:bg-gray-50 py-4"
                                            >
                                                <Plus className="w-5 h-5 mr-2" />
                                                Add New Process Step
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Call-to-Action Section</h3>
                                            <p className="text-sm text-gray-600">Encourage visitors to take action at the bottom of your services page</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                CTA Title
                                            </label>
                                            <Input
                                                value={contentData.services_cta_title}
                                                onChange={(e) => setContentData('services_cta_title', e.target.value)}
                                                placeholder="Ready to Start Your Project?"
                                            />
                                            <p className="text-xs text-gray-500">Compelling headline to grab attention</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Primary Button Text
                                            </label>
                                            <Input
                                                value={contentData.services_cta_primary_text}
                                                onChange={(e) => setContentData('services_cta_primary_text', e.target.value)}
                                                placeholder="Get Free Consultation"
                                            />
                                            <p className="text-xs text-gray-500">Main action button text</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            CTA Description
                                        </label>
                                        <Textarea
                                            value={contentData.services_cta_description}
                                            onChange={(e) => setContentData('services_cta_description', e.target.value)}
                                            placeholder="Let us discuss your requirements and create something amazing together."
                                            rows={2}
                                        />
                                        <p className="text-xs text-gray-500">Supporting text to encourage action</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Secondary Button Text
                                        </label>
                                        <Input
                                            value={contentData.services_cta_secondary_text}
                                            onChange={(e) => setContentData('services_cta_secondary_text', e.target.value)}
                                            placeholder="View Portfolio"
                                        />
                                        <p className="text-xs text-gray-500">Alternative action button text</p>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Save Changes</h3>
                                        <p className="text-sm text-gray-600">Apply all content updates to your website</p>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={contentProcessing}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                                    >
                                        {contentProcessing ? (
                                            <div className="flex items-center space-x-2">
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                <span>Saving...</span>
                                            </div>
                                        ) : (
                                            <span>Save Changes</span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="space-y-6">
                        {/* Header Section */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <Settings className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Settings & Configuration</h2>
                                    <p className="text-sm text-gray-600">Configure display and performance options</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Configure display settings, SEO optimization, and performance options
                                to customize how your services are presented to visitors.
                            </p>
                        </div>

                        {/* Display Settings */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <Eye className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Display Settings</h3>
                                        <p className="text-sm text-gray-600">Configure how services are displayed on your website</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Services Per Row
                                        </label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="2">2 Services</option>
                                            <option value="3" selected>3 Services</option>
                                            <option value="4">4 Services</option>
                                        </select>
                                        <p className="text-xs text-gray-500">Number of service cards displayed per row</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Card Style
                                        </label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="modern" selected>Modern Cards</option>
                                            <option value="classic">Classic Cards</option>
                                            <option value="minimal">Minimal Cards</option>
                                        </select>
                                        <p className="text-xs text-gray-500">Visual style of service cards</p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                                        Save Display Settings
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <Search className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
                                        <p className="text-sm text-gray-600">Optimize your services page for search engines</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Meta Title
                                    </label>
                                    <Input
                                        placeholder="Professional Services - Your Portfolio"
                                    />
                                    <p className="text-xs text-gray-500">Recommended: 50-60 characters</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Meta Description
                                    </label>
                                    <Textarea
                                        placeholder="Comprehensive digital solutions tailored to your business needs. From concept to deployment, I provide end-to-end services that drive results."
                                        rows={3}
                                    />
                                    <p className="text-xs text-gray-500">Recommended: 150-160 characters</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Focus Keyword
                                        </label>
                                        <Input
                                            placeholder="professional services"
                                        />
                                        <p className="text-xs text-gray-500">Primary keyword to target</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Canonical URL
                                        </label>
                                        <Input
                                            placeholder="https://yoursite.com/services"
                                        />
                                        <p className="text-xs text-gray-500">Preferred URL for this page</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Search Engine Options</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Include in Sitemap</span>
                                                    <p className="text-xs text-gray-500">Add to XML sitemap</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Enable Structured Data</span>
                                                    <p className="text-xs text-gray-500">Rich snippets support</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">No Index</span>
                                                    <p className="text-xs text-gray-500">Hide from search engines</p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                                        Save SEO Settings
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Performance Settings */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <Zap className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Performance Settings</h3>
                                        <p className="text-sm text-gray-600">Configure caching and optimization options</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h4 className="text-md font-semibold text-gray-900 mb-4">Caching Options</h4>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                <label className="flex items-center space-x-3">
                                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700">Enable Page Caching</span>
                                                        <p className="text-xs text-gray-500">Cache entire pages for faster loading</p>
                                                    </div>
                                                </label>
                                            </div>

                                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                <label className="flex items-center space-x-3">
                                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700">Cache Service Images</span>
                                                        <p className="text-xs text-gray-500">Store images in browser cache</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Cache Duration
                                            </label>
                                            <select className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                <option value="1">1 Hour</option>
                                                <option value="6">6 Hours</option>
                                                <option value="24" selected>24 Hours</option>
                                                <option value="168">1 Week</option>
                                            </select>
                                            <p className="text-xs text-gray-500 mt-1">How long to keep cached content</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h4 className="text-md font-semibold text-gray-900 mb-4">Image Optimization</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Auto-compress Images</span>
                                                    <p className="text-xs text-gray-500">Reduce file sizes automatically</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Generate WebP Format</span>
                                                    <p className="text-xs text-gray-500">Modern image format support</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Lazy Load Images</span>
                                                    <p className="text-xs text-gray-500">Load images when needed</p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h4 className="text-md font-semibold text-gray-900 mb-4">Loading Options</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Enable Animations</span>
                                                    <p className="text-xs text-gray-500">Smooth transitions and effects</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Preload Critical Resources</span>
                                                    <p className="text-xs text-gray-500">Load important assets first</p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                                            Save Performance Settings
                                        </Button>
                                        <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                                            Clear Cache
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </AdminLayout>
    );
}