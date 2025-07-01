import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
    Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Upload, Save, User, Github, Twitter, Linkedin, FileText, Menu, X, Plus, GripVertical } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { DynamicLogo } from '@/components/ui/dynamic-logo';
import { 
    DndContext, 
    closestCenter, 
    KeyboardSensor, 
    PointerSensor, 
    useSensor, 
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface NavbarItem {
    title: string;
    href: string;
}

interface Profile {
    id: number;
    fullName: string;
    title: string;
    about: string;
    yearsExperience: number;
    projectsCompleted: number;
    avatar: string | null;
    resume: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
    twitterUrl: string | null;
    isAvailable: boolean;
    ctaText: string;
    ctaSecondaryText: string;
    ctaUrl: string;
    ctaSecondaryUrl: string;
    logo_text?: string;
    logo_type?: string;
    logo_icon?: string;
    logo_icon_type?: string;
    logo_color?: string;
    navbar_items?: NavbarItem[];
}

interface Props {
    profile: Profile;
    success?: string;
}

interface SortableItemProps {
    id: string;
    item: NavbarItem;
    index: number;
    updateNavbarItem: (index: number, field: 'title' | 'href', value: string) => void;
    removeNavbarItem: (index: number) => void;
}

function SortableItem({ id, item, index, updateNavbarItem, removeNavbarItem }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
        >
            <div 
                {...attributes} 
                {...listeners} 
                className="cursor-grab"
            >
                <GripVertical className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-2">
                <div>
                    <Input
                        placeholder="Item Title"
                        value={item.title}
                        onChange={(e) => updateNavbarItem(index, 'title', e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        placeholder="Item Link (e.g., 'home', 'services')"
                        value={item.href}
                        onChange={(e) => updateNavbarItem(index, 'href', e.target.value)}
                    />
                </div>
            </div>
            
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeNavbarItem(index)}
                className="text-gray-500 hover:text-red-500"
            >
                <X className="w-4 h-4" />
            </Button>
        </div>
    );
}

export default function AdminProfile({ profile, success }: Props) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar);
    const [activeTab, setActiveTab] = useState('hero');
    // Ensure navbar_items is always an array
    const getNavbarItems = () => {
        if (Array.isArray(profile.navbar_items)) {
            return profile.navbar_items;
        }
        if (typeof profile.navbar_items === 'string') {
            try {
                const parsed = JSON.parse(profile.navbar_items);
                return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                console.warn('Failed to parse navbar_items JSON:', e);
                return [];
            }
        }
        return [
            { title: 'Home', href: 'home' },
            { title: 'Services', href: 'services' },
            { title: 'Works', href: 'works' },
            { title: 'Skills', href: 'skills' },
            { title: 'Resume', href: 'resume' },
            { title: 'Testimonials', href: 'testimonials' },
            { title: 'Contact', href: 'contact' }
        ];
    };

    const [navbarItems, setNavbarItems] = useState<NavbarItem[]>(getNavbarItems());

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        fullName: profile.fullName || '',
        title: profile.title || '',
        about: profile.about || '',
        yearsExperience: profile.yearsExperience || 0,
        projectsCompleted: profile.projectsCompleted || 0,
        isAvailable: profile.isAvailable ?? true,
        ctaText: profile.ctaText || 'View Work',
        ctaSecondaryText: profile.ctaSecondaryText || 'Download CV',
        ctaUrl: profile.ctaUrl || '#works',
        ctaSecondaryUrl: profile.ctaSecondaryUrl || '#',
        avatar: null as File | null,
        resume: null as File | null,
        githubUrl: profile.githubUrl || '',
        linkedinUrl: profile.linkedinUrl || '',
        twitterUrl: profile.twitterUrl || '',
        logo_text: profile.logo_text || 'Portfolio',
        logo_type: profile.logo_type || 'text_with_icon',
        logo_icon: profile.logo_icon || 'P',
        logo_icon_type: profile.logo_icon_type || 'letter',
        logo_color: profile.logo_color || '#20B2AA',
        navbar_items: navbarItems,
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(success || null);

    // Clear success message after 5 seconds
    useEffect(() => {
        if (successMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [successMessage]);

    // Show success message if the form was successfully submitted
    useEffect(() => {
        if (wasSuccessful) {
            setSuccessMessage('Profile updated successfully.');
        }
    }, [wasSuccessful]);

    // Update form data when navbarItems change
    useEffect(() => {
        setData('navbar_items', navbarItems);
    }, [navbarItems]);

    // Handle form submission for hero section
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('title', data.title);
        formData.append('about', data.about);
        formData.append('yearsExperience', data.yearsExperience.toString());
        formData.append('projectsCompleted', data.projectsCompleted.toString());
        formData.append('isAvailable', data.isAvailable.toString());
        formData.append('ctaText', data.ctaText);
        formData.append('ctaSecondaryText', data.ctaSecondaryText);
        formData.append('ctaUrl', data.ctaUrl);
        formData.append('ctaSecondaryUrl', data.ctaSecondaryUrl);
        
        if (data.avatar) {
            formData.append('avatar', data.avatar);
        }
        
        // Use Inertia to submit the form
        post(route('admin.profile.hero.update'), {
            onSuccess: () => {
                setSuccessMessage('Profile updated successfully.');
            },
        });
    };

    // Handle social links submission
    const handleSocialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create FormData for submission
        const formData = new FormData();
        formData.append('githubUrl', data.githubUrl || '');
        formData.append('linkedinUrl', data.linkedinUrl || '');
        formData.append('twitterUrl', data.twitterUrl || '');
        
        // Use Inertia to submit the form
        post(route('admin.profile.social.update'), {
            onSuccess: () => {
                setSuccessMessage('Social links updated successfully.');
            },
        });
    };

    // Handle form submission for logo settings
    const handleLogoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.navbar.logo.update'), {
            onSuccess: () => {
                setSuccessMessage('Logo settings updated successfully.');
            },
        });
    };

    // Handle form submission for navbar items
    const handleNavbarSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.navbar.items.update'), {
            onSuccess: () => {
                setSuccessMessage('Navbar items updated successfully.');
            },
        });
    };

    // Add a new navbar item
    const addNavbarItem = () => {
        setNavbarItems([...navbarItems, { title: 'New Item', href: 'new-item' }]);
    };

    // Remove a navbar item
    const removeNavbarItem = (index: number) => {
        const updatedItems = [...navbarItems];
        updatedItems.splice(index, 1);
        setNavbarItems(updatedItems);
    };

    // Update a navbar item
    const updateNavbarItem = (index: number, field: 'title' | 'href', value: string) => {
        const updatedItems = [...navbarItems];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setNavbarItems(updatedItems);
    };

    // Handle drag and drop reordering
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        
        if (over && active.id !== over.id) {
            setNavbarItems((items) => {
                const oldIndex = parseInt(active.id.toString().split('-')[1]);
                const newIndex = parseInt(over.id.toString().split('-')[1]);
                
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    // Handle avatar upload
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('avatar', file);
            
            // Create a preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setAvatarPreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle resume upload
    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('resume', file);
        }
    };

    return (
        <AdminLayout>
            <Head title="Profile | Admin Dashboard" />
            
            <div className="container p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Profile Settings</h1>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline"
                            onClick={() => window.open(route('welcome'), '_blank')}
                        >
                            View Portfolio
                        </Button>
                    </div>
                </div>
                
                {successMessage && (
                    <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                )}
                
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="hero">Profile & Hero Section</TabsTrigger>
                        <TabsTrigger value="social">Social Links</TabsTrigger>
                        <TabsTrigger value="navbar">Navbar Settings</TabsTrigger>
                    </TabsList>
                    
                    {/* Hero Section Tab */}
                    <TabsContent value="hero">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile & Hero Section</CardTitle>
                                <CardDescription>
                                    Update your profile information and the content displayed in the hero section of your portfolio.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="col-span-1">
                                            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                                <div className="relative w-40 h-40 overflow-hidden rounded-lg mb-4 bg-gray-100">
                                                    {avatarPreview ? (
                                                        <img 
                                                            src={avatarPreview} 
                                                            alt="Profile" 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                                                            <User size={60} />
                                                        </div>
                                                    )}
                                                </div>
                                                <Label htmlFor="avatar" className="cursor-pointer">
                                                    <div className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                        <Upload className="w-4 h-4 mr-2" />
                                                        Upload Image
                                                    </div>
                                                    <input
                                                        id="avatar"
                                                        name="avatar"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleAvatarChange}
                                                    />
                                                </Label>
                                                <p className="mt-2 text-xs text-gray-500">
                                                    PNG, JPG or GIF. Max 2MB.
                                                </p>
                                                {errors.avatar && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>
                                                )}
                                            </div>

                                            <div className="mt-6">
                                                <div className="flex items-center space-x-2">
                                                    <Switch 
                                                        id="isAvailable"
                                                        checked={data.isAvailable}
                                                        onCheckedChange={(checked) => setData('isAvailable', checked)}
                                                    />
                                                    <Label htmlFor="isAvailable">Available for work</Label>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    This will show/hide the "Available for work" badge on your homepage.
                                                </p>
                                            </div>

                                            <div className="mt-6">
                                                <Label htmlFor="resume">Resume/CV</Label>
                                                <div className="mt-1 flex items-center">
                                                    <Label htmlFor="resume" className="cursor-pointer">
                                                        <div className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                            <FileText className="w-4 h-4 mr-2" />
                                                            Upload Resume
                                                        </div>
                                                        <input
                                                            id="resume"
                                                            name="resume"
                                                            type="file"
                                                            className="sr-only"
                                                            onChange={handleResumeChange}
                                                        />
                                                    </Label>
                                                    {data.resume && (
                                                        <span className="ml-2 text-sm text-gray-500">
                                                            File selected
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    PDF, DOC, or DOCX. Max 10MB.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-2 space-y-4">
                                            <div>
                                                <Label htmlFor="fullName">Full Name</Label>
                                                <Input
                                                    id="fullName"
                                                    value={data.fullName}
                                                    onChange={(e) => setData('fullName', e.target.value)}
                                                    placeholder="Your full name"
                                                    className="mt-1"
                                                />
                                                {errors.fullName && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                                                )}
                                            </div>
                                        
                                            <div>
                                                <Label htmlFor="title">Professional Title</Label>
                                                <Input
                                                    id="title"
                                                    value={data.title}
                                                    onChange={(e) => setData('title', e.target.value)}
                                                    placeholder="e.g. Creative Designer & Developer"
                                                    className="mt-1"
                                                />
                                                {errors.title && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                                )}
                                                <p className="mt-1 text-xs text-gray-500">
                                                    The main heading on your homepage. The words "Designer", "Developer", etc. will be highlighted.
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <Label htmlFor="about">About / Tagline</Label>
                                                <Textarea
                                                    id="about"
                                                    value={data.about}
                                                    onChange={(e) => setData('about', e.target.value)}
                                                    placeholder="Description of what you do that will appear on your homepage"
                                                    className="mt-1 min-h-[120px]"
                                                />
                                                {errors.about && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.about}</p>
                                                )}
                                                <p className="mt-1 text-xs text-gray-500">
                                                    This text appears on your homepage and helps visitors understand what you do.
                                                </p>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="yearsExperience">Years of Experience</Label>
                                                    <Input
                                                        id="yearsExperience"
                                                        type="number"
                                                        value={data.yearsExperience}
                                                        onChange={(e) => setData('yearsExperience', parseInt(e.target.value) || 0)}
                                                        className="mt-1"
                                                        min="0"
                                                    />
                                                    {errors.yearsExperience && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.yearsExperience}</p>
                                                    )}
                                                </div>
                                                
                                                <div>
                                                    <Label htmlFor="projectsCompleted">Projects Completed</Label>
                                                    <Input
                                                        id="projectsCompleted"
                                                        type="number"
                                                        value={data.projectsCompleted}
                                                        onChange={(e) => setData('projectsCompleted', parseInt(e.target.value) || 0)}
                                                        className="mt-1"
                                                        min="0"
                                                    />
                                                    {errors.projectsCompleted && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.projectsCompleted}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 pt-4 mt-4">
                                                <h3 className="text-lg font-medium mb-3">Call-to-Action Buttons</h3>
                                                
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="ctaText">Primary Button Text</Label>
                                                        <Input
                                                            id="ctaText"
                                                            value={data.ctaText}
                                                            onChange={(e) => setData('ctaText', e.target.value)}
                                                            className="mt-1"
                                                        />
                                                        {errors.ctaText && (
                                                            <p className="mt-1 text-sm text-red-600">{errors.ctaText}</p>
                                                        )}
                                                    </div>
                                                    
                                                    <div>
                                                        <Label htmlFor="ctaUrl">Primary Button URL</Label>
                                                        <Input
                                                            id="ctaUrl"
                                                            value={data.ctaUrl}
                                                            onChange={(e) => setData('ctaUrl', e.target.value)}
                                                            className="mt-1"
                                                            placeholder="#works or https://..."
                                                        />
                                                        {errors.ctaUrl && (
                                                            <p className="mt-1 text-sm text-red-600">{errors.ctaUrl}</p>
                                                        )}
                                                    </div>
                                                    
                                                    <div>
                                                        <Label htmlFor="ctaSecondaryText">Secondary Button Text</Label>
                                                        <Input
                                                            id="ctaSecondaryText"
                                                            value={data.ctaSecondaryText}
                                                            onChange={(e) => setData('ctaSecondaryText', e.target.value)}
                                                            className="mt-1"
                                                        />
                                                        {errors.ctaSecondaryText && (
                                                            <p className="mt-1 text-sm text-red-600">{errors.ctaSecondaryText}</p>
                                                        )}
                                                    </div>
                                                    
                                                    <div>
                                                        <Label htmlFor="ctaSecondaryUrl">Secondary Button URL</Label>
                                                        <Input
                                                            id="ctaSecondaryUrl"
                                                            value={data.ctaSecondaryUrl}
                                                            onChange={(e) => setData('ctaSecondaryUrl', e.target.value)}
                                                            className="mt-1"
                                                            placeholder="#download or https://..."
                                                        />
                                                        {errors.ctaSecondaryUrl && (
                                                            <p className="mt-1 text-sm text-red-600">{errors.ctaSecondaryUrl}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <Button type="submit" className="bg-[#20B2AA] hover:bg-[#1a9994]" disabled={processing}>
                                            {processing ? 'Saving...' : 'Save Profile'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    {/* Social Links Tab */}
                    <TabsContent value="social">
                        <Card>
                            <CardHeader>
                                <CardTitle>Social Media Links</CardTitle>
                                <CardDescription>
                                    Add or update your social media profiles.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSocialSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="githubUrl">GitHub</Label>
                                            <div className="relative mt-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Github className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <Input
                                                    id="githubUrl"
                                                    type="url"
                                                    value={data.githubUrl || ''}
                                                    onChange={(e) => setData('githubUrl', e.target.value)}
                                                    className="pl-10"
                                                    placeholder="https://github.com/yourusername"
                                                />
                                            </div>
                                            {errors.githubUrl && (
                                                <p className="mt-1 text-sm text-red-600">{errors.githubUrl}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="twitterUrl">Twitter</Label>
                                            <div className="relative mt-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Twitter className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <Input
                                                    id="twitterUrl"
                                                    type="url"
                                                    value={data.twitterUrl || ''}
                                                    onChange={(e) => setData('twitterUrl', e.target.value)}
                                                    className="pl-10"
                                                    placeholder="https://twitter.com/yourusername"
                                                />
                                            </div>
                                            {errors.twitterUrl && (
                                                <p className="mt-1 text-sm text-red-600">{errors.twitterUrl}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="linkedinUrl">LinkedIn</Label>
                                            <div className="relative mt-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Linkedin className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <Input
                                                    id="linkedinUrl"
                                                    type="url"
                                                    value={data.linkedinUrl || ''}
                                                    onChange={(e) => setData('linkedinUrl', e.target.value)}
                                                    className="pl-10"
                                                    placeholder="https://linkedin.com/in/yourusername"
                                                />
                                            </div>
                                            {errors.linkedinUrl && (
                                                <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <Button type="submit" className="bg-[#20B2AA] hover:bg-[#1a9994]" disabled={processing}>
                                            {processing ? 'Saving...' : 'Save Social Links'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Navbar Settings Tab */}
                    <TabsContent value="navbar">
                        <Tabs defaultValue="logo" className="w-full">
                            <TabsList className="mb-6">
                                <TabsTrigger value="logo">Logo Settings</TabsTrigger>
                                <TabsTrigger value="items">Navbar Items</TabsTrigger>
                            </TabsList>
                            
                            {/* Logo Settings Tab */}
                            <TabsContent value="logo">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Logo Settings</CardTitle>
                                        <CardDescription>
                                            Customize your portfolio logo appearance.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleLogoSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="col-span-1">
                                                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                                                        <div className="mb-4">
                                                            <DynamicLogo 
                                                                logoText={data.logo_text}
                                                                logoType={data.logo_type as 'text_only' | 'icon_only' | 'text_with_icon'}
                                                                logoIcon={data.logo_icon}
                                                                logoIconType={data.logo_icon_type as 'letter' | 'svg' | 'image'}
                                                                logoColor={data.logo_color}
                                                            />
                                                        </div>
                                                        <p className="text-sm text-gray-500">
                                                            Logo Preview
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-span-2 space-y-4">
                                                    <div>
                                                        <Label htmlFor="logo_text">Logo Text</Label>
                                                        <Input
                                                            id="logo_text"
                                                            value={data.logo_text}
                                                            onChange={(e) => setData('logo_text', e.target.value)}
                                                            className="mt-1"
                                                        />
                                                        {errors.logo_text && (
                                                            <p className="mt-1 text-sm text-red-600">{errors.logo_text}</p>
                                                        )}
                                                    </div>
                                                    
                                                    <div>
                                                        <Label htmlFor="logo_type">Logo Type</Label>
                                                        <Select
                                                            value={data.logo_type}
                                                            onValueChange={(value) => setData('logo_type', value)}
                                                        >
                                                            <SelectTrigger className="mt-1">
                                                                <SelectValue placeholder="Select logo type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="text_only">Text Only</SelectItem>
                                                                <SelectItem value="icon_only">Icon Only</SelectItem>
                                                                <SelectItem value="text_with_icon">Text with Icon</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.logo_type && (
                                                            <p className="mt-1 text-sm text-red-600">{errors.logo_type}</p>
                                                        )}
                                                    </div>
                                                    
                                                    <div>
                                                        <Label htmlFor="logo_icon_type">Icon Type</Label>
                                                        <Select
                                                            value={data.logo_icon_type}
                                                            onValueChange={(value) => setData('logo_icon_type', value)}
                                                        >
                                                            <SelectTrigger className="mt-1">
                                                                <SelectValue placeholder="Select icon type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="letter">Letter</SelectItem>
                                                                <SelectItem value="svg">SVG</SelectItem>
                                                                <SelectItem value="image">Image</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.logo_icon_type && (
                                                            <p className="mt-1 text-sm text-red-600">{errors.logo_icon_type}</p>
                                                        )}
                                                    </div>
                                                    
                                                    {data.logo_icon_type === 'letter' && (
                                                        <div>
                                                            <Label htmlFor="logo_icon">Icon Letter</Label>
                                                            <Input
                                                                id="logo_icon"
                                                                value={data.logo_icon}
                                                                onChange={(e) => setData('logo_icon', e.target.value)}
                                                                className="mt-1"
                                                                maxLength={1}
                                                            />
                                                            {errors.logo_icon && (
                                                                <p className="mt-1 text-sm text-red-600">{errors.logo_icon}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    {data.logo_icon_type === 'svg' && (
                                                        <div>
                                                            <Label htmlFor="logo_icon">SVG Code</Label>
                                                            <Input
                                                                id="logo_icon"
                                                                value={data.logo_icon}
                                                                onChange={(e) => setData('logo_icon', e.target.value)}
                                                                className="mt-1"
                                                            />
                                                            {errors.logo_icon && (
                                                                <p className="mt-1 text-sm text-red-600">{errors.logo_icon}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    {data.logo_icon_type === 'image' && (
                                                        <div>
                                                            <Label htmlFor="logo_icon">Image URL</Label>
                                                            <Input
                                                                id="logo_icon"
                                                                value={data.logo_icon}
                                                                onChange={(e) => setData('logo_icon', e.target.value)}
                                                                className="mt-1"
                                                            />
                                                            {errors.logo_icon && (
                                                                <p className="mt-1 text-sm text-red-600">{errors.logo_icon}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    <div>
                                                        <Label htmlFor="logo_color">Logo Color</Label>
                                                        <div className="flex gap-2 mt-1">
                                                            <Input
                                                                id="logo_color"
                                                                value={data.logo_color}
                                                                onChange={(e) => setData('logo_color', e.target.value)}
                                                            />
                                                            <input
                                                                type="color"
                                                                value={data.logo_color}
                                                                onChange={(e) => setData('logo_color', e.target.value)}
                                                                className="w-10 h-10 p-1 border rounded"
                                                            />
                                                        </div>
                                                        {errors.logo_color && (
                                                            <p className="mt-1 text-sm text-red-600">{errors.logo_color}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-end">
                                                <Button type="submit" className="bg-[#20B2AA] hover:bg-[#1a9994]" disabled={processing}>
                                                    {processing ? 'Saving...' : 'Save Logo Settings'}
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            
                            {/* Navbar Items Tab */}
                            <TabsContent value="items">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Navbar Items</CardTitle>
                                        <CardDescription>
                                            Customize the navigation menu items.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleNavbarSubmit} className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-medium">Menu Items</h3>
                                                    <Button 
                                                        type="button" 
                                                        variant="outline" 
                                                        size="sm" 
                                                        onClick={addNavbarItem}
                                                        className="flex items-center gap-1"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                        Add Item
                                                    </Button>
                                                </div>
                                                
                                                <DndContext
                                                    sensors={sensors}
                                                    collisionDetection={closestCenter}
                                                    onDragEnd={handleDragEnd}
                                                >
                                                    <SortableContext
                                                        items={Array.isArray(navbarItems) ? navbarItems.map((_, index) => `item-${index}`) : []}
                                                        strategy={verticalListSortingStrategy}
                                                    >
                                                        <div className="space-y-2">
                                                            {Array.isArray(navbarItems) && navbarItems.map((item, index) => (
                                                                <SortableItem
                                                                    key={`item-${index}`}
                                                                    id={`item-${index}`}
                                                                    item={item}
                                                                    index={index}
                                                                    updateNavbarItem={updateNavbarItem}
                                                                    removeNavbarItem={removeNavbarItem}
                                                                />
                                                            ))}
                                                        </div>
                                                    </SortableContext>
                                                </DndContext>
                                                
                                                {(!Array.isArray(navbarItems) || navbarItems.length === 0) && (
                                                    <div className="text-center py-8 text-gray-500">
                                                        No menu items. Click "Add Item" to create one.
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="flex justify-end">
                                                <Button type="submit" className="bg-[#20B2AA] hover:bg-[#1a9994]" disabled={processing}>
                                                    {processing ? 'Saving...' : 'Save Navbar Items'}
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
} 