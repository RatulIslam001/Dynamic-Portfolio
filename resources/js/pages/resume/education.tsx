import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, ArrowUp, ArrowDown, Pencil, Trash2, GraduationCap, Link as LinkIcon, Building2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DeleteConfirmation from '@/components/ui/delete-confirmation';

interface Education {
    id: number;
    degree: string;
    institution: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string;
    order: number;
}

const dummyEducation: Education[] = [
    {
        id: 1,
        degree: "Master's in Computer Science",
        institution: "Tech University",
        location: "San Francisco, CA",
        start_date: "2014-09",
        end_date: "2016-06",
        description: "Specialized in web technologies and user interface design.",
        order: 1
    },
    {
        id: 2,
        degree: "Bachelor's in Computer Science",
        institution: "State University",
        location: "New York, NY",
        start_date: "2010-09",
        end_date: "2014-05",
        description: "Focused on software development and design principles.",
        order: 2
    },
    {
        id: 3,
        degree: "Associate's in Graphic Design",
        institution: "Design Institute",
        location: "Boston, MA",
        start_date: "2008-09",
        end_date: "2010-05",
        description: "Studied visual communication and digital design fundamentals.",
        order: 3
    }
];

interface FormData {
    institution: string;
    degree: string;
    field: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    description: string;
}

const formatDateForInput = (dateStr: string | null): string => {
    if (!dateStr) return '';
    // Ensure the date is in YYYY-MM-DD format for input
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
};

const formatDateForDisplay = (dateStr: string | null): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const validateDate = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
};

