import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Search, Star, StarHalf, MoreVertical, ArrowUp, ArrowDown, Edit, Trash2, Star as StarEmpty } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Testimonials() {
    const [searchQuery, setSearchQuery] = useState('');

    // This would come from your backend
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            position: 'CEO',
            company: 'TechStart Inc.',
            rating: 5,
            quote: 'Working with this developer was an absolute pleasure. They delivered our project on time and exceeded our expectations in every way.',
            image: null,
            is_featured: true,
            order: 1,
        },
        // ... other testimonials
    ];

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
            } else if (i - 0.5 === rating) {
                stars.push(<StarHalf key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
            } else {
                stars.push(<StarEmpty key={i} className="w-4 h-4 text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <>
            <Head title="Testimonials" />
            
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Testimonials
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Manage client testimonials and reviews
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="text-sm">
                            3/3 Featured
                        </Badge>
                        <Button>
                            Add New Testimonial
                        </Button>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search testimonials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full max-w-md"
                        />
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="p-6 relative group">
                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xl font-semibold">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {testimonial.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {testimonial.position} at {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center mb-3">
                                    {renderStars(testimonial.rating)}
                                </div>

                                {/* Quote */}
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                    {testimonial.quote}
                                </p>

                                {/* Card Footer */}
                                <div className="flex justify-between items-center mt-4">
                                    <Badge variant={testimonial.is_featured ? "default" : "secondary"}>
                                        {testimonial.is_featured ? 'Featured' : 'Not Featured'}
                                    </Badge>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowUp className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowDown className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
} 