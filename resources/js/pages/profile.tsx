import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { cn } from '@/lib/utils';
import { Upload, Save, Plus, X, Twitter, Github, Linkedin, Dribbble, Globe, Check, Trash2, Instagram, Youtube, Facebook, FileText, Aperture } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface TabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const Tab = ({ label, isActive, onClick }: TabProps) => (
    <button
        onClick={onClick}
        className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            isActive 
                ? 'border-[#20B2AA] text-[#20B2AA]' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        )}
    >
        {label}
    </button>
);

interface SocialLink {
    platform: string;
    url: string;
    isActive: boolean;
    icon: any;
    color: string;
}

const SocialLinkItem = ({ link, onToggle, onRemove, onUrlChange, savingPlatform }: {
    link: SocialLink;
    onToggle: () => void;
    onRemove: () => void;
    onUrlChange: (url: string) => void;
    savingPlatform: string | null;
}) => (
    <motion.div 
        key={link.platform}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
            "flex items-center gap-4 p-4 rounded-lg group transition-all duration-300",
            link.isActive 
                ? "bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-emerald-500" 
                : "bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 border-l-4 border-transparent"
        )}
        whileHover={{ scale: 1.01 }}
    >
        <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
            link.isActive 
                ? `bg-opacity-20 ring-2 ring-offset-2 ring-${link.platform.toLowerCase()}`
                : "bg-opacity-10"
        )} style={{ backgroundColor: `${link.color}10` }}>
            <link.icon className={cn(
                "w-5 h-5 transition-all duration-300",
                link.isActive ? "scale-110" : ""
            )} style={{ color: link.color }} />
        </div>
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <h3 className={cn(
                    "font-medium transition-colors duration-300",
                    link.isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"
                )}>{link.platform}</h3>
                <span className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full transition-all duration-300",
                    link.isActive 
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-500 ring-1 ring-emerald-500/20"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                )}>
                    {link.isActive ? 'Active' : 'Inactive'}
                </span>
            </div>
            <input
                type="url"
                value={link.url}
                onChange={(e) => onUrlChange(e.target.value)}
                className={cn(
                    "w-full bg-transparent border-0 p-0 text-sm focus:ring-0 placeholder-gray-400 transition-colors duration-300",
                    link.isActive 
                        ? "text-gray-800 dark:text-gray-200" 
                        : "text-gray-600 dark:text-gray-400"
                )}
                placeholder={`Enter your ${link.platform} profile URL`}
            />
        </div>
        <div className="flex items-center gap-2">
            <button
                onClick={onToggle}
                className={cn(
                    "p-2 transition-colors relative",
                    link.isActive 
                        ? "text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full" 
                        : "text-gray-400 hover:text-emerald-500"
                )}
                disabled={savingPlatform === link.platform}
            >
                {savingPlatform === link.platform ? (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                ) : (
                    <Check className="w-5 h-5" />
                )}
            </button>
            <button
                onClick={onRemove}
                className={cn(
                    "p-2 transition-colors relative rounded-full",
                    link.isActive 
                        ? "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" 
                        : "text-gray-400 hover:text-red-500"
                )}
                disabled={savingPlatform === link.platform}
            >
                {savingPlatform === link.platform ? (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                ) : (
                    <Trash2 className="w-5 h-5" />
                )}
            </button>
        </div>
    </motion.div>
);

