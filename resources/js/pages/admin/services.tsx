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

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
                        <p className="mt-2 text-sm text-gray-500">Manage and showcase your professional services</p>
                    </div>
                    <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#20B2AA] hover:bg-[#1a9994]">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Service
                    </Button>
                </div>

                {/* Services List */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
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
                                                        "flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors",
                                                        index !== services.length - 1 && "border-b border-gray-200"
                                                    )}
                                                >
                                                    <div {...provided.dragHandleProps} className="cursor-move text-gray-400 hover:text-gray-600">
                                                        <GripVertical className="w-5 h-5" />
                                                    </div>
                                                    
                                                    <div className="w-10 h-10 bg-[#E6F7F6] rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <IconComponent iconName={service.icon} />
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-sm font-medium text-gray-900">{service.title}</h3>
                                                        <p className="mt-1 text-sm text-gray-500 truncate">{service.description}</p>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleEdit(service)}
                                                            className="text-gray-500 hover:text-gray-700"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(service)}
                                                            className="text-gray-500 hover:text-red-600"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Service</DialogTitle>
                        <DialogDescription>
                            Add a new service to showcase your expertise
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Icon</label>
                            <Select
                                value={form.data.icon}
                                onValueChange={(value: IconType) => form.setData('icon', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {iconOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <div className="flex items-center gap-2">
                                                <option.icon className="w-4 h-4" />
                                                <span>{option.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Title</label>
                            <Input
                                type="text"
                                value={form.data.title}
                                onChange={e => form.setData('title', e.target.value)}
                                placeholder="e.g., Web Development"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <Textarea
                                value={form.data.description}
                                onChange={e => form.setData('description', e.target.value)}
                                placeholder="Describe your service..."
                                rows={3}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsAddDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#20B2AA] hover:bg-[#1a9994]"
                                disabled={form.processing}
                            >
                                Add Service
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Service Dialog */}
            <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Service</DialogTitle>
                        <DialogDescription>
                            Update your service information
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Icon</label>
                            <Select
                                value={editForm.data.icon}
                                onValueChange={(value: IconType) => editForm.setData('icon', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {iconOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <div className="flex items-center gap-2">
                                                <option.icon className="w-4 h-4" />
                                                <span>{option.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Title</label>
                            <Input
                                type="text"
                                value={editForm.data.title}
                                onChange={e => editForm.setData('title', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <Textarea
                                value={editForm.data.description}
                                onChange={e => editForm.setData('description', e.target.value)}
                                rows={3}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditingService(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#20B2AA] hover:bg-[#1a9994]"
                                disabled={editForm.processing}
                            >
                                Update Service
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
} 