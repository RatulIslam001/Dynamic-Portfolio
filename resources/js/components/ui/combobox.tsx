import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComboboxOption {
    value: string;
    label: string;
}

interface ComboboxProps {
    value: string;
    onChange: (value: string) => void;
    options: ComboboxOption[] | string[];
    placeholder?: string;
    className?: string;
    error?: string;
    allowCustom?: boolean;
    disabled?: boolean;
}

export default function Combobox({
    value,
    onChange,
    options = [],
    placeholder = "Select or type...",
    className,
    error,
    allowCustom = true,
    disabled = false
}: ComboboxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');
    const [filteredOptions, setFilteredOptions] = useState<ComboboxOption[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Normalize options to ComboboxOption format
    const normalizedOptions: ComboboxOption[] = options.map(option => 
        typeof option === 'string' 
            ? { value: option, label: option }
            : option
    );

    // Filter options based on input value
    useEffect(() => {
        if (!inputValue.trim()) {
            setFilteredOptions(normalizedOptions);
        } else {
            const filtered = normalizedOptions.filter(option =>
                option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
                option.value.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    }, [inputValue, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update input value when prop value changes
    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setIsOpen(true);
        
        if (allowCustom) {
            onChange(newValue);
        }
    };

    const handleOptionSelect = (option: ComboboxOption) => {
        setInputValue(option.label);
        onChange(option.value);
        setIsOpen(false);
        inputRef.current?.blur();
    };

    const handleInputFocus = () => {
        if (!disabled) {
            setIsOpen(true);
        }
    };

    const handleInputBlur = () => {
        // Small delay to allow option selection
        setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredOptions.length > 0 && !filteredOptions.some(opt => opt.value === inputValue)) {
                handleOptionSelect(filteredOptions[0]);
            } else {
                setIsOpen(false);
            }
        }
    };

    const isExactMatch = normalizedOptions.some(option => 
        option.value.toLowerCase() === inputValue.toLowerCase()
    );

    return (
        <div className="relative" ref={containerRef}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                        "placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "pr-10", // Space for chevron
                        error && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                />
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                    <ChevronDown 
                        className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform duration-200",
                            isOpen && "rotate-180"
                        )} 
                    />
                </button>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.length > 0 ? (
                        <>
                            {filteredOptions.map((option, index) => (
                                <button
                                    key={`${option.value}-${index}`}
                                    type="button"
                                    onClick={() => handleOptionSelect(option)}
                                    className={cn(
                                        "w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                                        "flex items-center justify-between",
                                        option.value === value && "bg-accent text-accent-foreground"
                                    )}
                                >
                                    <span>{option.label}</span>
                                    {option.value === value && (
                                        <Check className="h-4 w-4" />
                                    )}
                                </button>
                            ))}
                            {allowCustom && inputValue && !isExactMatch && (
                                <div className="border-t border-border">
                                    <button
                                        type="button"
                                        onClick={() => handleOptionSelect({ value: inputValue, label: inputValue })}
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground italic text-muted-foreground"
                                    >
                                        Create "{inputValue}"
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                            {allowCustom ? `Type to create "${inputValue}"` : 'No options found'}
                        </div>
                    )}
                </div>
            )}

            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
