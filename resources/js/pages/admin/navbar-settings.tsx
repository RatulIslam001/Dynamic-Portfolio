import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
    Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DynamicLogo } from '@/components/ui/dynamic-logo';
import { X, Plus, GripVertical } from 'lucide-react';
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
    logo_text: string;
    logo_type: string;
    logo_icon: string;
    logo_icon_type: string;
    logo_color: string;
    navbar_items: NavbarItem[];
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

export default function NavbarSettings({ profile, success }: Props) {
    const [activeTab, setActiveTab] = useState('logo');
    const [navbarItems, setNavbarItems] = useState<NavbarItem[]>(
        profile.navbar_items || [
            { title: 'Home', href: 'home' },
            { title: 'Services', href: 'services' },
            { title: 'Works', href: 'works' },
            { title: 'Skills', href: 'skills' },
            { title: 'Resume', href: 'resume' },
            { title: 'Testimonials', href: 'testimonials' },
            { title: 'Contact', href: 'contact' }
        ]
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
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
            setSuccessMessage('Navbar settings updated successfully.');
        }
    }, [wasSuccessful]);

    // Update form data when navbarItems change
    useEffect(() => {
        setData('navbar_items', navbarItems);
    }, [navbarItems]);

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

    return (
        <AdminLayout>
            <Head title="Navbar Settings | Admin Dashboard" />
            
            <div className="container p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Navbar Settings</h1>
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
                        <TabsTrigger value="logo">Logo Settings</TabsTrigger>
                        <TabsTrigger value="navbar">Navbar Items</TabsTrigger>
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
                    <TabsContent value="navbar">
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
                                                items={navbarItems.map((_, index) => `item-${index}`)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                <div className="space-y-2">
                                                    {navbarItems.map((item, index) => (
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
                                        
                                        {navbarItems.length === 0 && (
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
            </div>
        </AdminLayout>
    );
} 