import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { Code, Palette, Smartphone, Search, BarChart, FileText, Plus, X, GripVertical, ChevronUp, ChevronDown, MoreVertical, Edit2, Trash2, Users, Activity, Star, DollarSign, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DeleteConfirmation from '@/components/ui/delete-confirmation';

// Define the allowed icon values
const iconOptions = [
    { value: 'Code', label: 'Code', icon: Code },
    { value: 'Palette', label: 'Design', icon: Palette },
    { value: 'Smartphone', label: 'Mobile', icon: Smartphone },
    { value: 'Search', label: 'SEO', icon: Search },
    { value: 'BarChart', label: 'Marketing', icon: BarChart },
    { value: 'FileText', label: 'Content', icon: FileText },
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
        
        post(route('admin.services.store'), {
            ...data,
            _method: 'POST',
        }, {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                reset();
                toast.success('Service created successfully');
            },
            forceFormData: true,
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
        
        post(route('admin.services.update', { service: editingService.id }), {
            ...editData,
            _method: 'PUT',
        }, {
            onSuccess: () => {
                setEditingService(null);
                resetEdit();
                toast.success('Service updated successfully');
            },
            forceFormData: true,
        });
    };

    const confirmDelete = (service: Service) => {
        setServiceToDelete(service);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        if (!serviceToDelete) return;

        try {
            await fetch(route('admin.services.destroy', { service: serviceToDelete.id }), {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });
            setServices(services.filter(s => s.id !== serviceToDelete.id));
            toast.success('Service deleted successfully');
        } catch (error) {
            toast.error('Failed to delete service');
        } finally {
            setDeleteConfirmOpen(false);
            setServiceToDelete(null);
        }
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{services.map((service) => (
                            <div key={service.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                                        )}>
                                            <div className={cn(
                                                "p-4 rounded-full",
                                                service.icon === 'Code' && "bg-blue-100",
                                                service.icon === 'Palette' && "bg-purple-100",
                                                service.icon === 'Smartphone' && "bg-indigo-100",
                                                service.icon === 'Search' && "bg-green-100",
                                                service.icon === 'BarChart' && "bg-orange-100",
                                                service.icon === 'FileText' && "bg-yellow-100",
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
                                    
                                    {/* Service metadata */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Price:</span>
                                            <span className="font-medium text-gray-900">{formatCurrency(service.starting_price || 0)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Duration:</span>
                                            <span className="text-gray-900">{service.duration}</span>
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
                <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader className="mb-5">
                        <DialogTitle className="text-xl font-semibold">Add New Service</DialogTitle>
                        <DialogDescription>
                            Create a new service offering for your portfolio
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Service Title</label>
                                <Input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="e.g., Web Development"
                                    className={cn("h-10", errors.title && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Category</label>
                                <Select
                                    value={data.icon}
                                    onValueChange={(value: IconType) => setData('icon', value)}
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
                                {errors.icon && (
                                    <p className="text-sm text-red-500">{errors.icon}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <Textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Describe your service..."
                                rows={3}
                                className={cn(errors.description && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Price ($)</label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        value={data.starting_price}
                                        onChange={e => setData('starting_price', e.target.value)}
                                        placeholder="2500"
                                        min="0"
                                        className={cn("h-10 pl-7", errors.starting_price && "border-red-500 focus-visible:ring-red-500")}
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                </div>
                                {errors.starting_price && (
                                    <p className="text-sm text-red-500">{errors.starting_price}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Duration</label>
                                <Input
                                    type="text"
                                    value={data.duration}
                                    onChange={e => setData('duration', e.target.value)}
                                    placeholder="4-6 weeks"
                                    className={cn("h-10", errors.duration && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.duration && (
                                    <p className="text-sm text-red-500">{errors.duration}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Service Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    setData('image', file);
                                                }}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    {data.image && (
                                        <p className="text-sm text-teal-600 mt-2">
                                            Selected: {data.image.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Features (comma-separated)</label>
                            <Textarea
                                value={data.features?.join(', ')}
                                onChange={e => setData('features', e.target.value.split(',').map(item => item.trim()).filter(Boolean))}
                                placeholder="Responsive Design, SEO Optimized, Performance Optimized"
                                rows={2}
                                className={cn(errors.features && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.features && (
                                <p className="text-sm text-red-500">{errors.features}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
                            <Textarea
                                value={data.technologies?.join(', ')}
                                onChange={e => setData('technologies', e.target.value.split(',').map(item => item.trim()).filter(Boolean))}
                                placeholder="React, Next.js, TypeScript"
                                rows={2}
                                className={cn(errors.technologies && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.technologies && (
                                <p className="text-sm text-red-500">{errors.technologies}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm text-gray-700">Active Service</label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_featured"
                                    checked={data.is_featured}
                                    onChange={e => setData('is_featured', e.target.checked)}
                                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-2"
                                />
                                <label htmlFor="is_featured" className="text-sm text-gray-700">Featured Service</label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 mt-5">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsAddDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-700 text-white"
                                disabled={processing}
                            >
                                {processing ? "Creating..." : "Create Service"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Service Dialog */}
            <Dialog open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
                <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader className="mb-5">
                        <DialogTitle className="text-xl font-semibold">Edit Service</DialogTitle>
                        <DialogDescription>
                            Update the details of your service
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
                            <label className="text-sm font-medium text-gray-700">Service Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    {editData.image_url ? (
                                        <div className="mb-3">
                                            <img 
                                                src={editData.image_url} 
                                                alt="Current service image" 
                                                className="mx-auto h-32 w-auto object-cover rounded-md"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Current image</p>
                                        </div>
                                    ) : (
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="edit-file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="edit-file-upload"
                                                name="edit-file-upload"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    setEditData('image', file);
                                                }}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    {editData.image && (
                                        <p className="text-sm text-teal-600 mt-2">
                                            Selected: {editData.image.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Features (comma-separated)</label>
                            <Textarea
                                value={editData.features?.join(', ')}
                                onChange={e => setEditData('features', e.target.value.split(',').map(item => item.trim()).filter(Boolean))}
                                placeholder="Responsive Design, SEO Optimized, Performance Optimized"
                                rows={2}
                                className={cn(editErrors.features && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {editErrors.features && (
                                <p className="text-sm text-red-500">{editErrors.features}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
                            <Textarea
                                value={editData.technologies?.join(', ')}
                                onChange={e => setEditData('technologies', e.target.value.split(',').map(item => item.trim()).filter(Boolean))}
                                placeholder="React, Next.js, TypeScript"
                                rows={2}
                                className={cn(editErrors.technologies && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {editErrors.technologies && (
                                <p className="text-sm text-red-500">{editErrors.technologies}</p>
                            )}
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