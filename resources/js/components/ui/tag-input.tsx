import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
    error?: string;
    maxTags?: number;
    allowDuplicates?: boolean;
}

export default function TagInput({
    value = [],
    onChange,
    placeholder = "Type and press Enter to add...",
    className,
    error,
    maxTags,
    allowDuplicates = false
}: TagInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim();
        if (!trimmedTag) return;
        
        if (maxTags && value.length >= maxTags) return;
        
        if (!allowDuplicates && value.some(existingTag => 
            existingTag.toLowerCase() === trimmedTag.toLowerCase()
        )) return;

        onChange([...value, trimmedTag]);
        setInputValue('');
    };

    const removeTag = (indexToRemove: number) => {
        onChange(value.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            removeTag(value.length - 1);
        }
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
        if (inputValue.trim()) {
            addTag(inputValue);
        }
    };

    return (
        <div className="space-y-2">
            <div
                className={cn(
                    "min-h-[42px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                    "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                    "flex flex-wrap gap-2 items-center",
                    error && "border-red-500 focus-within:ring-red-500",
                    className
                )}
            >
                {/* Render existing tags */}
                {value.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800 border border-teal-200"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-teal-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
                
                {/* Input field */}
                {(!maxTags || value.length < maxTags) && (
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={handleInputBlur}
                        placeholder={value.length === 0 ? placeholder : ""}
                        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                    />
                )}
                
                {/* Add button for visual clarity */}
                {isInputFocused && inputValue.trim() && (
                    <button
                        type="button"
                        onClick={() => addTag(inputValue)}
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                    >
                        <Plus className="w-3 h-3" />
                    </button>
                )}
            </div>
            
            {/* Error message */}
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
            
            {/* Helper text */}
            {maxTags && (
                <p className="text-xs text-muted-foreground">
                    {value.length}/{maxTags} tags
                </p>
            )}
        </div>
    );
}
