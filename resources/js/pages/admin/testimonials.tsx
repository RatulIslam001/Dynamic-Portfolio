import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus, Search, GripVertical, Star, StarOff, Edit2, Trash2, MoreHorizontal, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import DeleteConfirmation from '@/components/ui/delete-confirmation';

interface Testimonial {
    id: number;
    name: string;
    position: string;
    company: string;
    quote: string;
    rating: number;
    image: string | null;
    order: number;
    is_featured: boolean;
}

interface Props {
    testimonials: Testimonial[];
    featuredCount: number;
}

interface FormData {
    name: string;
    position: string;
    company: string;
    quote: string;
    rating: number;
    image: File | null;
    is_featured: boolean;
}

export default function Testimonials({ testimonials: initialTestimonials, featuredCount }: Props) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);

    const form = useForm<FormData>({
        name: '',
        position: '',
        company: '',
        quote: '',
        rating: 5,
        image: null,
        is_featured: false,
    });

    const editForm = useForm<FormData>({
        name: '',
        position: '',
        company: '',
        quote: '',
        rating: 5,
        image: null,
        is_featured: false,
    });

    // Filter testimonials based on search query
    const filteredTestimonials = testimonials.filter(testimonial => 
        testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('admin.testimonials.store'), {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                form.reset();
                toast.success('Testimonial created successfully');
            },
        });
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial);
        editForm.setData({
            name: testimonial.name,
            position: testimonial.position,
            company: testimonial.company,
            quote: testimonial.quote,
            rating: testimonial.rating,
            image: null,
            is_featured: testimonial.is_featured,
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTestimonial) return;

        editForm.put(route('admin.testimonials.update', { testimonial: editingTestimonial.id }), {
            onSuccess: () => {
                setEditingTestimonial(null);
                editForm.reset();
                toast.success('Testimonial updated successfully');
            },
        });
    };

    const confirmDelete = (testimonial: Testimonial) => {
        setTestimonialToDelete(testimonial);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmed = () => {
        if (!testimonialToDelete) return;

        router.delete(route('admin.testimonials.destroy', { testimonial: testimonialToDelete.id }), {
            onSuccess: () => {
                toast.success('Testimonial deleted successfully');
                setDeleteConfirmOpen(false);
                setTestimonialToDelete(null);
            },
        });
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        
        const items = Array.from(testimonials);
        [items[index], items[index - 1]] = [items[index - 1], items[index]];
        
        setTestimonials(items);
        router.post(route('admin.testimonials.reorder'), {
            orderedIds: items.map(item => item.id),
        });
    };

    const handleMoveDown = (index: number) => {
        if (index === testimonials.length - 1) return;
        
        const items = Array.from(testimonials);
        [items[index], items[index + 1]] = [items[index + 1], items[index]];
        
        setTestimonials(items);
        router.post(route('admin.testimonials.reorder'), {
            orderedIds: items.map(item => item.id),
        });
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(testimonials);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTestimonials(items);
        router.post(route('admin.testimonials.reorder'), {
            orderedIds: items.map(item => item.id),
        });
    };

    const toggleFeatured = (testimonial: Testimonial) => {
        router.post(route('admin.testimonials.toggle-featured', { testimonial: testimonial.id }), {
            onSuccess: () => {
                toast.success(`Testimonial ${testimonial.is_featured ? 'unfeatured' : 'featured'} successfully`);
            },
            onError: (errors) => {
                toast.error(errors.message);
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Testimonials - Portfolio Admin" />

            <div className="p-6 space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                            <span className="inline-flex items-center gap-2">
                                Testimonials
                                <span className="flex h-6 items-center rounded-full bg-[#20B2AA]/10 px-2 text-sm font-medium text-[#20B2AA]">
                                    {testimonials.length}
                                </span>
                            </span>
                        </h1>
                        <p className="text-[0.925rem] text-muted-foreground">
                            Manage client testimonials and reviews
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-lg p-2 border border-gray-100">
                            <Badge variant="success" className="h-6 px-2 font-medium bg-emerald-50 text-emerald-600 border-emerald-100">
                                {featuredCount}/3 Featured
                            </Badge>
                        </div>
                        <Button 
                            onClick={() => setIsAddDialogOpen(true)} 
                            className="bg-[#20B2AA] hover:bg-[#1a9994] text-white shadow-sm transition-all duration-200 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add New Testimonial
                        </Button>
                    </div>
                </div>

                {/* Search Section */}
                <Card className="p-4 border-none shadow-sm bg-white/50 backdrop-blur-sm">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search testimonials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full bg-white/70 border-gray-200 focus:ring-[#20B2AA] focus:border-[#20B2AA] transition-colors duration-200"
                        />
                    </div>
                </Card>

                {/* Testimonials List */}
                <Card className="border-none shadow-sm overflow-hidden">
                    <div className="p-4 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
                        <h2 className="text-sm font-medium text-gray-700">Testimonials List</h2>
                    </div>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="testimonials">
                            {(provided) => (
                                <div 
                                    {...provided.droppableProps} 
                                    ref={provided.innerRef} 
                                    className="bg-white/50 backdrop-blur-sm divide-y divide-gray-100"
                                >
                                    {filteredTestimonials.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                                <Search className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <h3 className="text-sm font-medium text-gray-900 mb-1">No testimonials found</h3>
                                            <p className="text-sm text-gray-500">
                                                {searchQuery ? 'Try adjusting your search' : 'Get started by adding a new testimonial'}
                                            </p>
                                        </div>
                                    ) : (
                                        filteredTestimonials.map((testimonial, index) => (
                                            <Draggable key={testimonial.id} draggableId={String(testimonial.id)} index={index}>
                                                {(provided) => (
                                                    <motion.div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                                        className="flex items-start gap-6 p-5 hover:bg-gray-50/80 transition-all duration-200 group relative"
                                                    >
                                                        <div {...provided.dragHandleProps} className="cursor-move text-gray-400 hover:text-gray-600 transition-colors pt-2">
                                                            <GripVertical className="w-5 h-5" />
                                                        </div>
                                                        
                                                        {testimonial.image && (
                                                            <div className="flex-shrink-0">
                                                                <img 
                                                                    src={`/storage/${testimonial.image}`}
                                                                    alt={testimonial.name}
                                                                    className="w-12 h-12 rounded-full object-cover"
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <h3 className="text-base font-medium text-gray-900">{testimonial.name}</h3>
                                                                {testimonial.is_featured && (
                                                                    <Badge variant="secondary" className="bg-amber-50 text-amber-600 border-amber-100">
                                                                        Featured
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-gray-600 mb-2">
                                                                {testimonial.position} at {testimonial.company}
                                                            </p>
                                                            <div className="flex items-center gap-1 mb-3">
                                                                {Array.from({ length: 5 }).map((_, i) => (
                                                                    <Star 
                                                                        key={i}
                                                                        className={cn(
                                                                            "w-4 h-4",
                                                                            i < testimonial.rating ? "text-amber-400 fill-current" : "text-gray-300"
                                                                        )}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <p className="text-gray-600 text-sm line-clamp-2">{testimonial.quote}</p>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center gap-1">
                                                                {index !== 0 && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 text-gray-500 hover:text-[#20B2AA] hover:bg-[#E6F7F6]"
                                                                        onClick={() => handleMoveUp(index)}
                                                                    >
                                                                        <ArrowUp className="h-4 w-4" />
                                                                    </Button>
                                                                )}
                                                                {index !== filteredTestimonials.length - 1 && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 text-gray-500 hover:text-[#20B2AA] hover:bg-[#E6F7F6]"
                                                                        onClick={() => handleMoveDown(index)}
                                                                    >
                                                                        <ArrowDown className="h-4 w-4" />
                                                                    </Button>
                                                                )}
                                                            </div>

                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                        <span className="sr-only">Open menu</span>
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-[160px]">
                                                                    <DropdownMenuItem 
                                                                        onClick={() => toggleFeatured(testimonial)}
                                                                        className="text-gray-600 hover:text-gray-900"
                                                                    >
                                                                        {testimonial.is_featured ? (
                                                                            <>
                                                                                <StarOff className="mr-2 h-4 w-4" />
                                                                                Unfeature
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Star className="mr-2 h-4 w-4" />
                                                                                Feature
                                                                            </>
                                                                        )}
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem 
                                                                        onClick={() => handleEdit(testimonial)}
                                                                        className="text-gray-600 hover:text-gray-900"
                                                                    >
                                                                        <Edit2 className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem 
                                                                        onClick={() => confirmDelete(testimonial)}
                                                                        className="text-red-600 hover:text-red-700"
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </Draggable>
                                        ))
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Card>
            </div>

            {/* Add New Testimonial Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white/95 backdrop-blur-sm border-none shadow-lg">
                    <div className="bg-gradient-to-r from-[#20B2AA]/10 to-transparent p-6 border-b border-gray-100">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-xl">
                                <div className="p-2 rounded-full bg-[#20B2AA]/10">
                                    <Plus className="w-5 h-5 text-[#20B2AA]" />
                                </div>
                                Add New Testimonial
                            </DialogTitle>
                            <DialogDescription className="text-gray-500">
                                Add a new client testimonial. Fill in the details below.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Name
                                    <span className="text-red-500">*</span>
                                    <span className="ml-auto text-xs text-gray-400">(Required)</span>
                                </label>
                                <Input
                                    type="text"
                                    value={form.data.name}
                                    onChange={e => form.setData('name', e.target.value)}
                                    className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20"
                                    placeholder="e.g., John Smith"
                                />
                                {form.errors.name && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {form.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Position
                                    <span className="text-red-500">*</span>
                                    <span className="ml-auto text-xs text-gray-400">(Required)</span>
                                </label>
                                <Input
                                    type="text"
                                    value={form.data.position}
                                    onChange={e => form.setData('position', e.target.value)}
                                    className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20"
                                    placeholder="e.g., CEO"
                                />
                                {form.errors.position && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {form.errors.position}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Company
                                <span className="text-red-500">*</span>
                                <span className="ml-auto text-xs text-gray-400">(Required)</span>
                            </label>
                            <Input
                                type="text"
                                value={form.data.company}
                                onChange={e => form.setData('company', e.target.value)}
                                className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20"
                                placeholder="e.g., Tech Corp"
                            />
                            {form.errors.company && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                    {form.errors.company}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Quote
                                <span className="text-red-500">*</span>
                                <span className="ml-auto text-xs text-gray-400">(Required)</span>
                            </label>
                            <Textarea
                                value={form.data.quote}
                                onChange={e => form.setData('quote', e.target.value)}
                                className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20"
                                placeholder="Enter the testimonial quote..."
                                rows={4}
                            />
                            {form.errors.quote && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                    {form.errors.quote}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Rating
                                    <span className="text-red-500">*</span>
                                    <span className="ml-auto text-xs text-gray-400">(Required)</span>
                                </label>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => form.setData('rating', i + 1)}
                                            className="focus:outline-none"
                                        >
                                            <Star 
                                                className={cn(
                                                    "w-6 h-6 transition-colors",
                                                    i < form.data.rating ? "text-amber-400 fill-current" : "text-gray-300"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                                {form.errors.rating && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {form.errors.rating}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Profile Image
                                    <span className="ml-2 text-xs text-gray-400">(Optional)</span>
                                </label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => form.setData('image', e.target.files?.[0] || null)}
                                    className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20"
                                />
                                {form.errors.image && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {form.errors.image}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAddDialogOpen(false)}
                                    className="border-gray-200 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit"
                                    className="bg-[#20B2AA] hover:bg-[#1a9994] text-white shadow-sm transition-all duration-200 flex items-center gap-2"
                                    disabled={form.processing}
                                >
                                    {form.processing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4" />
                                            Add Testimonial
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Testimonial Dialog */}
            <Dialog open={!!editingTestimonial} onOpenChange={() => setEditingTestimonial(null)}>
                <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white/95 backdrop-blur-sm border-none shadow-lg">
                    <div className="bg-gradient-to-r from-[#20B2AA]/10 to-transparent p-6 border-b border-gray-100">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-xl">
                                <div className="p-2 rounded-full bg-[#20B2AA]/10">
                                    <Edit2 className="w-5 h-5 text-[#20B2AA]" />
                                </div>
                                Edit Testimonial
                            </DialogTitle>
                            <DialogDescription className="text-gray-500">
                                Update the testimonial details below.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6 p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Name
                                    <span className="text-red-500">*</span>
                                    <span className="ml-auto text-xs text-gray-400">(Required)</span>
                                </label>
                                <Input
                                    type="text"
                                    value={editForm.data.name}
                                    onChange={e => editForm.setData('name', e.target.value)}
                                    className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20"
                                    placeholder="e.g., John Smith"
                                />
                                {editForm.errors.name && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {editForm.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Position
                                    <span className="text-red-500">*</span>
                                    <span className="ml-auto text-xs text-gray-400">(Required)</span>
                                </label>
                                <Input
                                    type="text"
                                    value={editForm.data.position}
                                    onChange={e => editForm.setData('position', e.target.value)}
                                    className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20"
                                    placeholder="e.g., CEO"
                                />
                                {editForm.errors.position && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {editForm.errors.position}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Company
                                <span className="text-red-500">*</span>
                                <span className="ml-auto text-xs text-gray-400">(Required)</span>
                            </label>
                            <Input
                                type="text"
                                value={editForm.data.company}
                                onChange={e => editForm.setData('company', e.target.value)}
                                className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20"
                                placeholder="e.g., Tech Corp"
                            />
                            {editForm.errors.company && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                    {editForm.errors.company}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Quote
                                <span className="text-red-500">*</span>
                                <span className="ml-auto text-xs text-gray-400">(Required)</span>
                            </label>
                            <Textarea
                                value={editForm.data.quote}
                                onChange={e => editForm.setData('quote', e.target.value)}
                                className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20"
                                placeholder="Enter the testimonial quote..."
                                rows={4}
                            />
                            {editForm.errors.quote && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                    {editForm.errors.quote}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Rating
                                    <span className="text-red-500">*</span>
                                    <span className="ml-auto text-xs text-gray-400">(Required)</span>
                                </label>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => editForm.setData('rating', i + 1)}
                                            className="focus:outline-none"
                                        >
                                            <Star 
                                                className={cn(
                                                    "w-6 h-6 transition-colors",
                                                    i < editForm.data.rating ? "text-amber-400 fill-current" : "text-gray-300"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                                {editForm.errors.rating && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {editForm.errors.rating}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Profile Image
                                    <span className="ml-2 text-xs text-gray-400">(Optional)</span>
                                </label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => editForm.setData('image', e.target.files?.[0] || null)}
                                    className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20"
                                />
                                {editForm.errors.image && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {editForm.errors.image}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditingTestimonial(null)}
                                    className="border-gray-200 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit"
                                    className="bg-[#20B2AA] hover:bg-[#1a9994] text-white shadow-sm transition-all duration-200 flex items-center gap-2"
                                    disabled={editForm.processing}
                                >
                                    {editForm.processing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 className="w-4 h-4" />
                                            Update Testimonial
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <DeleteConfirmation 
                isOpen={deleteConfirmOpen}
                onClose={() => {
                    setDeleteConfirmOpen(false);
                    setTestimonialToDelete(null);
                }}
                onConfirm={handleDeleteConfirmed}
                title="Delete Testimonial"
                description="Are you sure you want to delete this testimonial? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </AdminLayout>
    );
} 