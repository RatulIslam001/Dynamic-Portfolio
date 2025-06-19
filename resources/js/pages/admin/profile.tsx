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
import { Upload, Save, User, Mail, Phone, MapPin, Github, Twitter, Linkedin, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';

interface Profile {
    id: number;
    fullName: string;
    title: string;
    about: string;
    email: string;
    phone: string;
    location: string;
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
}

interface Props {
    profile: Profile;
    success?: string;
}

export default function AdminProfile({ profile, success }: Props) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar);
    const [activeTab, setActiveTab] = useState('hero');

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
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
    });

    const { 
        data: fullProfileData, 
        setData: setFullProfileData, 
        post: postFullProfile, 
        processing: processingFullProfile,
        errors: fullProfileErrors
    } = useForm({
        fullName: profile.fullName || '',
        title: profile.title || '',
        about: profile.about || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        yearsExperience: profile.yearsExperience || 0,
        projectsCompleted: profile.projectsCompleted || 0,
        githubUrl: profile.githubUrl || '',
        linkedinUrl: profile.linkedinUrl || '',
        twitterUrl: profile.twitterUrl || '',
        avatar: null as File | null,
        resume: null as File | null,
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
            setSuccessMessage('Hero section updated successfully.');
        }
    }, [wasSuccessful]);

    // Handle form submission for hero section
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create FormData for file upload
        const formData = new FormData();
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
                setSuccessMessage('Hero section updated successfully.');
            },
        });
    };

    // Handle form submission for the full profile
    const handleFullProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('fullName', fullProfileData.fullName);
        formData.append('title', fullProfileData.title);
        formData.append('about', fullProfileData.about);
        formData.append('email', fullProfileData.email);
        formData.append('phone', fullProfileData.phone);
        formData.append('location', fullProfileData.location);
        formData.append('yearsExperience', fullProfileData.yearsExperience.toString());
        formData.append('projectsCompleted', fullProfileData.projectsCompleted.toString());
        formData.append('githubUrl', fullProfileData.githubUrl || '');
        formData.append('linkedinUrl', fullProfileData.linkedinUrl || '');
        formData.append('twitterUrl', fullProfileData.twitterUrl || '');
        
        if (fullProfileData.avatar) {
            formData.append('avatar', fullProfileData.avatar);
        }
        
        if (fullProfileData.resume) {
            formData.append('resume', fullProfileData.resume);
        }
        
        // Use Inertia to submit the form
        postFullProfile(route('admin.profile.update'), {
            onSuccess: () => {
                setSuccessMessage('Profile updated successfully.');
            },
        });
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
                        <TabsTrigger value="hero">Hero Section</TabsTrigger>
                        <TabsTrigger value="full">Full Profile</TabsTrigger>
                        <TabsTrigger value="social">Social Links</TabsTrigger>
                    </TabsList>
                    
                    {/* Hero Section Tab */}
                    <TabsContent value="hero">
                        <Card>
                            <CardHeader>
                                <CardTitle>Hero Section</CardTitle>
                                <CardDescription>
                                    Update the content displayed in the hero section of your portfolio.
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
                                        </div>
                                        
                                        <div className="col-span-2 space-y-4">
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
                                                    placeholder="Short description of what you do"
                                                    className="mt-1 min-h-[120px]"
                                                />
                                                {errors.about && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.about}</p>
                                                )}
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
                                            {processing ? 'Saving...' : 'Save Hero Section'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    {/* Full Profile Tab */}
                    <TabsContent value="full">
                        <Card>
                            <CardHeader>
                                <CardTitle>Full Profile Information</CardTitle>
                                <CardDescription>
                                    Manage your personal information and contact details.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleFullProfileSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <Input
                                                id="fullName"
                                                value={fullProfileData.fullName}
                                                onChange={(e) => setFullProfileData('fullName', e.target.value)}
                                                placeholder="Your full name"
                                                className="mt-1"
                                            />
                                            {fullProfileErrors.fullName && (
                                                <p className="mt-1 text-sm text-red-600">{fullProfileErrors.fullName}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="fullTitle">Professional Title</Label>
                                            <Input
                                                id="fullTitle"
                                                value={fullProfileData.title}
                                                onChange={(e) => setFullProfileData('title', e.target.value)}
                                                placeholder="e.g. Creative Designer & Developer"
                                                className="mt-1"
                                            />
                                            {fullProfileErrors.title && (
                                                <p className="mt-1 text-sm text-red-600">{fullProfileErrors.title}</p>
                                            )}
                                        </div>
                                        
                                        <div className="md:col-span-2">
                                            <Label htmlFor="fullAbout">About / Tagline</Label>
                                            <Textarea
                                                id="fullAbout"
                                                value={fullProfileData.about}
                                                onChange={(e) => setFullProfileData('about', e.target.value)}
                                                placeholder="Description of what you do that will appear on your homepage"
                                                className="mt-1 min-h-[120px]"
                                            />
                                            {fullProfileErrors.about && (
                                                <p className="mt-1 text-sm text-red-600">{fullProfileErrors.about}</p>
                                            )}
                                            <p className="mt-1 text-xs text-gray-500">
                                                This text appears on your homepage and helps visitors understand what you do.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <div className="relative mt-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={fullProfileData.email}
                                                    onChange={(e) => setFullProfileData('email', e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                            {fullProfileErrors.email && (
                                                <p className="mt-1 text-sm text-red-600">{fullProfileErrors.email}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="phone">Phone</Label>
                                            <div className="relative mt-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Phone className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={fullProfileData.phone}
                                                    onChange={(e) => setFullProfileData('phone', e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                            {fullProfileErrors.phone && (
                                                <p className="mt-1 text-sm text-red-600">{fullProfileErrors.phone}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="location">Location</Label>
                                            <div className="relative mt-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <MapPin className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <Input
                                                    id="location"
                                                    value={fullProfileData.location}
                                                    onChange={(e) => setFullProfileData('location', e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                            {fullProfileErrors.location && (
                                                <p className="mt-1 text-sm text-red-600">{fullProfileErrors.location}</p>
                                            )}
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="fullYearsExperience">Years of Experience</Label>
                                                <Input
                                                    id="fullYearsExperience"
                                                    type="number"
                                                    value={fullProfileData.yearsExperience}
                                                    onChange={(e) => setFullProfileData('yearsExperience', parseInt(e.target.value) || 0)}
                                                    className="mt-1"
                                                    min="0"
                                                />
                                                {fullProfileErrors.yearsExperience && (
                                                    <p className="mt-1 text-sm text-red-600">{fullProfileErrors.yearsExperience}</p>
                                                )}
                                            </div>
                                            
                                            <div>
                                                <Label htmlFor="fullProjectsCompleted">Projects Completed</Label>
                                                <Input
                                                    id="fullProjectsCompleted"
                                                    type="number"
                                                    value={fullProfileData.projectsCompleted}
                                                    onChange={(e) => setFullProfileData('projectsCompleted', parseInt(e.target.value) || 0)}
                                                    className="mt-1"
                                                    min="0"
                                                />
                                                {fullProfileErrors.projectsCompleted && (
                                                    <p className="mt-1 text-sm text-red-600">{fullProfileErrors.projectsCompleted}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <Button type="submit" className="bg-[#20B2AA] hover:bg-[#1a9994]" disabled={processingFullProfile}>
                                            {processingFullProfile ? 'Saving...' : 'Save Full Profile'}
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
                                <form className="space-y-6">
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
                                                    value={fullProfileData.githubUrl || ''}
                                                    onChange={(e) => setFullProfileData('githubUrl', e.target.value)}
                                                    className="pl-10"
                                                    placeholder="https://github.com/yourusername"
                                                />
                                            </div>
                                            {fullProfileErrors.githubUrl && (
                                                <p className="mt-1 text-sm text-red-600">{fullProfileErrors.githubUrl}</p>
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
                                                    value={fullProfileData.twitterUrl || ''}
                                                    onChange={(e) => setFullProfileData('twitterUrl', e.target.value)}
                                                    className="pl-10"
                                                    placeholder="https://twitter.com/yourusername"
                                                />
                                            </div>
                                            {fullProfileErrors.twitterUrl && (
                                                <p className="mt-1 text-sm text-red-600">{fullProfileErrors.twitterUrl}</p>
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
                                                    value={fullProfileData.linkedinUrl || ''}
                                                    onChange={(e) => setFullProfileData('linkedinUrl', e.target.value)}
                                                    className="pl-10"
                                                    placeholder="https://linkedin.com/in/yourusername"
                                                />
                                            </div>
                                            {fullProfileErrors.linkedinUrl && (
                                                <p className="mt-1 text-sm text-red-600">{fullProfileErrors.linkedinUrl}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <Button type="button" onClick={handleFullProfileSubmit} className="bg-[#20B2AA] hover:bg-[#1a9994]" disabled={processingFullProfile}>
                                            {processingFullProfile ? 'Saving...' : 'Save Social Links'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
} 