import React from 'react';

interface DynamicLogoProps {
    logoText?: string;
    logoType?: 'text_only' | 'icon_only' | 'text_with_icon';
    logoIcon?: string;
    logoIconType?: 'letter' | 'svg' | 'image';
    logoColor?: string;
    className?: string;
    onClick?: () => void;
}

export function DynamicLogo({
    logoText = 'Portfolio',
    logoType = 'text_with_icon',
    logoIcon = 'P',
    logoIconType = 'letter',
    logoColor = '#20B2AA',
    className = '',
    onClick
}: DynamicLogoProps) {
    const renderIcon = () => {
        switch (logoIconType) {
            case 'letter':
                return (
                    <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: logoColor }}
                    >
                        {logoIcon}
                    </div>
                );
            case 'svg':
                // For SVG, we assume logoIcon contains the SVG markup
                return (
                    <div 
                        className="w-8 h-8 flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: logoIcon }}
                    />
                );
            case 'image':
                return (
                    <img 
                        src={logoIcon} 
                        alt="Logo" 
                        className="w-8 h-8 object-contain"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div 
            className={`flex items-center gap-2 cursor-pointer ${className}`}
            onClick={onClick}
        >
            {(logoType === 'icon_only' || logoType === 'text_with_icon') && renderIcon()}
            
            {(logoType === 'text_only' || logoType === 'text_with_icon') && (
                <span className="font-medium text-base">{logoText}</span>
            )}
        </div>
    );
} 