import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { useState } from 'react';
import { Search, Star, Trash2, MoreVertical, ArrowUp, ArrowDown, Mail, CheckCircle, ArchiveIcon, Reply, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: number;
    from: string;
    email: string;
    subject: string;
    date: string;
    status: 'unread' | 'read' | 'replied' | 'archived';
    content?: string; // Added for message preview
}

export default function Messages() {
    const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read' | 'replied' | 'archived'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // Dummy data - replace with actual data from backend
    const messages: Message[] = [
        {
            id: 1,
            from: 'John Doe',
            email: 'john.doe@example.com',
            subject: 'Website Development Project',
            date: 'Mar 15, 2023',
            status: 'read',
            content: 'Hi, I came across your portfolio and I\'m impressed with your work. I have a website development project that I\'d like to discuss with you. Would you be available for a quick call this week?'
        },
        {
            id: 2,
            from: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            subject: 'Collaboration Opportunity',
            date: 'Mar 14, 2023',
            status: 'read',
            content: 'Hello! I represent a design agency and we\'re looking for talented developers to collaborate with. Your portfolio caught our attention and we\'d love to explore potential opportunities.'
        },
        {
            id: 3,
            from: 'Michael Chen',
            email: 'michael.c@example.com',
            subject: 'UI/UX Design Project',
            date: 'Mar 12, 2023',
            status: 'read',
            content: 'I need help with a UI/UX design project for my startup. Your design work looks exactly like what we\'re looking for. Can we schedule a meeting to discuss the details?'
        },
        {
            id: 4,
            from: 'Emily Rodriguez',
            email: 'emily.r@example.com',
            subject: 'Speaking Engagement',
            date: 'Mar 10, 2023',
            status: 'read',
            content: 'We\'re organizing a tech conference and would love to have you as a speaker. Your expertise in web development would be valuable to our audience.'
        },
        {
            id: 5,
            from: 'David Wilson',
            email: 'david.w@example.com',
            subject: 'Portfolio Feedback',
            date: 'Mar 8, 2023',
            status: 'read',
            content: 'Just wanted to drop a note saying how impressed I am with your portfolio. The design is clean and the projects showcase your skills perfectly.'
        }
    ];

    const filteredMessages = messages.filter(message => {
        const matchesSearch = 
            message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (activeTab === 'all') return matchesSearch;
        return matchesSearch && message.status === activeTab;
    });

    const tabs = [
        { key: 'all', label: 'All', count: messages.length, icon: Mail },
        { key: 'unread', label: 'Unread', count: messages.filter(m => m.status === 'unread').length, icon: Eye },
        { key: 'read', label: 'Read', count: messages.filter(m => m.status === 'read').length, icon: CheckCircle },
        { key: 'replied', label: 'Replied', count: messages.filter(m => m.status === 'replied').length, icon: Reply },
        { key: 'archived', label: 'Archived', count: messages.filter(m => m.status === 'archived').length, icon: ArchiveIcon },
    ];

    const getStatusColor = (status: Message['status']) => {
        switch (status) {
            case 'unread':
                return 'bg-blue-100 text-blue-700';
            case 'read':
                return 'bg-gray-100 text-gray-700';
            case 'replied':
                return 'bg-green-100 text-green-700';
            case 'archived':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusBadge = (status: Message['status']) => {
        return (
            <Badge 
                className={cn(
                    "font-medium px-2.5 py-0.5 text-xs rounded-full capitalize",
                    getStatusColor(status)
                )}
            >
                {status}
            </Badge>
        );
    };

    return (
        <AdminLayout>
            <Head title="Messages - Portfolio Admin" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Messages</h1>
                        <p className="text-sm text-gray-500">Manage contact form submissions and inquiries</p>
                    </div>
                </motion.div>

                {/* Tabs and Search */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        {tabs.map(tab => (
                            <motion.button
                                key={tab.key}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                                className={cn(
                                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200",
                                    "text-sm font-medium focus:outline-none",
                                    activeTab === tab.key 
                                        ? 'bg-[#20B2AA] text-white hover:bg-[#1a9994]' 
                                        : 'text-gray-600 hover:bg-gray-100',
                                )}
                            >
                                {tab.icon && (
                                    <tab.icon 
                                        className={cn(
                                            "w-4 h-4",
                                            activeTab === tab.key ? 'text-white' : 'text-gray-500'
                                        )} 
                                    />
                                )}
                                <span className="no-underline">{tab.label}</span>
                                <Badge 
                                    variant="secondary" 
                                    className={cn(
                                        "ml-1 px-2 py-0.5 text-xs font-medium border-0",
                                        activeTab === tab.key 
                                            ? 'bg-[#1a9994]/20 text-white' 
                                            : 'bg-gray-100 text-gray-600'
                                    )}
                                >
                                    {tab.count}
                                </Badge>
                            </motion.button>
                        ))}
                    </nav>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search messages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 w-full sm:w-[300px] transition-all duration-200 focus:ring-2 focus:ring-[#20B2AA] focus:border-[#20B2AA] border-gray-200 rounded-md"
                        />
                    </div>
                </div>

                {/* Messages List */}
                <Card className="overflow-hidden border border-gray-200 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <AnimatePresence>
                                    {filteredMessages.map((message) => (
                                        <motion.tr
                                            key={message.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                            onClick={() => {
                                                setSelectedMessage(message);
                                                setIsPreviewOpen(true);
                                            }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">{message.from}</span>
                                                    <span className="text-sm text-gray-500">{message.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{message.subject}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-500">{message.date}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(message.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuItem className="flex items-center gap-2">
                                                            <Eye className="w-4 h-4" />
                                                            View
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex items-center gap-2">
                                                            <Reply className="w-4 h-4" />
                                                            Mark as Replied
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex items-center gap-2">
                                                            <ArchiveIcon className="w-4 h-4" />
                                                            Archive
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50">
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Message Preview Dialog */}
                <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center justify-between">
                                <span>{selectedMessage?.subject}</span>
                                {selectedMessage && getStatusBadge(selectedMessage.status)}
                            </DialogTitle>
                            <DialogDescription className="space-y-4">
                                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{selectedMessage?.from}</p>
                                        <p className="text-sm text-gray-500">{selectedMessage?.email}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{selectedMessage?.date}</p>
                                </div>
                                <div className="py-4 text-gray-600">
                                    {selectedMessage?.content}
                                </div>
                                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                                    <Button className="bg-[#20B2AA] hover:bg-[#1a9994]">
                                        <Reply className="w-4 h-4 mr-2" />
                                        Reply
                                    </Button>
                                    <Button variant="outline">
                                        <ArchiveIcon className="w-4 h-4 mr-2" />
                                        Archive
                                    </Button>
                                    <Button variant="outline" className="text-red-600 hover:text-red-700">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
} 