export default function Profile() {
    const [activeTab, setActiveTab] = useState('Basic Info');
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
        {
            platform: 'Twitter',
            url: 'https://twitter.com/username',
            isActive: true,
            icon: Twitter,
            color: '#1DA1F2'
        },
        {
            platform: 'Github',
            url: 'https://github.com/username',
            isActive: true,
            icon: Github,
            color: '#24292E'
        },
        {
            platform: 'Linkedin',
            url: 'https://linkedin.com/in/username',
            isActive: true,
            icon: Linkedin,
            color: '#0A66C2'
        },
        {
            platform: 'Dribbble',
            url: 'https://dribbble.com/username',
            isActive: false,
            icon: Dribbble,
            color: '#EA4C89'
        }
    ]);
    const [formData, setFormData] = useState({
        fullName: 'John Doe',
        professionalTitle: 'Creative Designer & Developer',
        heroHeadline: 'Creative Designer & Developer',
        heroSubheading: 'I create exceptional digital experiences that solve complex problems and connect people through elegant, user-focused design.',
        bio: "I'm a passionate designer and developer with 5 years of experience creating beautiful, functional websites and applications. My approach combines technical expertise with a keen eye for design to deliver solutions that not only work flawlessly but also engage and delight users.",
        email: 'contact@yourportfolio.com',
        phone: '+1(123) 456-7890',
        location: 'San Francisco, CA, USA',
        yearsExperience: '5',
        projectsCompleted: '50+',
        availableForWork: true
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newSocialLink, setNewSocialLink] = useState({
        platform: '',
        url: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [savingPlatform, setSavingPlatform] = useState<string | null>(null);

    const [themeSettings, setThemeSettings] = useState({
        colorScheme: 'teal-blue',
        fontStyle: 'inter',
        darkMode: true
    });

    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [currentResume, setCurrentResume] = useState('resume-john-doe-2023.pdf');

    const availablePlatforms = [
        { name: 'Instagram', icon: Instagram, color: '#E4405F' },
        { name: 'YouTube', icon: Youtube, color: '#FF0000' },
        { name: 'Facebook', icon: Facebook, color: '#1877F2' },
        { name: 'Medium', icon: FileText, color: '#000000' },
        { name: 'Behance', icon: Aperture, color: '#1769FF' }
    ].filter(platform => !socialLinks.find(link => link.platform === platform.name));

    const colorSchemes = [
        { id: 'teal-blue', colors: ['#20B2AA', '#1E90FF'], label: 'Teal & Blue' },
        { id: 'purple-pink', colors: ['#9333EA', '#EC4899'], label: 'Purple & Pink' },
        { id: 'green-yellow', colors: ['#22C55E', '#EAB308'], label: 'Green & Yellow' }
    ];

    const fontStyles = [
        { id: 'sans-serif', label: 'Sans Serif', preview: 'Aa' },
        { id: 'inter', label: 'Inter', preview: 'Aa' },
        { id: 'serif', label: 'Serif', preview: 'Aa' }
    ];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const handleSocialLinkChange = (platform: string, url: string) => {
        setSocialLinks(prev => prev.map(link => 
            link.platform === platform ? { ...link, url } : link
        ));
    };

    const toggleSocialLinkActive = async (platform: string) => {
        setSavingPlatform(platform);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setSocialLinks(prev => prev.map(link => 
                link.platform === platform ? { ...link, isActive: !link.isActive } : link
            ));
        } finally {
            setSavingPlatform(null);
        }
    };

    const handleRemoveSocialLink = async (platform: string) => {
        setSavingPlatform(platform);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setSocialLinks(prev => prev.filter(link => link.platform !== platform));
        } finally {
            setSavingPlatform(null);
        }
    };

    const handleAddSocialLink = () => {
        setIsAddModalOpen(true);
    };

    const handleSaveNewLink = async () => {
        if (newSocialLink.platform && newSocialLink.url) {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const platformData = availablePlatforms.find(p => p.name === newSocialLink.platform);
                if (platformData) {
                    setSocialLinks(prev => [...prev, {
                        platform: newSocialLink.platform,
                        url: newSocialLink.url,
                        isActive: true,
                        icon: platformData.icon,
                        color: platformData.color
                    }]);
                    setNewSocialLink({ platform: '', url: '' });
                    setIsAddModalOpen(false);
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const getPlatformStyles = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'twitter':
                return 'bg-[#1DA1F2]/10';
            case 'github':
                return 'bg-[#24292E]/10';
            case 'linkedin':
                return 'bg-[#0A66C2]/10';
            case 'dribbble':
                return 'bg-[#EA4C89]/10';
            default:
                return 'bg-gray-100';
        }
    };

    const renderSocialLinks = () => (
        <AnimatePresence mode="wait">
            <motion.div 
                key="social-links-container"
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {socialLinks.map(link => (
                    <SocialLinkItem
                        key={link.platform}
                        link={link}
                        onToggle={() => toggleSocialLinkActive(link.platform)}
                        onRemove={() => handleRemoveSocialLink(link.platform)}
                        onUrlChange={(url) => handleSocialLinkChange(link.platform, url)}
                        savingPlatform={savingPlatform}
                    />
                ))}

                <motion.button 
                    key="add-social-link-button"
                    className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                    onClick={handleAddSocialLink}
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add Social Link</span>
                </motion.button>
            </motion.div>
        </AnimatePresence>
    );

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
            setCurrentResume(e.target.files[0].name);
        }
    };

    const handleThemeChange = (key: string, value: any) => {
        setThemeSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

                return (
        <AdminLayout>
            <Head title="Profile Settings - Portfolio Admin" />

            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage your personal information and how it appears on your portfolio
                            </p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#20B2AA] text-white text-sm font-medium rounded-lg hover:bg-[#1a9994] transition-colors duration-200"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    {/* Tabs */}
                    <div className="border-b border-gray-200 px-6">
                        <div className="flex gap-4">
                            {['Basic Info', 'Social Links', 'Appearance'].map(tab => (
                                <Tab
                                    key={tab}
                                    label={tab}
                                    isActive={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-6">
                        {activeTab === 'Basic Info' && (
                            <div className="space-y-8">
                                {/* Profile Image */}
                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Profile Image
                                    </label>
                            <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                                                {profileImage ? (
                                    <img 
                                                        src={URL.createObjectURL(profileImage)}
                                        alt="Profile" 
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <Upload className="w-8 h-8 text-gray-400" />
                                                )}
                                            </div>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="profile-image"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="profile-image"
                                                className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                <Upload className="w-4 h-4 mr-2" />
                                                Upload new photo
                                        </label>
                                            <p className="text-xs text-gray-500 mt-2">
                                                JPG, PNG or GIF - 1MB max.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Professional Title
                                            </label>
                                            <input
                                                type="text"
                                                name="professionalTitle"
                                                value={formData.professionalTitle}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                                            />
                                </div>
                            </div>
                        </div>

                                {/* Hero Section */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Hero Section
                                    </h3>
                                    <div className="space-y-4">
                            <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Hero Headline
                                            </label>
                                <input
                                    type="text"
                                                name="heroHeadline"
                                                value={formData.heroHeadline}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                This appears as the main headline in your hero section
                                            </p>
                            </div>
                            <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Hero Subheading
                                            </label>
                                            <textarea
                                                name="heroSubheading"
                                                value={formData.heroSubheading}
                                                onChange={handleInputChange}
                                                rows={2}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent resize-none"
                                            />
                                        </div>
                            </div>
                        </div>

                                {/* Bio Section */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Bio
                                    </h3>
                        <div>
                            <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                rows={4}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                                            placeholder="Write a brief description about yourself..."
                            />
                                    </div>
                        </div>

                        {/* Contact Information */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Contact Information
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                <input
                                    type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                                />
                            </div>
                            <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone
                                            </label>
                                <input
                                    type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                                />
                            </div>
                            <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Location
                                            </label>
                                <input
                                    type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                                />
                            </div>
                        </div>
                            </div>
                            </div>
                        )}

                        {activeTab === 'Social Links' && (
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold mb-6">Social Media Links</h2>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">
                                            Connect your social media accounts to your portfolio. Active links will be displayed on your public profile.
                                        </p>
                                        
                                        {renderSocialLinks()}
                        </div>
                    </div>
                            </div>
                        )}

                        {activeTab === 'Appearance' && (
                            <div className="space-y-6">
                                {/* Resume/CV Section */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="p-6">
                                        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Resume/CV</h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Upload your resume or CV for visitors to download
                                        </p>
                                        
                                        <div className="mt-6">
                                            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                    </div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Current Resume</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{currentResume}</div>
                        </div>
                        <div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-sm"
                                                        onClick={() => document.getElementById('resume-upload')?.click()}
                                                    >
                                                        Replace File
                                                    </Button>
                                <input
                                                        type="file"
                                                        id="resume-upload"
                                                        className="hidden"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={handleResumeChange}
                                                    />
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>

                                {/* Theme Settings Section */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="p-6">
                                        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Theme Settings</h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Customize the appearance of your portfolio
                                        </p>

                                        <div className="mt-6 space-y-8">
                                            {/* Color Scheme */}
                        <div>
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Color Scheme
                                                </label>
                                                <div className="mt-3 grid grid-cols-3 gap-3">
                                                    {colorSchemes.map(scheme => (
                                    <button
                                                            key={scheme.id}
                                                            onClick={() => handleThemeChange('colorScheme', scheme.id)}
                                                            className={cn(
                                                                "relative flex flex-col items-center p-4 rounded-lg border transition-all duration-200",
                                                                themeSettings.colorScheme === scheme.id
                                                                    ? "border-[#20B2AA] bg-[#20B2AA]/5"
                                                                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                                            )}
                                                        >
                                                            <div className="flex gap-2 mb-3">
                                                                {scheme.colors.map(color => (
                                                                    <div
                                        key={color}
                                                                        className="w-5 h-5 rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-sm text-gray-900 dark:text-gray-100">
                                                                {scheme.label}
                                                            </span>
                                                            {themeSettings.colorScheme === scheme.id && (
                                                                <div className="absolute inset-0 rounded-lg ring-2 ring-[#20B2AA]" />
                                                            )}
                                                        </button>
                                ))}
                            </div>
                        </div>

                                            {/* Font Style */}
                        <div>
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Font Style
                                                </label>
                                                <div className="mt-3 grid grid-cols-3 gap-3">
                                                    {fontStyles.map(font => (
                                <button
                                                            key={font.id}
                                                            onClick={() => handleThemeChange('fontStyle', font.id)}
                                                            className={cn(
                                                                "relative flex flex-col items-center p-4 rounded-lg border transition-all duration-200",
                                                                themeSettings.fontStyle === font.id
                                                                    ? "border-[#20B2AA] bg-[#20B2AA]/5"
                                                                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                                            )}
                                                        >
                                                            <span className={cn(
                                                                "text-2xl mb-3 text-gray-900 dark:text-gray-100",
                                                                font.id === 'sans-serif' && "font-sans",
                                                                font.id === 'inter' && "font-inter",
                                                                font.id === 'serif' && "font-serif"
                                                            )}>
                                                                {font.preview}
                                                            </span>
                                                            <span className="text-sm text-gray-900 dark:text-gray-100">
                                                                {font.label}
                                                            </span>
                                                            {themeSettings.fontStyle === font.id && (
                                                                <div className="absolute inset-0 rounded-lg ring-2 ring-[#20B2AA]" />
                                                            )}
                                </button>
                            ))}
                        </div>
                    </div>

                                            {/* Dark Mode Toggle */}
                                            <div className="flex items-center justify-between py-3">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Dark Mode</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        Toggle between light and dark themes
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0">
                            <button 
                                type="button" 
                                                        role="switch"
                                                        aria-checked={themeSettings.darkMode}
                                                        onClick={() => handleThemeChange('darkMode', !themeSettings.darkMode)}
                                                        className={cn(
                                                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:ring-offset-2",
                                                            themeSettings.darkMode ? "bg-[#20B2AA]" : "bg-gray-200 dark:bg-gray-700"
                                                        )}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={cn(
                                                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                                                themeSettings.darkMode ? "translate-x-5" : "translate-x-0"
                                                            )}
                                                        />
                            </button>
                        </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Social Link Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Social Link</DialogTitle>
                        <DialogDescription>
                            Add a new social media platform to your portfolio.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="platform" className="text-sm font-medium">
                                Platform
                            </label>
                            <Select
                                value={newSocialLink.platform}
                                onValueChange={(value) => setNewSocialLink(prev => ({ ...prev, platform: value }))}
                                disabled={isLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availablePlatforms.map((platform) => (
                                        <SelectItem key={platform.name} value={platform.name}>
                                            <div className="flex items-center gap-2">
                                                <platform.icon className="w-4 h-4" style={{ color: platform.color }} />
                                                <span>{platform.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="url" className="text-sm font-medium">
                                Profile URL
                            </label>
                            <Input
                                id="url"
                                type="url"
                                value={newSocialLink.url}
                                onChange={(e) => setNewSocialLink(prev => ({ ...prev, url: e.target.value }))}
                                placeholder="Enter your profile URL"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddModalOpen(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSaveNewLink} 
                            disabled={!newSocialLink.platform || !newSocialLink.url || isLoading}
                            className="relative"
                        >
                            {isLoading ? (
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </motion.div>
                            ) : (
                                'Add Link'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
} 