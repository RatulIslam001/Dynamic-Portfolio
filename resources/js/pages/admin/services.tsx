import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { Code, Palette, Smartphone, Search, BarChart, FileText, Plus, X, GripVertical, ChevronUp, ChevronDown, MoreVertical, Edit2, Trash2, Users, Activity, Star, DollarSign, Eye, RefreshCw } from 'lucide-react';
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

interface Props {
    services: Service[];
}

export default function Services({ services: initialServices }: Props) {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isReordering, setIsReordering] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

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
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Services Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your service offerings and pricing</p>
                    </div>
                    <Button 
                        onClick={() => setIsAddDialogOpen(true)} 
                        className="bg-teal-500 hover:bg-teal-600 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Service
                    </Button>
                </div>

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
                            <h3 className="text-2xl font-bold text-gray-900">1</h3>
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
        </AdminLayout>
    );
} 