export default function Education() {
    const [education, setEducation] = useState<Education[]>(dummyEducation);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingEducation, setEditingEducation] = useState<Education | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [educationToDelete, setEducationToDelete] = useState<Education | null>(null);

    const form = useForm<FormData>({
        degree: '',
        institution: '',
        location: '',
        start_date: '',
        end_date: '',
        description: '',
        is_current: false,
    });

    const editForm = useForm<FormData>({
        degree: '',
        institution: '',
        location: '',
        start_date: '',
        end_date: '',
        description: '',
        is_current: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate dates
        if (!validateDate(form.data.start_date)) {
            toast.error('Please enter a valid start date');
            return;
        }
        
        if (!form.data.is_current && form.data.end_date && !validateDate(form.data.end_date)) {
            toast.error('Please enter a valid end date');
            return;
        }

        // Add form submission logic here
        setIsAddDialogOpen(false);
    };

    const handleEdit = (edu: Education) => {
        setEditingEducation(edu);
        editForm.setData({
            degree: edu.degree,
            institution: edu.institution,
            location: edu.location,
            start_date: edu.start_date,
            end_date: edu.end_date,
            description: edu.description,
            is_current: edu.end_date === null,
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingEducation) return;

        // Validate dates
        if (!validateDate(editForm.data.start_date)) {
            toast.error('Please enter a valid start date');
            return;
        }
        
        if (!editForm.data.is_current && editForm.data.end_date && !validateDate(editForm.data.end_date)) {
            toast.error('Please enter a valid end date');
            return;
        }

        const updatedEducation = education.map(edu => {
            if (edu.id === editingEducation.id) {
                return {
                    ...edu,
                    ...editForm.data,
                    end_date: editForm.data.is_current ? null : editForm.data.end_date,
                };
            }
            return edu;
        });

        setEducation(updatedEducation);
        setEditingEducation(null);
        toast.success('Education updated successfully');
    };

    const confirmDelete = (edu: Education) => {
        setEducationToDelete(edu);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmed = () => {
        if (!educationToDelete) return;

        const newEducation = education.filter(edu => edu.id !== educationToDelete.id);
        newEducation.forEach((edu, index) => {
            edu.order = index + 1;
        });
        setEducation(newEducation);
        setDeleteConfirmOpen(false);
        setEducationToDelete(null);
        toast.success('Education deleted successfully');
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const newEducation = [...education];
        [newEducation[index], newEducation[index - 1]] = [newEducation[index - 1], newEducation[index]];
        newEducation[index].order = index + 1;
        newEducation[index - 1].order = index;
        setEducation(newEducation);
    };

    const handleMoveDown = (index: number) => {
        if (index === education.length - 1) return;
        const newEducation = [...education];
        [newEducation[index], newEducation[index + 1]] = [newEducation[index + 1], newEducation[index]];
        newEducation[index].order = index + 1;
        newEducation[index + 1].order = index + 2;
        setEducation(newEducation);
    };

    const formatDate = (date: string) => {
        return formatDateForDisplay(date);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">Education</h2>
                    <p className="text-sm text-gray-500">Manage your educational background</p>
                </div>
                <Button 
                    onClick={() => setIsAddDialogOpen(true)} 
                    className="bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                </Button>
            </div>

            <Card className="border border-gray-200">
                {education.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <GraduationCap className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">No education entries added</h3>
                        <p className="text-sm text-gray-500">Add your educational background to showcase your qualifications.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        <div className="px-6 py-4 bg-gradient-to-r from-[#E6F7F6] to-white">
                            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                <div className="p-1 rounded-lg bg-[#20B2AA]/10">
                                    <GraduationCap className="w-4 h-4 text-[#20B2AA]" />
                                </div>
                                Education Timeline
                            </h3>
                        </div>
                        {education.map((edu, index) => (
                            <div key={edu.id} className="p-6 relative hover:bg-gray-50/80 transition-all duration-200 group">
                                {/* Timeline dot and line */}
                                <div className="absolute left-0 top-0 bottom-0 flex items-center">
                                    <div className="w-px bg-gradient-to-b from-[#20B2AA] to-[#20B2AA]/20 h-full mx-auto relative">
                                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#E6F7F6] border-2 border-[#20B2AA] ring-4 ring-[#E6F7F6]/50 transition-transform duration-300 group-hover:scale-110 group-hover:ring-[#E6F7F6]/70" />
                                    </div>
                                </div>

                                <div className="ml-10">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#20B2AA] transition-colors duration-200 flex items-center gap-2">
                                                    {edu.degree}
                                                    <span className="inline-flex items-center rounded-md bg-[#E6F7F6] px-2 py-1 text-xs font-medium text-[#20B2AA] ring-1 ring-inset ring-[#20B2AA]/10">
                                                        {formatDate(edu.start_date)} — {formatDate(edu.end_date)}
                                                    </span>
                                                </h3>
                                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="font-medium flex items-center gap-1.5">
                                                        <GraduationCap className="w-4 h-4 text-[#20B2AA]/70" />
                                                        {edu.institution}
                                                    </span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="flex items-center gap-1.5 text-gray-500">
                                                        <svg className="w-3.5 h-3.5 text-[#20B2AA]/70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                                            <circle cx="12" cy="10" r="3" />
                                                        </svg>
                                                        {edu.location}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                                                {edu.description}
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
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
                                            {index !== education.length - 1 && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-500 hover:text-[#20B2AA] hover:bg-[#E6F7F6]"
                                                    onClick={() => handleMoveDown(index)}
                                                >
                                                    <ArrowDown className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-500 hover:text-[#20B2AA] hover:bg-[#E6F7F6]"
                                                onClick={() => handleEdit(edu)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => confirmDelete(edu)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmation 
                isOpen={deleteConfirmOpen}
                onClose={() => {
                    setDeleteConfirmOpen(false);
                    setEducationToDelete(null);
                }}
                onConfirm={handleDeleteConfirmed}
                title="Delete Education"
                description="Are you sure you want to delete this education entry? This action cannot be undone."
            />

            {/* Edit Education Dialog */}
            <Dialog open={!!editingEducation} onOpenChange={(open) => !open && setEditingEducation(null)}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Pencil className="w-5 h-5 text-[#20B2AA]" />
                            Edit Education
                        </DialogTitle>
                        <DialogDescription>
                            Update your education information. Make changes to the fields below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-2">
                                <Label htmlFor="edit-degree">Degree</Label>
                                <Input
                                    id="edit-degree"
                                    value={editForm.data.degree}
                                    onChange={e => editForm.setData('degree', e.target.value)}
                                    placeholder="e.g. Bachelor of Science in Computer Science"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-institution">Institution</Label>
                                <Input
                                    id="edit-institution"
                                    value={editForm.data.institution}
                                    onChange={e => editForm.setData('institution', e.target.value)}
                                    placeholder="e.g. University Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-location">Location</Label>
                                <Input
                                    id="edit-location"
                                    value={editForm.data.location}
                                    onChange={e => editForm.setData('location', e.target.value)}
                                    placeholder="e.g. New York, NY"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-start-date">Start Date</Label>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                        <line x1="16" x2="16" y1="2" y2="6" />
                                        <line x1="8" x2="8" y1="2" y2="6" />
                                        <line x1="3" x2="21" y1="10" y2="10" />
                                    </svg>
                                    <Input
                                        id="edit-start-date"
                                        type="date"
                                        value={formatDateForInput(editForm.data.start_date)}
                                        onChange={e => editForm.setData('start_date', e.target.value)}
                                        className="pl-10 cursor-pointer"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-end-date">End Date</Label>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                        <line x1="16" x2="16" y1="2" y2="6" />
                                        <line x1="8" x2="8" y1="2" y2="6" />
                                        <line x1="3" x2="21" y1="10" y2="10" />
                                    </svg>
                                    <Input
                                        id="edit-end-date"
                                        type="date"
                                        value={formatDateForInput(editForm.data.end_date)}
                                        onChange={e => editForm.setData('end_date', e.target.value)}
                                        className="pl-10 cursor-pointer"
                                        disabled={editForm.data.is_current}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                                id="edit-description"
                                value={editForm.data.description}
                                onChange={e => editForm.setData('description', e.target.value)}
                                placeholder="Describe your studies, achievements, or specializations..."
                                className="h-32"
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditingEducation(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                disabled={editForm.processing}
                            >
                                {editForm.processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Add Education Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-[#E6F7F6]">
                                <Plus className="w-5 h-5 text-[#20B2AA]" />
                            </div>
                            Add Education
                        </DialogTitle>
                        <DialogDescription className="text-base">
                            Add details about your educational background. Fill in the information below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 space-y-2">
                                <Label htmlFor="degree" className="text-sm font-medium">
                                    Degree
                                    <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <div className="relative">
                                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="degree"
                                        value={form.data.degree}
                                        onChange={e => form.setData('degree', e.target.value)}
                                        placeholder="e.g. Bachelor of Science in Computer Science"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="institution" className="text-sm font-medium">
                                    Institution
                                    <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="institution"
                                        value={form.data.institution}
                                        onChange={e => form.setData('institution', e.target.value)}
                                        placeholder="e.g. University Name"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-sm font-medium">
                                    Location
                                    <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <Input
                                        id="location"
                                        value={form.data.location}
                                        onChange={e => form.setData('location', e.target.value)}
                                        placeholder="e.g. New York, NY"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="start_date" className="text-sm font-medium">
                                    Start Date
                                    <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                        <line x1="16" x2="16" y1="2" y2="6" />
                                        <line x1="8" x2="8" y1="2" y2="6" />
                                        <line x1="3" x2="21" y1="10" y2="10" />
                                    </svg>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={formatDateForInput(form.data.start_date)}
                                        onChange={e => form.setData('start_date', e.target.value)}
                                        className="pl-10 cursor-pointer"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end_date" className="text-sm font-medium">
                                    End Date
                                    {!form.data.is_current && <span className="text-red-500 ml-1">*</span>}
                                </Label>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                        <line x1="16" x2="16" y1="2" y2="6" />
                                        <line x1="8" x2="8" y1="2" y2="6" />
                                        <line x1="3" x2="21" y1="10" y2="10" />
                                    </svg>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={formatDateForInput(form.data.end_date)}
                                        onChange={e => form.setData('end_date', e.target.value)}
                                        className="pl-10 cursor-pointer"
                                        required={!form.data.is_current}
                                        disabled={form.data.is_current}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium">
                                Description
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="21" x2="3" y1="6" y2="6" />
                                    <line x1="15" x2="3" y1="12" y2="12" />
                                    <line x1="17" x2="3" y1="18" y2="18" />
                                </svg>
                                <Textarea
                                    id="description"
                                    value={form.data.description}
                                    onChange={e => form.setData('description', e.target.value)}
                                    placeholder="Describe your studies, achievements, or specializations..."
                                    className="min-h-[120px] pl-10 resize-y"
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Write about your major, academic achievements, relevant coursework, and any special projects or research.
                            </p>
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsAddDialogOpen(false)}
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="w-full sm:w-auto bg-[#20B2AA] hover:bg-[#1a9994] text-white"
                                disabled={form.processing}
                            >
                                {form.processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Education
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
} 