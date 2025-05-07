import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus, Search, GripVertical, Eye, EyeOff, Edit2, Trash2, MoreHorizontal, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DeleteConfirmation from '@/components/ui/delete-confirmation';

const categoryOptions = [
    'Technical',
    'Design',
    'Soft Skills',
    'Languages',
] as const;

interface Skill {
    id: number;
    name: string;
    proficiency: number;
    category: string;
    display_type: 'progress' | 'card';
    order: number;
    is_visible: boolean;
}

interface Props {
    skills: {
        progress: Skill[];
        card: Skill[];
    };
    progressSkillsCount: number;
    cardSkillsCount: number;
}

interface FormData {
    name: string;
    proficiency: number;
    category: string;
    display_type: 'progress' | 'card';
    is_visible: boolean;
}

export default function Skills({ skills: initialSkills, progressSkillsCount, cardSkillsCount }: Props) {
    const [skills, setSkills] = useState<Props['skills']>(initialSkills);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
    const [selectedDisplayType, setSelectedDisplayType] = useState<'progress' | 'card'>('progress');
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

    const form = useForm<FormData>({
        name: '',
        proficiency: 0,
        category: categoryOptions[0],
        display_type: 'progress',
        is_visible: true,
    });

    const editForm = useForm<FormData>({
        name: '',
        proficiency: 0,
        category: categoryOptions[0],
        display_type: 'progress',
        is_visible: true,
    });

    const filteredSkills = (skills[selectedDisplayType] || []).filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All Categories' || skill.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('admin.skills.store'), {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                form.reset();
                toast.success('Skill created successfully');
            },
        });
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        editForm.setData({
            name: skill.name,
            proficiency: skill.proficiency,
            category: skill.category,
            display_type: skill.display_type,
            is_visible: skill.is_visible,
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSkill) return;

        editForm.put(route('admin.skills.update', { skill: editingSkill.id }), {
            onSuccess: () => {
                setEditingSkill(null);
                editForm.reset();
                toast.success('Skill updated successfully');
            },
        });
    };

    const confirmDelete = (skill: Skill) => {
        setSkillToDelete(skill);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmed = () => {
        if (!skillToDelete) return;

        router.delete(route('admin.skills.destroy', { skill: skillToDelete.id }), {
            onSuccess: () => {
                toast.success('Skill deleted successfully');
                setDeleteConfirmOpen(false);
                setSkillToDelete(null);
            },
        });
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        
        const items = Array.from(skills[selectedDisplayType]);
        [items[index], items[index - 1]] = [items[index - 1], items[index]];
        
        // Optimistically update the UI
        setSkills({
            ...skills,
            [selectedDisplayType]: items,
        });

        // Update order in backend
        router.post(route('admin.skills.reorder'), {
            orderedIds: items.map(item => item.id),
            display_type: selectedDisplayType,
        });
    };

    const handleMoveDown = (index: number) => {
        if (index === skills[selectedDisplayType].length - 1) return;
        
        const items = Array.from(skills[selectedDisplayType]);
        [items[index], items[index + 1]] = [items[index + 1], items[index]];
        
        // Optimistically update the UI
        setSkills({
            ...skills,
            [selectedDisplayType]: items,
        });

        // Update order in backend
        router.post(route('admin.skills.reorder'), {
            orderedIds: items.map(item => item.id),
            display_type: selectedDisplayType,
        });
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(skills[selectedDisplayType]);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Optimistically update the UI
        setSkills({
            ...skills,
            [selectedDisplayType]: items,
        });

        // Update order in backend
        router.post(route('admin.skills.reorder'), {
            orderedIds: items.map(item => item.id),
            display_type: selectedDisplayType,
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                if (page.props.success) {
                    toast.success('Order updated successfully');
                }
            },
            onError: () => {
                // Revert the optimistic update on error
                setSkills({
                    ...skills,
                    [selectedDisplayType]: Array.from(skills[selectedDisplayType])
                });
                toast.error('Failed to update order');
            }
        });
    };

    const toggleVisibility = (skill: Skill) => {
        router.post(route('admin.skills.toggle-visibility', { skill: skill.id }), {
            onSuccess: () => {
                toast.success(`Skill ${skill.is_visible ? 'hidden' : 'shown'} successfully`);
            },
            onError: (errors) => {
                toast.error(errors.message);
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Skills - Portfolio Admin" />

            <div className="p-6 space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                            <span className="inline-flex items-center gap-2">
                                Skills
                                <span className="flex h-6 items-center rounded-full bg-[#20B2AA]/10 px-2 text-sm font-medium text-[#20B2AA]">
                                    {Object.values(skills).flat().length}
                                </span>
                            </span>
                        </h1>
                        <p className="text-[0.925rem] text-muted-foreground">
                            Manage and showcase your professional expertise
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-lg p-2 border border-gray-100">
                            <Badge variant="success" className="h-6 px-2 font-medium bg-emerald-50 text-emerald-600 border-emerald-100">
                                {progressSkillsCount}/5 Progress
                            </Badge>
                            <Badge variant="info" className="h-6 px-2 font-medium bg-blue-50 text-blue-600 border-blue-100">
                                {cardSkillsCount}/6 Cards
                            </Badge>
                        </div>
                        <Button 
                            onClick={() => setIsAddDialogOpen(true)} 
                            className="bg-[#20B2AA] hover:bg-[#1a9994] text-white shadow-sm transition-all duration-200 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add New Skill
                        </Button>
                    </div>
                </div>

                {/* Filters Section */}
                <Card className="p-4 border-none shadow-sm bg-white/50 backdrop-blur-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="flex-1 min-w-[240px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    type="text"
                                    placeholder="Search skills..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 w-full bg-white/70 border-gray-200 focus:ring-[#20B2AA] focus:border-[#20B2AA] transition-colors duration-200"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-[180px] bg-white/70 border-gray-200 focus:ring-[#20B2AA] focus:border-[#20B2AA] transition-colors duration-200">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Categories">All Categories</SelectItem>
                                    {categoryOptions.map((category) => (
                                        <SelectItem 
                                            key={category} 
                                            value={category}
                                            className="focus:bg-[#20B2AA]/10 focus:text-[#20B2AA]"
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Tabs 
                                value={selectedDisplayType} 
                                onValueChange={(value: 'progress' | 'card') => setSelectedDisplayType(value)} 
                                className="w-auto"
                            >
                                <TabsList className="bg-white/70 border border-gray-200 p-1">
                                    <TabsTrigger 
                                        value="progress" 
                                        className="data-[state=active]:bg-[#20B2AA] data-[state=active]:text-white flex items-center gap-2"
                                    >
                                        <div className="w-3 h-0.5 bg-current rounded-full" />
                                        Progress Bar Skills
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="card" 
                                        className="data-[state=active]:bg-[#20B2AA] data-[state=active]:text-white flex items-center gap-2"
                                    >
                                        <div className="w-2 h-2 border-2 border-current rounded" />
                                        Card Skills
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>
                </Card>

                {/* Skills List */}
                <Card className="border-none shadow-sm overflow-hidden">
                    <div className="p-4 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
                        <h2 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            {selectedDisplayType === 'progress' ? (
                                <>
                                    <div className="w-3 h-0.5 bg-[#20B2AA] rounded-full" />
                                    Progress Bar Skills
                                </>
                            ) : (
                                <>
                                    <div className="w-2 h-2 border-2 border-[#20B2AA] rounded" />
                                    Card Skills
                                </>
                            )}
                            <span className="text-gray-400 ml-2 text-xs font-normal">
                                (Max {selectedDisplayType === 'progress' ? '5' : '6'} visible)
                            </span>
                        </h2>
                    </div>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId={selectedDisplayType}>
                            {(provided) => (
                                <div 
                                    {...provided.droppableProps} 
                                    ref={provided.innerRef} 
                                    className="bg-white/50 backdrop-blur-sm divide-y divide-gray-100"
                                >
                                    {filteredSkills.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                                <Search className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <h3 className="text-sm font-medium text-gray-900 mb-1">No skills found</h3>
                                            <p className="text-sm text-gray-500">
                                                {searchQuery ? 'Try adjusting your search or filters' : 'Get started by adding a new skill'}
                                            </p>
                                        </div>
                                    ) : (
                                        filteredSkills.map((skill, index) => (
                                            <Draggable key={skill.id} draggableId={String(skill.id)} index={index}>
                                                {(provided) => (
                                                    <motion.div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                                        className={cn(
                                                            "flex items-center gap-6 p-5 hover:bg-gray-50/80 transition-all duration-200",
                                                            "group relative"
                                                        )}
                                                    >
                                                        <div {...provided.dragHandleProps} className="cursor-move text-gray-400 hover:text-gray-600 transition-colors">
                                                            <GripVertical className="w-5 h-5" />
                                                        </div>
                                                        
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-3 mb-3">
                                                                <h3 className="text-base font-medium text-gray-900">{skill.name}</h3>
                                                                <Badge 
                                                                    variant="secondary" 
                                                                    className={cn(
                                                                        "bg-opacity-10 border-opacity-20",
                                                                        skill.category === 'Technical' && "bg-blue-50 text-blue-700 border-blue-200",
                                                                        skill.category === 'Design' && "bg-purple-50 text-purple-700 border-purple-200",
                                                                        skill.category === 'Soft Skills' && "bg-green-50 text-green-700 border-green-200",
                                                                        skill.category === 'Languages' && "bg-orange-50 text-orange-700 border-orange-200"
                                                                    )}
                                                                >
                                                                    {skill.category}
                                                                </Badge>
                                                                {!skill.is_visible && (
                                                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                                                        Hidden
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                                                <motion.div 
                                                                    className="bg-[#20B2AA] h-2 rounded-full transition-all duration-500"
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${skill.proficiency}%` }}
                                                                    transition={{ duration: 1, delay: index * 0.1 }}
                                                                />
                                                            </div>
                                                            <div className="mt-2 text-sm text-gray-600 font-medium">
                                                                Proficiency: {skill.proficiency}%
                                                            </div>
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
                                                                {index !== filteredSkills.length - 1 && (
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
                                                                        onClick={() => toggleVisibility(skill)}
                                                                        className="text-gray-600 hover:text-gray-900"
                                                                    >
                                                                        {skill.is_visible ? (
                                                                            <>
                                                                                <EyeOff className="mr-2 h-4 w-4" />
                                                                                Hide
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Eye className="mr-2 h-4 w-4" />
                                                                                Show
                                                                            </>
                                                                        )}
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem 
                                                                        onClick={() => handleEdit(skill)}
                                                                        className="text-gray-600 hover:text-gray-900"
                                                                    >
                                                                        <Edit2 className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem 
                                                                        onClick={() => confirmDelete(skill)}
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

            {/* Add New Skill Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white/95 backdrop-blur-sm border-none shadow-lg">
                    <div className="bg-gradient-to-r from-[#20B2AA]/10 to-transparent p-6 border-b border-gray-100">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-xl">
                                <div className="p-2 rounded-full bg-[#20B2AA]/10">
                                    <Plus className="w-5 h-5 text-[#20B2AA]" />
                                </div>
                                Add New Skill
                            </DialogTitle>
                            <DialogDescription className="text-gray-500">
                                Add a new skill to showcase your expertise. Fill in the details below.
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
                                    placeholder="e.g., React.js"
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
                                    Category
                                    <span className="text-red-500">*</span>
                                    <span className="ml-auto text-xs text-gray-400">(Required)</span>
                                </label>
                                <Select 
                                    value={form.data.category} 
                                    onValueChange={(value) => form.setData('category', value)}
                                >
                                    <SelectTrigger className="bg-white/50 border-gray-200">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoryOptions.map((category) => (
                                            <SelectItem 
                                                key={category} 
                                                value={category}
                                                className="focus:bg-[#20B2AA]/10 focus:text-[#20B2AA]"
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.category && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {form.errors.category}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Display Type
                                    <span className="text-red-500">*</span>
                                    <span className="ml-auto text-xs text-gray-400">(Required)</span>
                                </label>
                                <Select 
                                    value={form.data.display_type} 
                                    onValueChange={(value: 'progress' | 'card') => form.setData('display_type', value)}
                                >
                                    <SelectTrigger className="bg-white/50 border-gray-200">
                                        <SelectValue placeholder="Select display type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem 
                                            value="progress"
                                            className="focus:bg-[#20B2AA]/10 focus:text-[#20B2AA]"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-1 bg-[#20B2AA] rounded-full"></div>
                                                Progress Bar
                                            </div>
                                        </SelectItem>
                                        <SelectItem 
                                            value="card"
                                            className="focus:bg-[#20B2AA]/10 focus:text-[#20B2AA]"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 border-2 border-[#20B2AA] rounded"></div>
                                                Card
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.display_type && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {form.errors.display_type}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Proficiency (%)
                                    <span className="text-red-500">*</span>
                                    <span className="ml-auto text-xs text-gray-400">(Required)</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={form.data.proficiency}
                                        onChange={e => form.setData('proficiency', parseInt(e.target.value))}
                                        className="w-full bg-white/50 border-gray-200 focus:border-[#20B2AA] focus:ring-[#20B2AA]/20 pr-12"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="text-sm text-gray-500">%</span>
                                    </div>
                                </div>
                                {form.errors.proficiency && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                                        {form.errors.proficiency}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Badge variant="secondary" className="bg-gray-50/80 text-gray-600 gap-1.5">
                                        <div className="w-3 h-0.5 bg-[#20B2AA] rounded-full" />
                                        Max 5 Progress Skills
                                    </Badge>
                                    <Badge variant="secondary" className="bg-gray-50/80 text-gray-600 gap-1.5">
                                        <div className="w-2 h-2 border-2 border-[#20B2AA] rounded" />
                                        Max 6 Card Skills
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3">
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
                                                Add Skill
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Skill Dialog */}
            <Dialog open={!!editingSkill} onOpenChange={() => setEditingSkill(null)}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit2 className="w-5 h-5 text-[#20B2AA]" />
                            Edit Skill
                        </DialogTitle>
                        <DialogDescription>
                            Update the skill details below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdate} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Name
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Input
                                type="text"
                                value={editForm.data.name}
                                onChange={e => editForm.setData('name', e.target.value)}
                                className="w-full"
                                placeholder="e.g., React.js"
                            />
                            {editForm.errors.name && (
                                <p className="text-sm text-red-600">{editForm.errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Category
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Select 
                                value={editForm.data.category} 
                                onValueChange={(value) => editForm.setData('category', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryOptions.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {editForm.errors.category && (
                                <p className="text-sm text-red-600">{editForm.errors.category}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Display Type
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Select 
                                value={editForm.data.display_type} 
                                onValueChange={(value: 'progress' | 'card') => editForm.setData('display_type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select display type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="progress">Progress Bar</SelectItem>
                                    <SelectItem value="card">Card</SelectItem>
                                </SelectContent>
                            </Select>
                            {editForm.errors.display_type && (
                                <p className="text-sm text-red-600">{editForm.errors.display_type}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Proficiency (%)
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Input
                                type="number"
                                min="0"
                                max="100"
                                value={editForm.data.proficiency}
                                onChange={e => editForm.setData('proficiency', parseInt(e.target.value))}
                                className="w-full"
                            />
                            {editForm.errors.proficiency && (
                                <p className="text-sm text-red-600">{editForm.errors.proficiency}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditingSkill(null)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                className="bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                disabled={editForm.processing}
                            >
                                Update Skill
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirmation 
                isOpen={deleteConfirmOpen}
                onClose={() => {
                    setDeleteConfirmOpen(false);
                    setSkillToDelete(null);
                }}
                onConfirm={handleDeleteConfirmed}
                title="Delete Skill"
                description="Are you sure you want to delete this skill? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </AdminLayout>
    );
} 