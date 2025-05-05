import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { Code, Palette, Smartphone, Search, BarChart, FileText, Plus, X, GripVertical, ChevronUp, ChevronDown, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type IconType = typeof iconOptions[number]['value'];

type FormDataConvertible = string | number | boolean | null | undefined | File | Blob | Date | FormDataConvertible[];

interface FormData {
    [key: string]: FormDataConvertible;
    title: string;
    description: string;
    icon: IconType;
    is_active: boolean;
}

const iconOptions = [
    { value: 'Code', label: 'Code', icon: Code },
    { value: 'Palette', label: 'Design', icon: Palette },
    { value: 'Smartphone', label: 'Mobile', icon: Smartphone },
    { value: 'Search', label: 'SEO', icon: Search },
    { value: 'BarChart', label: 'Marketing', icon: BarChart },
    { value: 'FileText', label: 'Content', icon: FileText },
] as const;

interface Service {
    id: number;
    order: number;
    title: string;
    description: string;
    icon: IconType;
    is_active: boolean;
}

interface Props {
    services: Service[];
}

export default function Services({ services: initialServices }: Props) {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isReordering, setIsReordering] = useState(false);

    const form = useForm<FormData>({
        title: '',
        description: '',
        icon: 'Code',
        is_active: true,
    });

    const editForm = useForm<FormData>({
        title: '',
        description: '',
        icon: 'Code',
        is_active: true,
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
        form.post(route('admin.services.store'), {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                form.reset();
                toast.success('Service created successfully');
            },
        });
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        editForm.setData({
            title: service.title,
            description: service.description,
            icon: service.icon as IconType,
            is_active: service.is_active,
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingService) return;

        editForm.put(route('admin.services.update', { service: editingService.id }), {
            onSuccess: () => {
                setEditingService(null);
                editForm.reset();
                toast.success('Service updated successfully');
            },
        });
    };

    const handleDelete = (service: Service) => {
        if (confirm('Are you sure you want to delete this service?')) {
            fetch(route('admin.services.destroy', { service: service.id }), {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            }).then(() => {
                setServices(services.filter(s => s.id !== service.id));
                toast.success('Service deleted successfully');
            });
        }
    };

    const IconComponent = ({ iconName }: { iconName: IconType }) => {
        const IconFound = iconOptions.find(opt => opt.value === iconName)?.icon;
        return IconFound ? <IconFound className="w-5 h-5" /> : <Code className="w-5 h-5" />;
    };

    return (
        <AdminLayout>
            <Head title="Services - Portfolio Admin" />

            <div className="p-6 space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
                            <div className="px-2.5 py-0.5 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                                {services.length} Active
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">Manage and showcase your professional services</p>
                    </div>
                    <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#20B2AA] hover:bg-[#1a9994]">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Service
                    </Button>
                </div>

                {/* Services List */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-sm font-medium text-gray-700">Service List</h2>
                    </div>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="services">
                            {(provided: DroppableProvided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {services.map((service, index) => (
                                        <Draggable key={service.id} draggableId={String(service.id)} index={index}>
                                            {(provided: DraggableProvided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={cn(
                                                        "flex items-center gap-6 p-5 hover:bg-gray-50 transition-all duration-200",
                                                        "group relative",
                                                        "hover:shadow-sm",
                                                        index !== services.length - 1 && "border-b border-gray-200"
                                                    )}
                                                >
                                                    <div {...provided.dragHandleProps} className="cursor-move text-gray-400 hover:text-gray-600 transition-colors">
                                                        <GripVertical className="w-5 h-5" />
                                                    </div>
                                                    
                                                    <div className="w-12 h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                                                        <IconComponent iconName={service.icon} />
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-base font-medium text-gray-900 mb-1">{service.title}</h3>
                                                        <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
                                                    </div>

                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleEdit(service)}
                                                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(service)}
                                                            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span className="sr-only">Delete</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>

            {/* Add Service Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Plus className="w-5 h-5 text-[#20B2AA]" />
                            Add New Service
                        </DialogTitle>
                        <DialogDescription>
                            Add a new service to showcase your expertise. Fill in the details below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Icon
                                <span className="text-red-500">*</span>
                            </label>
                            <Select
                                value={form.data.icon}
                                onValueChange={(value: IconType) => form.setData('icon', value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {iconOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-[#E6F7F6] rounded-lg flex items-center justify-center">
                                                    <option.icon className="w-4 h-4 text-[#20B2AA]" />
                                                </div>
                                                <span>{option.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.icon && (
                                <p className="text-sm text-red-500">{form.errors.icon}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Title
                                <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="text"
                                value={form.data.title}
                                onChange={e => form.setData('title', e.target.value)}
                                placeholder="e.g., Web Development"
                                className={cn(form.errors.title && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {form.errors.title && (
                                <p className="text-sm text-red-500">{form.errors.title}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Description
                                <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                value={form.data.description}
                                onChange={e => form.setData('description', e.target.value)}
                                placeholder="Describe your service..."
                                rows={3}
                                className={cn(form.errors.description && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {form.errors.description && (
                                <p className="text-sm text-red-500">{form.errors.description}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsAddDialogOpen(false)}
                                className="gap-2"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#20B2AA] hover:bg-[#1a9994] gap-2"
                                disabled={form.processing}
                            >
                                {form.processing ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4" />
                                        Add Service
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Service Dialog */}
            <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit2 className="w-5 h-5 text-[#20B2AA]" />
                            Edit Service
                        </DialogTitle>
                        <DialogDescription>
                            Update your service information. Make changes to the fields below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdate} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Icon
                                <span className="text-red-500">*</span>
                            </label>
                            <Select
                                value={editForm.data.icon}
                                onValueChange={(value: IconType) => editForm.setData('icon', value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {iconOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-[#E6F7F6] rounded-lg flex items-center justify-center">
                                                    <option.icon className="w-4 h-4 text-[#20B2AA]" />
                                                </div>
                                                <span>{option.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {editForm.errors.icon && (
                                <p className="text-sm text-red-500">{editForm.errors.icon}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Title
                                <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="text"
                                value={editForm.data.title}
                                onChange={e => editForm.setData('title', e.target.value)}
                                className={cn(editForm.errors.title && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {editForm.errors.title && (
                                <p className="text-sm text-red-500">{editForm.errors.title}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Description
                                <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                value={editForm.data.description}
                                onChange={e => editForm.setData('description', e.target.value)}
                                rows={3}
                                className={cn(editForm.errors.description && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {editForm.errors.description && (
                                <p className="text-sm text-red-500">{editForm.errors.description}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditingService(null)}
                                className="gap-2"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#20B2AA] hover:bg-[#1a9994] gap-2"
                                disabled={editForm.processing}
                            >
                                {editForm.processing ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Edit2 className="w-4 h-4" />
                                        Update Service
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
} 